import { QuestionTemplate } from "./questionTemplate";
import { AssessmentContext } from "../../context";
import { Column, Container, AssessmentTitle } from "@/components";
import { PreviewNotice } from "@/components";
import { ProgressBar } from "./progressBar";
import { useContext } from "react";
import { getQuestionFromConfig } from "@/services/assessment";
import {
  getFirstUnansweredQuestion,
  getQuestionJourneyFromAnswers,
} from "@/services/assessment";

export const AssessmentPage = () => {
  const { config, questionId, currentAnswers } = useContext(AssessmentContext);

  const journey = config
    ? getQuestionJourneyFromAnswers(config, currentAnswers)
    : [];

  const firstSkippedQuestionId = getFirstUnansweredQuestion(
    journey,
    currentAnswers
  );

  const currentQuestionIndex = journey.findIndex((id) => id === questionId);
  const skippedQuestionIndex = journey.findIndex(
    (id) => id === firstSkippedQuestionId
  );

  const isCurrentQuestionAfterSkippedQuestion =
    currentQuestionIndex > skippedQuestionIndex;

  const isDisabled =
    firstSkippedQuestionId && isCurrentQuestionAfterSkippedQuestion;
  console.log(config, questionId);
  const { question, section } =
    config && questionId
      ? getQuestionFromConfig(config, questionId)
      : { question: null, section: "" };
  console.log("question", question);
  return (
    <>
      {isDisabled && (
        <Container>
          <Column span={12}>
            <PreviewNotice skippedQuestionId={firstSkippedQuestionId} />
          </Column>
        </Container>
      )}
      <Container padding={isDisabled ? "1rem" : "3rem"}>
        <Column span={8}>
          {question ? (
            <>
              <AssessmentTitle
                question={question}
                section={section}
                title={config?.name || ""}
              />
              <QuestionTemplate
                question={question}
                currentAnswers={currentAnswers}
                disabled={!!isDisabled}
              />
            </>
          ) : (
            <div>Missing question</div>
          )}
        </Column>
        <ProgressBar />
      </Container>
    </>
  );
};
