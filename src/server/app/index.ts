import Fastify from "fastify";
import { routes } from "../../infra/routes/routes";

const app = Fastify({ logger: true });

app.register(routes);

app.get("/", async (request, reply) => {
    return { message: "Wellcome to Angohost API!" };
}); 

export default app;