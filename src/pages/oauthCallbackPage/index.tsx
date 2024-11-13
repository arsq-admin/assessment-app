import { login } from "@/api/user";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const OauthCallbackPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { isSuccess } = useQuery({
    queryKey: [code],
    queryFn: login,
    enabled: Boolean(code),
  });

  // TODO: Need to include the state maybe?
  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess, navigate]);

  return <div>oauth callback</div>;
};
