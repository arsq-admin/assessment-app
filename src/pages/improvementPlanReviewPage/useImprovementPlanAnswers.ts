import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Section } from "../assessmentPage/types/assessmentConfig";

export const useImprovementPlanAnswers = () => {
  const { config } = useContext(AssessmentContext);

  const failedAnswers = JSON.parse(
    localStorage.getItem(`failed-questions-${config?.id}`) || "{}"
  );

  const improvementPlanAnswers = JSON.parse(
    localStorage.getItem("improvement-plan-answers") || "{}"
  );

  const sections: Section[] = [];
  config?.sections.forEach((section) => {
    const improvementPlanQuestions = section.questions.filter((question) => {
      return failedAnswers?.questionIds.find((answer) => {
        return answer.id === question.id;
      });
    });

    if (improvementPlanQuestions.length > 0) {
      sections.push({
        ...section,
        questions: improvementPlanQuestions,
      });
    }
  });

  return {
    sections,
    answers: improvementPlanAnswers,
  };
};
