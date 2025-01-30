import { FastifyInstance } from "fastify";
import { authModule } from "../../server/app/modules/auth/auth.module";
import { userModule } from "../../server/app/modules/user/user.module";

export async function routes(fastify: FastifyInstance) {
  fastify.register(authModule, { prefix: "/auth" });
  fastify.register(userModule, { prefix: "/users" });
}
