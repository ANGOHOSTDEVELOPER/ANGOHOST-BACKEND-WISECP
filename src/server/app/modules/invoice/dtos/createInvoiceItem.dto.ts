import { z } from 'zod'

export const CreateInvoiceItemDto = z.object({
    parent_id: z.number().default(0),
    owner_id: z.number().default(0),
    user_id: z.number().default(0),
    user_pid: z.number().default(0),
    options: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    quantity: z.number().default(1),
    taxexempt: z.number().default(0),
    oduedate: z.string().default(new Date('1971-01-01T00:00:00').toISOString()),
    amount: z.number().default(0.0),
    total_amount: z.number().default(0.0),
    currency: z.number().default(0),
    rank: z.number().default(0)
})

export type CreateInvoiceItemDtoType = z.infer<typeof CreateInvoiceItemDto>