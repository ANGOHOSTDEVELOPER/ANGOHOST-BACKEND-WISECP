import { z } from "zod";

export const LoginDto = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "A senha é obrigatória"),
  secure_hash: z.string().optional(),
});

export type LoginDtoType = z.infer<typeof LoginDto>;