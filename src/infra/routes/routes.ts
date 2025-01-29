import { FastifyInstance } from "fastify";
import { authModule } from "../../server/app/modules/auth/auth.module";

export async function routes(fastify: FastifyInstance) {
  fastify.register(authModule, { prefix: "/auth" });
}
