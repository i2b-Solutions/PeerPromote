import { RegisterUserRequest } from "@domain/entities/signUpEntities";
import {
  checkEmailAvailabilityUseCase,
  checkUsernameAvailabilityUseCase,
  registerUserUseCase,
} from "@domain/useCases/signUpUseCases";

export class SignUpController {
  static async checkUserAvailability(username: string) {
    return await checkUsernameAvailabilityUseCase(username);
  }

  static async checkEmailAvailability(email: string) {
    return await checkEmailAvailabilityUseCase(email);
  }

  static async registerUser(payload: RegisterUserRequest) {
    return await registerUserUseCase(payload);
  }
}
