/**
 * Arquivo responsável por prover métodos para comunicação com a blockchain
 */
import Web3 from "web3";
const ABI = require("./abi.json"); // dá pra fazer com `import`, mas tem que ajustar o tsconfig

const web3Instance = new Web3(
    // Provider -> aqui dizemos para o Web3 pra onde deve enviar os comandos JSON-RPC
    // Para realizar as operações na blockchain, ou seja, 
    // passamos o NÓ do provedor de blockchain
    `${process.env.NODE_URL}`
);

// Recupero a conta a partir da chave privada para se conectar à blockchain
const account = web3Instance.eth.accounts.privateKeyToAccount("0x" + process.env.PRIVATE_KEY);

// agora preciso injetar essa `account` no objeto `web3Instance`
web3Instance.eth.accounts.wallet.add(account);

export async function mintAndTransfer(to: string): Promise<string> {
    const contractInstance = new web3Instance.eth.Contract(ABI, `${process.env.CONTRACT_ADDRESS}`, {
        from: `${process.env.WALLET}`, // isso garante que todas as chamadas serão do owner 
    });

    try {
        const transaction = await contractInstance.methods.mint(to).send();
        return transaction.transactionHash;
    } catch (error) {
        console.error("Erro ao realizar mint:", error);
        throw error;
    }
}
