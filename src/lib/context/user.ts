import { createContext } from "react";
import { User } from "../entities";

const UserContext = createContext<
  | {
      user?: User;
      token: any;
      setToken: any;
      clearToken: any;
      setUser: (user?: User) => void;
    }
  | undefined
>(undefined);
export const UserContextProvider = UserContext.Provider;
export const UserContextConsumer = UserContext.Consumer;

export default UserContext;
