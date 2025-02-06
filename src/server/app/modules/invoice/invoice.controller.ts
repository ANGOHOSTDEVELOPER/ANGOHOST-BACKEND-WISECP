import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateInvoiceDto,
  CreateInvoiceDtoType,
} from "./dtos/createInovice.dto";
import { ZodError } from "zod";
import { InvoiceService } from "./invoice.service";
import {
  CreateInvoiceItemDto,
  CreateInvoiceItemDtoType,
} from "./dtos/createInvoiceItem.dto";

const invoiceService = new InvoiceService();

export async function createInvoice(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body: CreateInvoiceDtoType = CreateInvoiceDto.parse(req.body);
    const invoice = await invoiceService.createInvoice(body);
    return reply.status(201).send({
      success: true,
      message: "Invoice created successufully!",
      data: invoice,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    return reply
      .status(400)
      .send({ error: "Occorred an error while creating invoice!" });
  }
}

export async function createInvoiceItem(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body: CreateInvoiceItemDtoType = CreateInvoiceItemDto.parse(req.body);
    const invoiceItem = await invoiceService.createInvoiceItem(body);
    return reply.status(201).send({
      success: true,
      message: "Invoice item created successufully!",
      data: invoiceItem,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    return reply
      .status(400)
      .send({ error: "Occorred an error while creating invoice item!" });
  }
}
