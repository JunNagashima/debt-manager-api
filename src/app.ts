import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";
import accountsRouter from './routes/accounts';
import advancesRouter from './routes/advances';
import friendsRouter from './routes/friends';

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
app.use('/friends', friendsRouter);

export default app;
