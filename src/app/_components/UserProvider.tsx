"use client";

import axios from "axios";
import { redirect, useRouter } from "next/navigation";
import {
  Children,
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
type UserData = {
  userId: string | null;
  isAdmin: boolean;
};
type AuthContextType = {
  user: UserData | null;
  tokenChecker: (_token: string) => Promise<void>;
};
export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);
export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);

  const tokenChecker = async (token: string) => {
    try {
      // console.log("Working");
      const response = await axios.post(
        "https://fooddelivery-backend-goes.onrender.com/verify",
        {
          token: token,
        }
      );
      setUser({
        userId: response.data.destructToken.userId,
        isAdmin: response.data.destructToken.isAdmin,
      });
    } catch (err) {
      redirect("/login");
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    setUser({ userId: null, isAdmin: false });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenChecker(token);
    }
  }, []);
  // const isLoggedIn=!localStorage.getItem("token")
  // const logOut = () => {
  //   localStorage.removeItem("token");
  //   setUser({ userId: null });
  // };
  return (
    <AuthContext.Provider value={{ user, tokenChecker }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext<AuthContextType>(AuthContext);
