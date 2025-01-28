import Fastify from "fastify";



const app = Fastify({});



app.get("/", async (request, reply) => {
    return { hello: "world" };
}); 
app.get("/api", async (request, reply) => {
    return { hello: "world" };
}); 




export default app;