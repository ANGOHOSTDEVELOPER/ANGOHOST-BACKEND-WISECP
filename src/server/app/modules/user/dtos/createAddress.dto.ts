import { z } from 'zod'

export const CreateAddressDto = z.object({
    owner_id: z.number(),
    country_id: z.number(),
    name: z.string(),
    surname: z.string().optional(),
    full_name: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    company_name: z.string().optional(),
    company_tax_office: z.string(),
    company_tax_number: z.string(),
    identity: z.string().optional(),
    city: z.string().optional(),
    counti: z.string().optional(),
    address: z.string().optional(),
})

export type CreateAddressDtoType = z.infer<typeof CreateAddressDto>

