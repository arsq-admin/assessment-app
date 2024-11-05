import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const OauthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");
  const { data } = useQuery({
    queryKey: [code],
    queryFn: () => {
      return fetch(
        `https://user-wong.supply25.com/login?code=${code}&redirect=http://localhost:5173/oauth/callback`
      );
    },
  });

  console.log("data", data);
  return <div>oauth callback</div>;
};
