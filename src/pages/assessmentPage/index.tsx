import { QuestionTemplate } from "./questionTemplate";
import { AssessmentContext } from "../../context";
import { Column } from "@/components";
import { AssessmentTtile, PreviewNotice } from "./components";
import { ProgressBar } from "./progressBar";
import { useContext } from "react";
import { getQuestionFromConfig } from "./services";
import {
  getLastAnsweredQuestion,
  getNextQuestion,
  isQuestionLaterInAssessment,
} from "@/services/assessment";

export const AssessmentPage = () => {
  const { config, questionId, currentAnswers, questionOrder } =
    useContext(AssessmentContext);

  const lastAnsweredQuestion = getLastAnsweredQuestion(
    questionOrder,
    currentAnswers
  );

  const nextQuestion =
    config && getNextQuestion(config, lastAnsweredQuestion.id, currentAnswers);

  const isQuestionAfterLastAnsweredQuestion =
    config &&
    nextQuestion?.id &&
    isQuestionLaterInAssessment(config, questionId, nextQuestion.id);

  const hasSkippedQuestion =
    nextQuestion?.id !== questionId && isQuestionAfterLastAnsweredQuestion;

  const { question, section } =
    config && questionId
      ? getQuestionFromConfig(config, questionId)
      : { question: null, section: "" };

  return (
    <>
      {hasSkippedQuestion && (
        <Column span={12}>
          <PreviewNotice />
        </Column>
      )}
      <Column span={8}>
        {question ? (
          <>
            <AssessmentTtile
              question={question}
              section={section}
              title={config?.name || ""}
            />
            <QuestionTemplate
              question={question}
              currentAnswers={currentAnswers}
              disabled={!!hasSkippedQuestion}
            />
          </>
        ) : (
          <div>Missing question</div>
        )}
      </Column>
      <ProgressBar />
    </>
  );
};
