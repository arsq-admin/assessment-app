import { AssessmentPage } from "./pages";
import styled from "styled-components";
import { Column, Container, FluidContainer } from "./components";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Header = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <BrowserRouter>
      <Header>
        <Container>
          <Column span={12}>Tender name</Column>
        </Container>
      </Header>
      <Container>
        <Routes>
          <Route path="/" Component={AssessmentPage} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
