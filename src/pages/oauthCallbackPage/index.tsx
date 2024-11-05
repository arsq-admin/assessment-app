import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const OauthCallbackPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { isSuccess } = useQuery({
    queryKey: [code],
    queryFn: () => {
      return fetch(
        `https://user-wong.supply25.com/login?code=${code}&redirect=http://localhost:5173/oauth/callback`
      );
    },
    enabled: Boolean(code),
  });

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return <div>oauth callback</div>;
};
