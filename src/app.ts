import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";
import accountsRouter from './routes/accounts';
import advancesRouter from './routes/advances';

const app = express();
const prisma = new PrismaClient();
const allowedOrigins = [process.env.FRONTEND_URL!];

app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', async (req: Request, res: Response) => {
  const sampleData = await prisma.sample.findFirst();
  res.json(sampleData);
});

app.use('/accounts', accountsRouter);
app.use('/advances', advancesRouter);

export default app;
