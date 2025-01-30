import { FastifyRequest, FastifyReply } from "fastify";
import { ZodError } from "zod";
import { LoginDto, LoginDtoType } from "./dto/login.dto";
import { AuthService } from "./auth.service";

const authService = new AuthService();

export async function authenticateUser(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body: LoginDtoType = LoginDto.parse(req.body);
    const token = await authService.login(body);
    return reply.status(200).send({
      success: true,
      message: "User authenticated successfully!",
      data: { token },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return reply.status(400).send({ error: error.errors });
    }
    return reply.status(401).send({ error: "Invalid credentials!" });
  }
}
