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
  PrepareAssessmentPage,
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
            tenderName: tenderPackage?.name || "",
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
            <Route path="/:urlId" Component={PrepareAssessmentPage} />
            <Route path="/:urlId/introduction" Component={IntroductionPage} />
            <Route path="/:urlId/assessment" Component={AssessmentPage} />
            <Route path="/:urlId/review" Component={ReviewPage} />
            <Route path="/:urlId/result" Component={ResultPage} />
            <Route
              path="/:urlId/oauth/callback"
              Component={OauthCallbackPage}
            />
            <Route
              path="/:urlId/improvement-plan/:id"
              Component={ImprovementPlanPage}
            />
            <Route
              path="/:urlId/improvement-plan/result"
              Component={ImprovementPlanResultPage}
            />
            <Route
              path="/:urlId/improvement-plan/summary"
              Component={ImprovementPlanSummary}
            />
            <Route
              path="/:urlId/improvement-plan/introduction"
              Component={() => (
                <ImprovementPlanIntroPage
                  buttonName="Continue"
                  redirectUrl="/improvement-plan/summary"
                />
              )}
            />
            <Route
              path="/:urlId/improvement-plan/review"
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
