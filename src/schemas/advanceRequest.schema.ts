import { z } from 'zod';

export const createAdvanceRequestSchema = z.object({
  friendId: z.string().min(1, 'フレンドを選択してください'),
  amount: z
    .number()
    .positive('1円以上の金額を入力してください')
    .int('金額は整数で入力してください'),
  date: z
    .string()
    .min(1, '日付を選択してください')
    .refine(
      (val) => {
        const selectedDate = new Date(val);
        selectedDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate <= today;
      },
      {
        message: '未来の日付は選択できません',
      }
    ),
  note: z.string().optional(),
});

export type CreateAdvanceRequestInput = z.infer<typeof createAdvanceRequestSchema>;
