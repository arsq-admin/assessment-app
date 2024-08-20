import { AssessmentPage, ReviewPage } from "./pages";
import styled from "styled-components";
import { Column, Container, FluidContainer } from "./components";
import { Route, Routes } from "react-router-dom";
import { AssessmentContext } from "./context";
import {
  useAssessment,
  useResetAssessment,
  useSetJourney,
} from "./pages/assessmentPage/hooks";

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
    inPreviewMode,
    setInPreviewMode,
    lastSkippedQuestion,
    setlastSkippedQuestion,
    questionsById,
    isComplete,
    setIsComplete,
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
        inPreviewMode,
        setInPreviewMode,
        lastSkippedQuestion,
        setlastSkippedQuestion,
        questionsById,
        isComplete,
        setIsComplete,
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
          <Route path="/review" Component={ReviewPage} />
        </Routes>
      </Container>
    </AssessmentContext.Provider>
  );
}

export default App;
