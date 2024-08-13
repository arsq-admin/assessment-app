import { AssessmentPage } from "./assessmentPage";
import styled from "styled-components";
import { Column, Container, FluidContainer } from "./components";

const Header = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <div>
      <Header>
        <Container>
          <Column span={12}>Tender name</Column>
        </Container>
      </Header>
      <Container>
        <AssessmentPage />
      </Container>
    </div>
  );
}

export default App;
