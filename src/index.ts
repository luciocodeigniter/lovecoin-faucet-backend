import dotenv from 'dotenv';
dotenv.config();

// importamos o arquivo responsável por comunicar-se coma blockchain
import { mintAndTransfer } from './Web3Provider';

// importamos o `express` e as tipagens
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan'; // faz o logging das requisições

const PORT: number = parseInt(`${process.env.PORT || 3001}`);

const app = express();

// `tiny` é o nível de logs
// toda requisição que chegar para o backend 
// é processada no morgan primeiramente
app.use(morgan('tiny'));

app.post("/mint/:wallet", async (req: Request, res: Response, next: NextFunction) => {
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

app.listen(PORT, () => {
    console.log(`Server is listening at ${PORT}`);
});