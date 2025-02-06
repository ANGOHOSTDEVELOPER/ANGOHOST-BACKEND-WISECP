import { users_products } from "@prisma/client";
import { prisma } from "../../../../infra/db/prisma/prismaClient";
import { CreateOrderDtoType } from "./dtos/createOrder.dto";

export class OrderRepository {
    
  async createOrder(data: CreateOrderDtoType) {
    try {
      const order = await prisma.users_products.create({
        data,
      });
      return order;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async getOrderById(id: number):Promise<users_products> {
    interface SchemaField {
      COLUMN_NAME: string;
    }

    const modelFields = await prisma.$queryRaw<SchemaField[]>`
       SELECT * FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME = 'users_products' AND COLUMN_NAME NOT IN ('suspend_date', 'cancel_date')
     `;

    const selectFields = Object.fromEntries(modelFields.map((field) => [field.COLUMN_NAME, true]));

    const paylod = await prisma.users_products.findMany({where: { id }, select: selectFields});
    if (!paylod) {
        throw new Error('Order not founded!')
    }
    return paylod[0] as unknown as users_products;
  }

  async updateInvoiceId(id: number, invoice_id: number) {
    return await prisma.users_products.update({
      where: { id }, data: { invoice_id }
    })
  }
}
