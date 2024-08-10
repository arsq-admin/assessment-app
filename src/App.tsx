import { AssessmentPage } from "./assessmentPage";
import styled from "styled-components";
import { Container, FluidContainer } from "./components";
import { useAuth0 } from "@auth0/auth0-react";

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
  return (
    <>
      <Header>
        <Container>Tender name</Container>
        <LoginButton />
      </Header>
      <AssessmentPage />
    </>
  );
}

export default App;
