import { z } from "zod";

export const UpdateUserDto = z.object({
  type: z.string(),
  group_id: z.number(),
  status: z.string(),
  name: z.string(),
  surname: z.string(),
  full_name: z.string(),
  company_name: z.string(),
  phone: z.string(),
  email: z.string().email("Email inválido"),
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

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
