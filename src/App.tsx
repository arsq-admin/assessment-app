import { AssessmentPage } from "./assessmentPage";
import styled from "styled-components";
import { Container, FluidContainer } from "./components";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

const Header = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
`;

function LoginButton() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return !isAuthenticated ? (
    <button onClick={() => loginWithRedirect()}>Log in</button>
  ) : (
    <button onClick={() => logout()}>log out</button>
  );
}

function App() {
  const { user, getAccessTokenSilently } = useAuth0();
  const [token, setToken] = useState("");
  useEffect(() => {
    getAccessTokenSilently().then((token) => setToken(token));
  }, [user, getAccessTokenSilently]);

  return (
    <>
      <Header>
        <Container>Tender name</Container>
        {user?.email}
        <LoginButton />
      </Header>
      <p>{token}</p>
      <AssessmentPage />
    </>
  );
}

export default App;
