import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const useImprovementPlan = () => {
  const navigate = useNavigate();
  const { id, urlId } = useParams();

  const { questionId, failedAnswers } = useContext(AssessmentContext);

  const currentId = id || questionId;

  const failedAnswer = failedAnswers.find((answer) => {
    return answer?.questionId === currentId;
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
