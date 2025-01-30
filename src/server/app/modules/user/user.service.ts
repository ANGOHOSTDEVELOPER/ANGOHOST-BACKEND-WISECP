import { CreateUserDtoType } from "./dtos/createUser.dto";
import { UpdateUserDtoType } from "./dtos/updateUser.dto";
import { UserRepository } from "./user.repository";
import bcrypt from "bcrypt";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserByRef(ref: string) {
    console.log(ref)
    return await this.userRepository.getUserByRef(ref);
  }

  async getAllUsers(limit: number) {
    return await this.userRepository.getAllUsers(limit);
  }

  async updateUser(id: number, data: UpdateUserDtoType) {
    return await this.userRepository.updateUser(id, data);
  }

  async deleteUser(id: number) {
    return await this.userRepository.deleteUser(id);
  }

  async createUser(data: CreateUserDtoType) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.userRepository.createUser({
      ...data,
      password: hashedPassword,
    });
  }

  async changePassword(id: number, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.changePassword(id, hashedPassword);
  }
}
