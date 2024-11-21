import styled from "styled-components";
import { Column, Container, FluidContainer } from "./Container";
import { useContext } from "react";
import { AssessmentContext, UserContext } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/user";

const FullContainer = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
`;

const PreviewBanner = styled(FluidContainer)`
  background-color: #d9effc;
  display: flex;
  align-items: center;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  * {
    margin: 0;
  }
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
  const { config } = useContext(AssessmentContext);
  const { isTemplate } = config || {};

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = `https://auth-${VITE_STAGE}.supply25.com/logout?client_id=${VITE_PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${VITE_COGNITO_CALLBACK_DOMAIN}`;
    },
  });

  const redirectUrl = `${VITE_COGNITO_CALLBACK_DOMAIN}/oauth/callback`;

  return (
    <>
      <FullContainer>
        <Container>
          <Column span={12}>
            <Wrapper>
              <div>{tenderName}</div>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                {user ? (
                  <>
                    <p>{user.name}</p>
                    <button
                      className="ds_button ds_button--secondary"
                      onClick={() => mutate()}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <a
                    href={`https://auth-${VITE_STAGE}.supply25.com/authorize?client_id=${VITE_PUBLIC_COGNITO_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}`}
                  >
                    Log in
                  </a>
                )}
              </div>
            </Wrapper>
          </Column>
        </Container>
      </FullContainer>
      {isTemplate && (
        <PreviewBanner>
          <Container>
            <Column span={12}>
              <p style={{ margin: "0", textAlign: "center" }}>
                You are currently previewing an assessment. This is not tied to
                any tender.
              </p>
            </Column>
          </Container>
        </PreviewBanner>
      )}
    </>
  );
};
