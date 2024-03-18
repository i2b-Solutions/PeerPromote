import { SessionController } from "@domain/controllers/sessionController";
import { create } from "zustand";

type SessionStoreProps = {
  username: string;
  userId: string;
  loggedIn: boolean;
  isCompany: boolean;
};

type SessionStoreSetters = {
  setValue: (value: SessionStoreProps) => void;
};

type SessionStore = SessionStoreProps & SessionStoreSetters;

const defaultValues: SessionStoreProps = {
  username: "",
  userId: "",
  loggedIn: false,
  isCompany: false
};

const useSessionStore = create<SessionStore>((set) => {
  return {
    ...defaultValues,
    setValue: (value: SessionStoreProps) => {
      set(value);

      SessionController.setStoredSession({
        userId: value.userId,
        username: value.username,
        loggedIn: value.loggedIn,
        isCompany: value.isCompany
      });
    }
  };
});

export default useSessionStore;
