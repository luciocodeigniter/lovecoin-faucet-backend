# Backend da DApp Faucet

Este repositório contém o backend desenvolvido em **Node.js** e **Express** para a DApp de faucet. Este backend é responsável por gerenciar a mintagem de tokens na blockchain, oferecendo uma interface segura e eficiente para interagir com o contrato inteligente.

## Visão Geral

O backend atua como intermediário entre a DApp e a blockchain, permitindo que os usuários solicitem tokens de teste de maneira fácil e sem custos de gas. A arquitetura é projetada para otimizar a experiência do usuário, concentrando as taxas de transação no proprietário do contrato.

## Funcionalidades Principais

- **Mintagem de Tokens**: O backend permite que os usuários solicitem a mintagem de tokens através de requisições HTTP.
- **Autenticação com MetaMask**: Os usuários podem conectar suas contas MetaMask para autenticar suas solicitações.
- **Controle de Solicitações**: Implementação de lógica para garantir que os usuários possam solicitar tokens em intervalos controlados, evitando abusos.
- **Gestão de Erros**: Tratamento de erros robusto para fornecer feedback adequado ao usuário em caso de falhas.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criar aplicações web e APIs de forma simples e eficiente.
- **Web3.js**: Biblioteca para interagir com a blockchain Ethereum.