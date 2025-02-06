import { z } from "zod";

export const CreateInvoiceDto = z.object({
  number: z.string().optional(),
  user_id: z.number().default(0),
  user_data: z.string().optional(),
  cdate: z.string().default(() => new Date().toISOString()),
  duedate: z.string().default(() => new Date().toISOString()),
  datepaid: z.string().default(() => new Date(0).toISOString()),
  refunddate: z.string().default(() => new Date(0).toISOString()),
  local: z.number().optional().default(1),
  legal: z.number().optional().default(0),
  taxed: z.number().optional().default(0),
  taxed_file: z.string().nullable().optional().default(null),
  data: z.string().nullable().optional(),
  status: z.string().optional().default("unpaid"),
  currency: z.number().optional().default(6),
  taxation_type: z.string().optional().default("exclusive"),
  taxrate: z.number().optional().default(0),
  tax: z.number().optional().default(0),
  subtotal: z.number().optional().default(0),
  total: z.number().optional().default(0),
  recurring: z.number().default(0),
  recurring_time: z.number().default(0),
  recurring_period: z.string().optional().default("none"),
  discounts: z.string().nullable().optional().default(""),
  used_coupons: z.string().max(300).nullable().optional(),
  used_promotions: z.string().max(300).nullable().optional(),
  sendbta: z.number().optional().default(0),
  sendbta_amount: z.number().optional().default(0),
  pmethod: z.string().default("none").optional(),
  pmethod_commission: z.number().default(0.0).optional(),
  pmethod_commission_rate: z.number().default(0.0).optional(),
  pmethod_status: z.string().nullable().optional().default("none"),
  pmethod_msg: z.string().max(255).nullable().optional().default(null),
  notes: z.string().nullable().optional().default(null),
  unread: z.number().default(0).optional().default(1),
  products: z.array(z.object({
    id: z.number(),
    quantity: z.number().optional().default(1),
    rank: z.number(),
    currency: z.number().optional().default(6)
  }))
});

export type CreateInvoiceDtoType = z.infer<typeof CreateInvoiceDto>;
