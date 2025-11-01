import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();
const allowedOrigins = [process.env.FRONTEND_URL!];


app.use(express.json());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', async (req: Request, res: Response) => {
    const sampleData = await prisma.sample.findFirst();
    res.json(sampleData);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
