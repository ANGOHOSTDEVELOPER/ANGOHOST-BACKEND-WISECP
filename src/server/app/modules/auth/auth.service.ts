import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RegisterDtoType } from "./dto/register.dto";
import { LoginDtoType } from "./dto/login.dto";
import { AuthRepository } from "./auth.respository";
import api from "../../../../services/wicecp_api";

interface IAPIResponse {
  status: string;
  data: {
    user_id: number;
    hash: string;
  };
}

const SECRET = process.env.SECRET || "secret";

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterDtoType) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await this.authRepository.register({
      ...data,
      password: hashedPassword,
    });
  }

  async login(data: LoginDtoType) {
    if (data.secure_hash !== "angohost") {
      const response: IAPIResponse = await (await api.post("/Clients/ValidateClient", {email: data.email, password: data.password})).data;
      if (!response || response.status !== "successful") {
        throw new Error("Invalid credentials!");
      }
      return jwt.sign({ userId: response.data.user_id }, SECRET, {
        expiresIn: "1h",
      });
    }
    
    const user = await this.authRepository.getUserByEmail(data.email);
    if (!user) {
      throw new Error("User nof found!");
    }
    const isValid = await bcrypt.compare(data.password, user.password || "");
    if (!isValid) {
      throw new Error("Invalid credentials!");
    }
    return jwt.sign({ userId: user.id }, SECRET, { expiresIn: "1h" });
  }
}
