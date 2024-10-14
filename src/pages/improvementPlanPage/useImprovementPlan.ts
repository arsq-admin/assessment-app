import { AssessmentContext } from "@/context";
import { useContext } from "react";

export const useImprovementPlan = () => {
  const { config } = useContext(AssessmentContext);
  const failedAnswersJson = localStorage.getItem(
    `failed-questions-${config?.id}`
  );

  const failedAnswers = JSON.parse(failedAnswersJson || "");

  console.log(failedAnswers);
  return {};
};
