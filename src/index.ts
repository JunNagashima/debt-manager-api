import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/', async (req: Request, res: Response) => {
    const sampleData = await prisma.sample.findMany();
    res.json({ message: 'Hello, World!', data: sampleData });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
