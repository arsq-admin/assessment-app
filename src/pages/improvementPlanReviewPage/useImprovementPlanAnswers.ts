import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Section } from "../assessmentPage/types/assessmentConfig";

export const useImprovementPlanAnswers = () => {
  const { config } = useContext(AssessmentContext);

  const improvementPlanAnswers = JSON.parse(
    localStorage.getItem("improvement-plan-answers") || "{}"
  );

  const sections: Section[] = [];
  config?.sections.forEach((section) => {
    const improvementPlanQuestions = section.questions.filter((question) => {
      return question.id in improvementPlanAnswers;
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
