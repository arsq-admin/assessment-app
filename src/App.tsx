import {
  AssessmentPage,
  ReviewPage,
  IntroductionPage,
  ResultPage,
  ImprovementPlanPage,
  ImprovementPlanReviewPage,
  ImprovementPlanIntroPage,
  ImprovementPlanSummary,
  ImprovementPlanResultPage,
} from "./pages";
import styled from "styled-components";
import {
  Column,
  Container,
  FluidContainer,
  Footer,
  ScrollToTop,
} from "./components";
import { Route, Routes, useSearchParams } from "react-router-dom";
import { AssessmentContext } from "./context";
import { useAssessment, useResetAssessment, useSetJourney } from "./hooks";
import { useEffect } from "react";

const Header = styled(FluidContainer)`
  border-bottom: 8px solid #ebebeb;
  display: flex;
  align-items: center;
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
    reachedImprovementPlanReviewPage,
    setReachedImprovementPlanReviewPage,
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

  const [searchParams] = useSearchParams();

  useEffect(() => {
    console.group("auth code");
    const code = searchParams.get("code");
    console.log(code);

    const url =
      "https://sso-suuply25-test.auth.eu-west-2.amazoncognito.com/oauth2/token";

    if (code) {
      fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: "6fsff5e056bptskn5ugvhjnu9f",
          code: code,
          redirect_uri: "http://localhost:5173/",
        }),
      }).then(async (data) => {
        const res = await data.json();
        console.log("data", res);
      });
    }
    console.groupEnd();
  }, [searchParams]);

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
        reachedImprovementPlanReviewPage,
        setReachedImprovementPlanReviewPage,
      }}
    >
      <ScrollToTop />
      <Header>
        <Container>
          <Column span={9}>{tenderName}</Column>
          <Column span={3}>
            <a href="https://sso-suuply25-test.auth.eu-west-2.amazoncognito.com/login?client_id=6fsff5e056bptskn5ugvhjnu9f&response_type=code&redirect_uri=http://localhost:5173/">
              Log in
            </a>
          </Column>
        </Container>
      </Header>

      <Routes>
        <Route path="/" Component={IntroductionPage} />
        <Route path="/assessment" Component={AssessmentPage} />
        <Route path="/review" Component={ReviewPage} />
        <Route path="/result" Component={ResultPage} />
        <Route path="/improvement-plan/:id" Component={ImprovementPlanPage} />
        <Route
          path="/improvement-plan/result"
          Component={ImprovementPlanResultPage}
        />
        <Route
          path="/improvement-plan/summary"
          Component={ImprovementPlanSummary}
        />
        <Route
          path="/improvement-plan/introduction"
          Component={() => (
            <ImprovementPlanIntroPage
              buttonName="Continue"
              redirectUrl="/improvement-plan/summary"
            />
          )}
        />
        <Route
          path="/improvement-plan/review"
          Component={ImprovementPlanReviewPage}
        />
      </Routes>

      <Footer />
    </AssessmentContext.Provider>
  );
}

export default App;
