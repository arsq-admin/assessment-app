import { AssessmentContext } from "@/context";
import { useContext } from "react";

export const useAssessmentResult = () => {
  const { currentAnswers } = useContext(AssessmentContext);
  console.log("answers", currentAnswers);
  return {};
};
