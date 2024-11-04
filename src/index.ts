import dotenv from 'dotenv';
dotenv.config();

// importamos o arquivo responsável por comunicar-se coma blockchain
import { mintAndTransfer } from './Web3Provider';

// importamos o `express` e as tipagens
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; // faz o logging das requisições
import cors from 'cors';
import helmet from "helmet";

const app = express();

// Help secure Express apps by setting HTTP response headers.
// protege dos ataques mais comuns na internet
// see: https://www.npmjs.com/package/helmet
app.use(helmet());

// `tiny` é o nível de logs
// toda requisição que chegar para o backend 
// é processada no morgan primeiramente
app.use(morgan('tiny'));

// permitimos com o CORS apenas o nosso frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));



// armazenaremos carteira (address => string) e a próxima data do mint (timestamp => number)
const nextMint = new Map<string, number>();

app.post("/mint/:wallet", async (req: Request, res: Response): Promise<any> => {

    const wallet = req.params.wallet;
    const nextMintTimeStamp = Date.now() + (1000 * 60 * 60 * 24 * 2); // próximo mint para dois dias

    // se tenho `wallet`
    // e o nextMint dessa `wallet` é superior ao `Date.now()`
    // então barramos a requisição e não deixamos o `user expertinho` gastar a taxa de rede do `owner`
    if (nextMint.has(wallet) && nextMint.get(wallet)! > Date.now()) {
        return res.status(400).json(`Try again tomorrow`);
    }

    try {
        const tx = await mintAndTransfer(wallet);
        res.json(tx);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(error.message);
        }
        res.status(500).json('An unknown error occurred');
    }

    // controle de mint independete se deu certo ou errado
    nextMint.set(wallet, nextMintTimeStamp); // dois dias
});


const PORT: number = parseInt(`${process.env.PORT || 3001}`);
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});