import { CreateAddressDtoType } from "./dtos/createAddress.dto";
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
    const {address, password, ...filteredData} = data
    const hashedPassword = await bcrypt.hash(data.password, 10);
    try {
      const createdUser = await this.userRepository.createUser({
        ...filteredData,
        password: hashedPassword,
      });
      const userAddress:CreateAddressDtoType = {
        name: createdUser.name || "",
        surname: createdUser.surname || "",
        full_name: createdUser.full_name || "",
        country_id: createdUser.country,
        owner_id: createdUser.id,
        address: address.address || "",
        city: address.city || "",
        company_name: createdUser.company_name || "",
        company_tax_number: address.company_tax_number || "",
        company_tax_office: address.company_tax_office || "",
        counti: address.counti || "",
        email: createdUser.email || "",
        identity: address.identity || "",
        phone: createdUser.phone || "",
      }
      await this.userRepository.createUserAdddress(userAddress)
      return createdUser;
    }
    catch (error) {
      console.log(error)
      return error
    }
  }

  async changePassword(id: number, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userRepository.changePassword(id, hashedPassword);
  }

  async getUserAddress(id: string) {
    return await this.userRepository.getUserAddress(parseInt(id))
  }
}
