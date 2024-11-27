import { getMyOrganisations, getMyUserInfo } from "@/api/user";
import { Organisation, User } from "@/api/user/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useAuthenticated = () => {
  const [user, setUser] = useState<User | null>(null);
  const [organisations, setOrganisations] = useState<Organisation[]>([]);
  const { pathname } = useLocation();

  const { data: myUser } = useQuery({
    queryKey: ["getMyUserInfo"],
    queryFn: getMyUserInfo,
    retry: 1,
    enabled: pathname !== "/oauth/callback",
  });

  const { data: myOrgs } = useQuery({
    queryKey: ["getMyOrgs"],
    queryFn: getMyOrganisations,
    retry: 1,
    enabled: pathname !== "/oauth/callback",
  });

  useEffect(() => {
    if (myUser && myOrgs) {
      setUser(myUser);
      setOrganisations(myOrgs.data);
    }
  }, [myOrgs, myUser]);

  return {
    user,
    setUser,
    organisations,
    setOrganisations,
  };
};
