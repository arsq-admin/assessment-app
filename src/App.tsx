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
            <Route path="/" element={<HomePage />} />
            <Route path="/oauth/callback" element={<OauthCallbackPage />} />

            <Route path="/:urlId" element={<PrepareAssessmentPage />}>
              <Route
                path="/:urlId/introduction"
                element={<IntroductionPage />}
              />
              <Route path="/:urlId/assessment" element={<AssessmentPage />} />
              <Route path="/:urlId/review" element={<ReviewPage />} />
              <Route path="/:urlId/result" element={<ResultPage />} />
              <Route
                path="/:urlId/improvement-plan/:id"
                element={<ImprovementPlanPage />}
              />
              <Route
                path="/:urlId/improvement-plan/result"
                element={<ImprovementPlanResultPage />}
              />
              <Route
                path="/:urlId/improvement-plan/summary"
                element={<ImprovementPlanSummary />}
              />
              <Route
                path="/:urlId/improvement-plan/introduction"
                element={
                  <ImprovementPlanIntroPage
                    buttonName="Continue"
                    redirectUrl="/improvement-plan/summary"
                  />
                }
              />
              <Route
                path="/:urlId/improvement-plan/review"
                element={<ImprovementPlanReviewPage />}
              />
            </Route>
          </Routes>

          <Footer />
        </AssessmentContext.Provider>
      </TenderPackageContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
