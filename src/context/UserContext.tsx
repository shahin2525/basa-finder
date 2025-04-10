// import { getCurrentUser } from "@/services/AuthService";
// import { getCurrentUser } from "@/services/authServices";
// import { TUser } from "@/types/user";

// import {
//   createContext,
//   Dispatch,
//   SetStateAction,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// interface IUserProviderValues {
//   user: TUser | null;
//   isLoading: boolean;
//   setUser: (user: TUser | null) => void;
//   setIsLoading: Dispatch<SetStateAction<boolean>>;
// }

// const UserContext = createContext<IUserProviderValues | undefined>(undefined);

// const UserProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<TUser | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const handleUser = async () => {
//     const user = await getCurrentUser();
//     const userData = user?.data;

//     setUser(userData);
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     handleUser();
//   }, [isLoading]);

//   return (
//     <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (context == undefined) {
//     throw new Error("useUser must be used within the UserProvider context");
//   }

//   return context;
// };

// export default UserProvider;
// context/UserContext.tsx
"use client";

import { getCurrentUser } from "@/services/authServices";
import { TUser } from "@/types/user";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface IUserProviderValues {
  user: TUser | null;
  isLoading: boolean;
  refreshUser: () => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = async () => {
    setIsLoading(true);
    try {
      const userData = await getCurrentUser();
      setUser(userData?.data || null);
    } catch (error: any) {
      setUser(null);
      throw new Error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoading, refreshUser, setIsLoading }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;
