import { AssessmentPage, ReviewPage } from "./pages";
import styled from "styled-components";
import { Column, Container, FluidContainer, Footer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AssessmentContext } from "./context";
import {
  useAssessment,
  useResetAssessment,
  useSetJourney,
} from "./pages/assessmentPage/hooks";
import introPage from "./pages/introductionPage";
import IntroPage from "./pages/introductionPage";
import IntroductionPage from "./pages/introductionPage";

const Header = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

function App() {
  const tenderName = "Mock Tender Name";
  const {
    setQuestionId,
    questionId,
    currentAnswers,
    setCurrentAnswers,
    journey,
    setJourney,
    questionOrder,
    assessmentConfig,
    reachedReviewPage,
    setReachedReviewPage,
    questionsById,
  } = useAssessment();

  // Will need to correct when we dynamically pull configs based on url
  useResetAssessment({
    setJourney,
    setQuestionId,
  });

  // Will probably need to review how the journey logic work now that it is moved to the top level
  useSetJourney({
    questionId,
    setJourney,
  });

  return (
    <AssessmentContext.Provider
      value={{
        config: assessmentConfig,
        questionId,
        questionOrder,
        setQuestionId,
        journey,
        currentAnswers,
        setCurrentAnswers,
        tenderName: tenderName,
        reachedReviewPage,
        setReachedReviewPage,
        questionsById,
      }}
    >
      <Header>
        <Container>
          <Column span={12}>{tenderName}</Column>
        </Container>
      </Header>
      <Container>
        <Routes>
          <Route path="/" Component={AssessmentPage} />
          <Route path="/introduction" Component={IntroductionPage}/>
          <Route path="/review" Component={ReviewPage} />
        </Routes>
      </Container>
      <Footer />
    </AssessmentContext.Provider>
  );
}

export default App;
