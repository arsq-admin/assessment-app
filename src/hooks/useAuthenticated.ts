import { getMyUserInfo } from "@/api/user";
import { User } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAuthenticated = () => {
  const [user, setUser] = useState<User | null>(null);
  const { pathname } = useLocation();

  const { data } = useQuery({
    queryKey: ["getMyUserInfo"],
    queryFn: getMyUserInfo,
    retry: 1,
    enabled: pathname !== "/oauth/callback",
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, user]);

  return {
    user,
    setUser,
  };
};
