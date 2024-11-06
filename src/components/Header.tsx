import styled from "styled-components";
import { Column, Container, FluidContainer } from "./Container";
import { useContext } from "react";
import { UserContext } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/user";
// import { useUser } from "@/hooks";

const FullContainer = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
`;

interface Props {
  tenderName: string;
}

export const Header = ({ tenderName }: Props) => {
  const {
    VITE_PUBLIC_COGNITO_CLIENT_ID,
    VITE_STAGE,
    VITE_COGNITO_CALLBACK_DOMAIN,
  } = import.meta.env;

  const { user } = useContext(UserContext);

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = `https://auth-${VITE_STAGE}.supply25.com/logout?client_id=${VITE_PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${VITE_COGNITO_CALLBACK_DOMAIN}`;
    },
  });

  const redirectUrl = `${VITE_COGNITO_CALLBACK_DOMAIN}/oauth/callback`;

  return (
    <FullContainer>
      <Container>
        <Column span={9}>{tenderName}</Column>
        <Column span={3}>
          {user ? (
            <>
              <p>{user.name}</p>
              <button onClick={() => mutate()}>Log out</button>
            </>
          ) : (
            <a
              href={`https://auth-${VITE_STAGE}.supply25.com/authorize?client_id=${VITE_PUBLIC_COGNITO_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}`}
            >
              Log in
            </a>
          )}
        </Column>
      </Container>
    </FullContainer>
  );
};
