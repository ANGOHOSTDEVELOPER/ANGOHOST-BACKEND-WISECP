import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { LoginDtoType } from "./dto/login.dto";
import api from "../../../../services/wicecp_api";
import { UserRepository } from "../user/user.repository";

interface IAPIResponse {
  status: string;
  data: {
    user_id: number;
    hash: string;
  };
}

const SECRET = process.env.SECRET || "secret";

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async login(data: LoginDtoType) {
    if (data.secure_hash !== "angohost") {
      const response: IAPIResponse = await (
        await api.post("/Clients/ValidateClient", {
          email: data.email,
          password: data.password,
        })
      ).data;
      if (!response || response.status !== "successful") {
        throw new Error("Invalid credentials!");
      }
      return jwt.sign({ userId: response.data.user_id }, SECRET, {
        expiresIn: "1h",
      });
    }

    const user = await this.userRepository.getUserByRef(data.email);
    if (!user) {
      throw new Error("User not founded!");
    }
    const isValid = await bcrypt.compare(data.password, user.password || "");
    if (!isValid) {
      throw new Error("Invalid credentials!");
    }
    return jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  }
}
