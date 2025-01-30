import { FastifyInstance } from "fastify";
import { authenticateUser } from "./auth.controller";

export async function authModule(fastify: FastifyInstance) {
  fastify.post("/login", authenticateUser);
}
