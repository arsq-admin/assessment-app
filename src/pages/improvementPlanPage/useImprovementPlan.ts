import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { QuestionAndAnswer } from "../reviewPage/useAnswers";

interface SavedFailedQuestions {
  questionIds: QuestionAndAnswer[];
}

export const useImprovementPlan = () => {
  const { config, questionId } = useContext(AssessmentContext);
  const failedAnswersJson = localStorage.getItem(
    `failed-questions-${config?.id}`
  );

  const { questionIds: failedAnswers } = JSON.parse(
    failedAnswersJson || ""
  ) as SavedFailedQuestions;

  const failedAnswer = failedAnswers.find((answer) => {
    return answer?.id === questionId;
  });

  return { failedAnswer };
};
