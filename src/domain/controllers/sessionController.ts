import { SessionStorage } from "@domain/entities/sessionEntities";
import {
  getStoredSessionUseCase,
  setStoredSessionUseCase
} from "@domain/useCases/sessionUseCases";

export class SessionController {
  static getStoredSession() {
    return getStoredSessionUseCase();
  }

  static setStoredSession(session: SessionStorage) {
    return setStoredSessionUseCase(session);
  }
}
