import { AssessmentPage } from "./assessmentPage";
import styled from "styled-components";
import { Container, FluidContainer } from "./components";

const Header = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
`;

function App() {
  return (
    <div>
      <Header>
        <Container>Tender name</Container>
      </Header>
      <AssessmentPage />
    </div>
  );
}

export default App;
