import { z } from "zod";

export const CreateOrderDto = z.object({
  owner_id: z.number(),
  inovice_id: z.number().optional(),
  subscription_id: z.number().optional().default(0),
  type: z.string(),
  type_id: z.number(),
  product_id: z.number(),
  name: z.string(),
  period: z.string(),
  period_time: z.number(),
  total_amount: z.number(),
  amount: z.number(),
  amount_cid: z.number(),
  status: z.string().optional().default('pending'),
  status_msg: z.string().optional().default(""),
  suspended_reason: z.null().optional(),
  pmethod: z.string().optional().default("none"),
  suspend_date: z.string().default(() => new Date().toISOString()),
  cancel_date: z.string().default(() => new Date().toISOString()),
  auto_pay: z.number().optional().default(0),
  cdate: z.string().default(() => new Date().toISOString()),
  duedate: z.string().default(() => new Date().toISOString()),
  terminated_date: z.string().default(() => new Date().toISOString()),
  server_terminated: z.number().optional().default(0),
  renewaldate: z.string().default(() => new Date().toISOString()),
  process_exemption_date: z.string().default(() => new Date().toISOString()),
  module: z.string(),
  options: z.string(),
  notes: z.string().optional(),
  unread: z.number().optional().default(1)
});

export type CreateOrderDtoType = z.infer<typeof CreateOrderDto>;