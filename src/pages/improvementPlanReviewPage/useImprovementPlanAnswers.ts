import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Section } from "@/api/assessment/types";
import { ImprovementPlanContext } from "../improvementPlanRoot/context";
import { useMutation } from "@tanstack/react-query";
import { submitImprovementPlan } from "@/api/assessment";

export const useImprovementPlanAnswers = () => {
  const { config, failedAnswers } = useContext(AssessmentContext);
  const { improvementPlan } = useContext(ImprovementPlanContext);

  const { mutate } = useMutation({
    mutationFn: submitImprovementPlan,
  });

  const sections: Section[] = [];
  config?.sections.forEach((section) => {
    const improvementPlanQuestions = section.questions.filter((question) => {
      return failedAnswers.find((answer) => {
        return answer.questionId === question.id;
      });
    });

    if (improvementPlanQuestions.length > 0) {
      sections.push({
        ...section,
        questions: improvementPlanQuestions,
      });
    }
  });

  const journey = failedAnswers.map((answer) => answer.questionId);

  return {
    sections,
    answers: improvementPlan,
    journey,
    submitImprovementPlan: mutate,
  };
};
