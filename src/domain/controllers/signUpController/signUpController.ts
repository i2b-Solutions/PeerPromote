import { RegisterUserRequest } from "@domain/entities/signUpEntities";
import {
  isEmailAvailableUseCase,
  isUsernameAvailableUseCase,
  registerUserUseCase,
} from "@domain/useCases/signUpUseCases";

export class SignUpController {
  static async isUserAvailable(username: string) {
    return await isUsernameAvailableUseCase(username);
  }

  static async isEmailAvailable(email: string) {
    return await isEmailAvailableUseCase(email);
  }

  static async registerUser(payload: RegisterUserRequest) {
    return await registerUserUseCase(payload);
  }
}
