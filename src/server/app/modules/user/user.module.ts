import { FastifyInstance } from "fastify";
import { changePassword, createUser, deleteUser, getAllUsers, getUser, updateUser } from "./user.controller";

export async function userModule(fastify: FastifyInstance) {
    fastify.get("/:reference", getUser);
    fastify.get("/limit/:limit", getAllUsers);
    fastify.put("/:id", updateUser);
    fastify.delete("/:id", deleteUser);
    fastify.post("", createUser);
    fastify.post("/changePassword/:id", changePassword);
}