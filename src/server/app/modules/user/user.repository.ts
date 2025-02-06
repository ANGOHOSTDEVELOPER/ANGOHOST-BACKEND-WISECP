import { log } from "console";
import { prisma } from "../../../../infra/db/prisma/prismaClient";
import { CreateUserDtoType } from "./dtos/createUser.dto";
import { UpdateUserDtoType } from "./dtos/updateUser.dto";
import { CreateAddressDtoType } from "./dtos/createAddress.dto";
import { users_addresses } from "@prisma/client";

export class UserRepository {

  async getUserByRef(reference: string) {
    if (reference.includes("@")) {
      return await prisma.users.findFirst({
        where: {
          email: reference,
        },
      });
    }
    return await prisma.users.findFirst({
      where: {
        id: parseInt(reference),
      },
    });
  }

  async getAllUsers(limit: number) {
    if (limit === 0) {
      return await prisma.users.findMany();
    }
    return await prisma.users.findMany({
      take: limit,
    });
  }

  async updateUser(id: number, data: UpdateUserDtoType) {
    console.log(id)
    try {
      return await prisma.users.update({
        where: {
          id: id,
        },
        data,
      });
    }
    catch (error) {
      console.error(error);
    }
  }

  async deleteUser(id: number) {
    return await prisma.users.delete({
      where: {
        id: id,
      },
    });
  }

  async createUser(data: Omit<CreateUserDtoType, "address">) {
    const response = await this.getUserByRef(data.email);
    if (response) {
      throw new Error("User already exists");
    }
    return await prisma.users.create({
      data,
    });
  }

  async changePassword(id: number, password: string) {
    return await prisma.users.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
  }

  async createUserAdddress(data: CreateAddressDtoType) {
    return await prisma.users_addresses.create({
      data
    })
  }

  async getUserAddress(id: number):Promise<users_addresses[]> {
    return await prisma.users_addresses.findMany({
      where: { owner_id: id }
    })
  }
}
