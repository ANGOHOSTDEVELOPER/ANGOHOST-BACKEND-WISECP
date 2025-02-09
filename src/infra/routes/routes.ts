import { FastifyInstance } from "fastify";
import { authModule } from "../../server/app/modules/auth/auth.module";
import { userModule } from "../../server/app/modules/user/user.module";
import { orderModule } from "../../server/app/modules/order/order.module";
import { invoiceModule } from "../../server/app/modules/invoice/invoice.module";
import { generalModule } from "../../server/app/modules/general/general.module";

export async function routes(fastify: FastifyInstance) {
  fastify.register(authModule, { prefix: "/auth" });
  fastify.register(userModule, { prefix: "/users" });
  fastify.register(orderModule, { prefix: "/orders" })
  fastify.register(invoiceModule, { prefix: "/invoices" })
  fastify.register(generalModule, { prefix: "/general" })
}
