import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { QuestionAndAnswer } from "../reviewPage/useAnswers";

interface SavedFailedQuestions {
  questionIds: QuestionAndAnswer[];
}

export const useImprovementPlan = () => {
  const { config, questionId, setQuestionId } = useContext(AssessmentContext);
  const failedAnswersJson = localStorage.getItem(
    `failed-questions-${config?.id}`
  );

  const { questionIds: failedAnswers } = JSON.parse(
    failedAnswersJson || ""
  ) as SavedFailedQuestions;

  const failedAnswer = failedAnswers.find((answer) => {
    return answer?.id === questionId;
  });

  const onPrev = (callback: () => void) => {
    const currentIndex = failedAnswers.findIndex((answer) => {
      return answer.id === questionId;
    });

    const prevQuestion = failedAnswers[currentIndex - 1];
    if (prevQuestion) {
      setQuestionId(prevQuestion.id);
      callback();
    }
  };

  const onNext = (callback: () => void) => {
    const currentIndex = failedAnswers.findIndex((answer) => {
      return answer.id === questionId;
    });

    const nextQuestion = failedAnswers[currentIndex + 1];
    if (nextQuestion) {
      setQuestionId(nextQuestion.id);
      callback();
    }
  };

  const improvementAction = JSON.parse(
    localStorage.getItem("improvement-plan-answers") || "{}"
  )?.[questionId];

  return {
    failedAnswer,
    onNext,
    onPrev,
    improvementAction,
  };
};
