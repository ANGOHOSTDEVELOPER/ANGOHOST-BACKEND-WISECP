import { FastifyInstance } from "fastify";
import { createInvoiceItem, createInvoice } from "./invoice.controller";

export async function invoiceModule(fastify: FastifyInstance) {
    fastify.post("/", createInvoice)
    fastify.post("/item", createInvoiceItem)
}