import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { QuestionAndAnswer } from "../reviewPage/useAnswers";
import { useNavigate, useParams } from "react-router-dom";

interface SavedFailedQuestions {
  questionIds: QuestionAndAnswer[];
}

export const useImprovementPlan = () => {
  const navigate = useNavigate();
  const { id, urlId } = useParams();

  const { config, questionId } = useContext(AssessmentContext);
  const failedAnswersJson = localStorage.getItem(
    `failed-questions-${config?.id}`
  );

  const currentId = id || questionId;

  const { questionIds: failedAnswers } = JSON.parse(
    failedAnswersJson || ""
  ) as SavedFailedQuestions;

  const failedAnswer = failedAnswers.find((answer) => {
    return answer?.id === currentId;
  });

  const onPrev = (callback: () => void) => {
    navigate({
      pathname: `/${urlId}/improvement-plan/summary`,
    });
    callback();
  };

  const onNext = (callback: () => void) => {
    navigate({
      pathname: `/${urlId}/improvement-plan/summary`,
    });
    callback();
  };

  const improvementAction = JSON.parse(
    localStorage.getItem("improvement-plan-answers") || "{}"
  )?.[currentId];

  return {
    failedAnswer,
    onNext,
    onPrev,
    improvementAction,
    currentQuestionId: currentId,
  };
};
