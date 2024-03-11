import { SessionController } from "@domain/controllers/sessionController";
import { create } from "zustand";

type SessionStoreProps = {
  username: string;
  userId: string;
};

type SessionStoreSetters = {
  setValue: (value: SessionStoreProps) => void;
};

type SessionStore = SessionStoreProps & SessionStoreSetters;

const defaultValues: SessionStoreProps = {
  username: "",
  userId: ""
};

const useSessionStore = create<SessionStore>((set) => {
  return {
    ...defaultValues,
    setValue: (value: SessionStoreProps) => {
      set({
        userId: value.userId,
        username: value.username
      });

      SessionController.setStoredSession({
        userId: value.userId,
        username: value.username
      });
    }
  };
});

export default useSessionStore;
