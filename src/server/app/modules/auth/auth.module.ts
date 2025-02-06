import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { authenticateUser } from "./auth.controller";
import { prisma } from "../../../../infra/db/prisma/prismaClient";

export async function authModule(fastify: FastifyInstance) {
  fastify.post("/login", authenticateUser);
}
