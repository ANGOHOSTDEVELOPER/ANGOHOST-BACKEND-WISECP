import { FastifyInstance } from "fastify";
import { createOrder, getOrderById } from "./order.controller";

export async function orderModule(fastify: FastifyInstance) {
    fastify.post("/", createOrder)
    fastify.get("/:id", getOrderById)
}