import styled from "styled-components";
import { Column, Container, FluidContainer } from "./Container";
import { useContext } from "react";
import { AssessmentContext, UserContext } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/api/user";
import { DOMAIN } from "@/api";
import { scotGovColour } from "@/themes";

const FullContainer = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
`;

const PreviewBanner = styled(FluidContainer)`
  background-color: #d9effc;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
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
  referenceId?: string;
  tenderName?: string;
}

export const Header = ({ tenderName, referenceId }: Props) => {
  const {
    VITE_PUBLIC_COGNITO_CLIENT_ID,
    VITE_STAGE,
    VITE_COGNITO_CALLBACK_DOMAIN,
  } = import.meta.env;
  const { secondaryText } = scotGovColour;

  const { user, organisations } = useContext(UserContext);
  const { config } = useContext(AssessmentContext);
  const { isTemplate } = config || {};

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      window.location.href = `https://auth-${VITE_STAGE}.supply25.com/logout?client_id=${VITE_PUBLIC_COGNITO_CLIENT_ID}&logout_uri=${VITE_COGNITO_CALLBACK_DOMAIN}`;
    },
  });

  const fullUrl = window.location.href;
  const state = fullUrl.includes("localhost")
    ? fullUrl.split("localhost:5173")[1]
    : fullUrl.split(DOMAIN)[1];

  const redirectUrl = `${VITE_COGNITO_CALLBACK_DOMAIN}/oauth/callback`;

  return (
    <>
      <FullContainer>
        <Container>
          <Column span={12}>
            <Wrapper>
              <p>
                <b>
                  {referenceId &&
                    tenderName &&
                    `${referenceId} | ${tenderName}`}
                </b>
              </p>
              <div
                style={{ display: "flex", alignItems: "center", gap: "2rem" }}
              >
                {user ? (
                  <>
                    <div style={{ textAlign: "right" }}>
                      <p>{user.name}</p>
                      <p style={{ color: secondaryText }}>
                        {organisations[0].name}
                      </p>
                    </div>
                    <button
                      className="ds_button ds_button--secondary"
                      onClick={() => mutate()}
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <a
                    href={`https://auth-${VITE_STAGE}.supply25.com/authorize?client_id=${VITE_PUBLIC_COGNITO_CLIENT_ID}&response_type=code&redirect_uri=${redirectUrl}&state=${state}`}
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
