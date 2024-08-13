import { QuestionTemplate } from "./questionTemplate";
import { AssessmentContext } from "./context";
import { useAssessment, useResetAssessment, useSetJourney } from "./hooks";
import { Column } from "@/components";
import { AssessmentTtile } from "./components";
import { ProgressBar } from "./progressBar";

export const AssessmentPage = () => {
  const {
    setQuestionId,
    questionId,
    currentAnswers,
    setCurrentAnswers,
    journey,
    setJourney,
    question,
    section,
    questionOrder,
    assessmentConfig,
  } = useAssessment();

  useResetAssessment({
    setJourney,
    setQuestionId,
  });

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
      }}
    >
      <Column span={9}>
        {question ? (
          <>
            <AssessmentTtile
              question={question}
              section={section}
              title={assessmentConfig.name}
            />
            <QuestionTemplate
              question={question}
              currentAnswers={currentAnswers}
            />
          </>
        ) : (
          <div>Missing question</div>
        )}
      </Column>
      <ProgressBar />
    </AssessmentContext.Provider>
  );
};
