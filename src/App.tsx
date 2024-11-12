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
  OauthCallbackPage,
  HomePage,
} from "./pages";
import { Footer, Header, ScrollToTop } from "./components";
import { Route, Routes } from "react-router-dom";
import {
  AssessmentContext,
  TenderPackageContext,
  UserContext,
} from "./context";
import {
  useAssessment,
  useAuthenticated,
  useResetAssessment,
  useSetJourney,
  useTenderPackage,
} from "./hooks";

function App() {
  const { user, setUser } = useAuthenticated();
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
    setAssessmentConfig,
  } = useAssessment();

  // Will need to correct when we dynamically pull configs based on url
  useResetAssessment({
    setJourney,
    setQuestionId,
    assessmentConfig,
  });

  const { tenderPackage, setTenderPackage } = useTenderPackage();

  // Will probably need to review how the journey logic work now that it is moved to the top level
  useSetJourney({
    questionId,
    setJourney,
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <TenderPackageContext.Provider
        value={{ tenderPackage, setTenderPackage }}
      >
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
            setAssessmentConfig,
          }}
        >
          <ScrollToTop />
          <Header tenderName={tenderPackage?.name || ""} />
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="/introduction" Component={IntroductionPage} />
            <Route path="/assessment" Component={AssessmentPage} />
            <Route path="/review" Component={ReviewPage} />
            <Route path="/result" Component={ResultPage} />
            <Route path="/oauth/callback" Component={OauthCallbackPage} />
            <Route
              path="/improvement-plan/:id"
              Component={ImprovementPlanPage}
            />
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
      </TenderPackageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
