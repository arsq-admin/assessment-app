import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const OauthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const code = searchParams.get("code");
  }, [searchParams]);

  return <div>oauth callback</div>;
};
