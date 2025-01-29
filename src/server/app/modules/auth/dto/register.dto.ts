import { z } from "zod";

export const RegisterDto = z.object({
  type: z.string().default("member"),
  group_id: z.number().default(0),
  status: z.string().default("active"),
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  surname: z.string().optional(),
  full_name: z.string().optional(),
  company_name: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  creation_time: z.string().default(() => new Date().toISOString()),
  last_login_time: z.string().default(() => new Date().toISOString()),
  secure_hash: z.string().optional().default("angohost"),
  ip: z.string().default("0.0.0.0"),
  lang: z.string().default("pt"),
  country: z.number().default(6),
  currency: z.number().default(6),
  balance: z.number().default(0.0),
  balance_currency: z.number().default(6),
  balance_min: z.number().default(0.0),
  privilege: z.number().default(0),
  blacklist: z.number().default(0),
  aff_id: z.number().default(0),
});

export type RegisterDtoType = z.infer<typeof RegisterDto>;
