import { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "./user.service";
import { CreateUserDto, CreateUserDtoType } from "./dtos/createUser.dto";
import { ZodError } from "zod";
import { UpdateUserDto, UpdateUserDtoType } from "./dtos/updateUser.dto";
import bcrypt from "bcrypt";

const userService = new UserService();

export async function getUser(req: FastifyRequest<{ Params: { reference: string } }>, reply: FastifyReply) {
  const { reference } = req.params;
  if (!reference) {
    return reply.status(400).send({ error: "Reference not provided!" });
  }
  const user = await userService.getUserByRef(reference);
  if (!user) {
    return reply.status(404).send({ error: "User not found!" });
  }
  return reply
    .status(200)
    .send({ success: true, message: "User founded successfully!", data: user });
}

export async function getAllUsers(req: FastifyRequest<{ Params: { limit: string } }>, reply: FastifyReply) {
    const { limit } = req.params;
    if (!limit) {
      return reply.status(400).send({ error: "Limit not provided!" });
    }
  const users = await userService.getAllUsers(parseInt(limit));
  return reply.status(200).send({
    success: true,
    message: "Users founded successfully!",
    data: users,
  });
}

export async function updateUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = req.params;
  if (!id) {
    return reply.status(400).send({ error: "Id not provided!" });
  }

  try {
    const body: UpdateUserDtoType = UpdateUserDto.parse(req.body);
    const user = await userService.updateUser(parseInt(id), body);
    if (!user) {
      return reply
        .status(404)
        .send({ success: false, message: "User not found!" });
    }
    return reply
      .status(200)
      .send({ success: true, message: "User updated successfully!", data: user });
  }
    catch (error) {
        if (error instanceof ZodError) {
        return reply.status(400).send({ error: error.errors });
        }
        return reply
        .status(400)
        .send({ error: "Occorred an error while updating user!" });
    }
}

export async function deleteUser(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = req.params;
  if (!id) {
    return reply.status(400).send({ error: "Id not provided!" });
  }
  const user = await userService.deleteUser(parseInt(id));
  if (!user) {
    return reply
      .status(404)
      .send({ success: false, message: "User not found!" });
  }
  return reply
    .status(200)
    .send({ success: true, message: "User deleted successfully!", data: user });
}

export async function createUser(req: FastifyRequest, reply: FastifyReply) {
  
  try {
    const body: CreateUserDtoType = CreateUserDto.parse(req.body);
    const user = await userService.createUser(body);
    return reply
      .status(201)
      .send({ success: true, message: "User created successfully!", data: user });
  }
    catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    return reply
      .status(400)
      .send({ error: "Occorred an error while creating user!" });
  }
  
}

export async function changePassword(req: FastifyRequest<{ Params: { id: string }; Body: { oldPassword: string; newPassword: string } }>, reply: FastifyReply) {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.params;
  if (!id) {
    return reply.status(400).send({ error: "Id not provided!" });
  }
  if (!oldPassword || !newPassword) {
    return reply.status(400).send({ error: "Old password or new password not provided!" });
  }
  try {
    const user = await userService.getUserByRef(id);
    if (!user) {
      return reply.status(404).send({ error: "User not found!" });
    }
    const isPasswordValid = await bcrypt.compare(oldPassword, user.password || "");
    if (!isPasswordValid) {
      return reply.status(400).send({ error: "Old password is invalid!" });
    }
    await userService.changePassword(user.id, newPassword);
  }
  catch (error) {
    return reply.status(400).send({ error: "Occorred an error while changing password!" });
  }
  return reply.status(200).send({ success: true, message: "Password changed successfully!" });
}

export async function getUserAddress(req: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
  const { id } = req.params;
  if (!id) {
    return reply.status(400).send({ error: "Id not provided!" });
  }
  const address = await userService.getUserAddress(id);
  if (!address) {
    return reply
      .status(404)
      .send({ success: false, message: "Address not found!" });
  }
  return reply
    .status(200)
    .send({ success: true, message: "Address founded successfully!", data: address });
}