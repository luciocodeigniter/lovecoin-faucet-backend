import dotenv from 'dotenv';
dotenv.config();

// importamos o arquivo responsável por comunicar-se coma blockchain
import { mintAndTransfer } from './Web3Provider';

// importamos o `express` e as tipagens
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; // faz o logging das requisições
import cors from 'cors';

const app = express();

// `tiny` é o nível de logs
// toda requisição que chegar para o backend 
// é processada no morgan primeiramente
app.use(morgan('tiny'));

// permitimos com o CORS apenas o nosso frontend
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

// armazenaremos carteira e a próxima data do mint
const nextMint = new Map<string, number>();

app.post("/mint/:wallet", async (req: Request, res: Response, next: NextFunction) => {

    // controle de mint
    nextMint.set(req.params.wallet, Date.now() + (1000 * 60 * 60 * 24 * 2));


    try {
        const tx = await mintAndTransfer(req.params.wallet);
        res.json(tx);
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json(error.message);
        }

        res.status(500).json('An unknown error occurred');
    }
});


const PORT: number = parseInt(`${process.env.PORT || 3001}`);
app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});