
import { prisma } from "../../../../infra/db/prisma/prismAClient";
import { RegisterDtoType } from "./dto/register.dto";

export class AuthRepository {
  async register(data: RegisterDtoType) {
    const response = await this.getUserByEmail(data.email)
    if (response) {
      throw new Error("User already exists");
    }
    return await prisma.users.create({
      data
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.users.findFirst({ 
      where: {
        email
      },
      select: {
        password: true,
        id: true
      }
     });
  }
}
