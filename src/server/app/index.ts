import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "../../infra/routes/routes";

const app = Fastify({ logger: true });

app.register(cors, {
    origin: "*", // Permite requisições de qualquer origem
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
});

app.register(routes);

app.get("/", async (request, reply) => {
    return { message: "Wellcome to Angohost API!" };
}); 

export default app;