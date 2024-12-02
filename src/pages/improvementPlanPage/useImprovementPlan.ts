import { saveImprovementAction } from "@/api/assessment";
import { AssessmentContext } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ImprovementPlanContext } from "../improvementPlanRoot/context";

export const useImprovementPlan = () => {
  const { setImprovementPlan } = useContext(ImprovementPlanContext);
  const { mutate } = useMutation({
    mutationFn: saveImprovementAction,
    onSuccess: ({ data }) => {
      setImprovementPlan((prevState) => ({
        ...prevState,
        [data[0].questionId]: data[0],
      }));
    },
  });

  const navigate = useNavigate();
  const { id, urlId } = useParams();

  const { questionId, failedAnswers } = useContext(AssessmentContext);

  const currentId = id || questionId;

  const failedAnswer = failedAnswers.find((answer) => {
    return answer?.questionId === currentId;
  });

  const onPrev = (callback?: () => void) => {
    navigate({
      pathname: `/${urlId}/improvement-plan/summary`,
    });
    callback?.();
  };

  const onNext = (callback?: () => void) => {
    navigate({
      pathname: `/${urlId}/improvement-plan/summary`,
    });
    callback?.();
  };

  return {
    failedAnswer,
    onNext,
    onPrev,
    currentQuestionId: currentId,
    saveImprovementAction: mutate,
  };
};
