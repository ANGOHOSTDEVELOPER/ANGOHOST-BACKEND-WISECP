import { FastifyInstance } from "fastify";
import { authenticateUser, registerUser } from "./auth.controller";

export async function authModule(fastify: FastifyInstance) {
  fastify.post("/register", registerUser);
  fastify.post("/login", authenticateUser);
}
