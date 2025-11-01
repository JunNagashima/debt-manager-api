import { PrismaClient } from '@prisma/client';
import { config } from 'dotenv';
import path from 'path';

// 環境に応じた.envファイルを読み込む
const envFile = process.env.NODE_ENV === 'production'
  ? '.env.production'
  : '.env.development';

config({ path: path.resolve(__dirname, '..', envFile) });

// Prisma Clientのシングルトンインスタンス
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;
