import { FastifyReply, FastifyRequest } from "fastify";
import { CreateOrderDto, CreateOrderDtoType } from "./dtos/createOrder.dto";
import { OrderService } from "./order.service";
import { ZodError } from "zod";

const orderService = new OrderService();

export async function createOrder(req: FastifyRequest, reply: FastifyReply) {
  try {
    const body: CreateOrderDtoType = CreateOrderDto.parse(req.body);
    const order = await orderService.createOrder(body);
    return reply
      .status(201)
      .send({
        success: true,
        message: "Order created successfully!",
        data: order,
      });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    return reply
      .status(400)
      .send({ error: "Occorred an error while creating order!" });
  }
}


export async function getOrderById(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  try {
    const { id } = req.params;
    if (!id) {
      return reply.status(401).send({
        success: false,
        message: 'Id argument not found in request!'
      })
    }
    const order = await orderService.getOrderById(id)
    return reply
    .status(200)
    .send({
      success: true,
      message: "Order founded successfully!",
      data: order,
    });
  }
  catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    return reply
      .status(400)
      .send({ error: "Occorred an error while fetching order!" });
  }
}