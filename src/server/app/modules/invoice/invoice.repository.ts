import { invoices, invoices_items } from "@prisma/client";
import { prisma } from "../../../../infra/db/prisma/prismaClient";
import { CreateInvoiceDtoType } from "./dtos/createInovice.dto";
import { CreateInvoiceItemDtoType } from "./dtos/createInvoiceItem.dto";

export class InvoiceRepository {
    async createInvoice(data: CreateInvoiceDtoType): Promise<invoices> {
            const { products, ...rest} = data
            return await prisma.invoices.create({
                data: {
                    ...rest
                }
            })
    }

    async createInvoiceItem(data: CreateInvoiceItemDtoType): Promise<invoices_items>{
            return await prisma.invoices_items.create({
                data
            })
    }

    async getLastInvoiceNumber() {
        const lastInvoice = await prisma.invoices.findFirst({
            select: { number: true },
            orderBy: { id: 'desc' }
        });
    
        return lastInvoice;
    }

    async updateInvoiceAmount(total: number, subtotal: number, id: number) {
        return await prisma.invoices.update({
            where: { id }, data: { total, subtotal: subtotal}
        })
    }
}