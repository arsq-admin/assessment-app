import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Section } from "../assessmentPage/types/assessmentConfig";
import { useParams } from "react-router-dom";

export const useImprovementPlanAnswers = () => {
  const { urlId } = useParams();
  const { config } = useContext(AssessmentContext);

  const failedAnswers = JSON.parse(
    localStorage.getItem(`failed-questions-${urlId}`) || "{}"
  ) as { questionIds: { id: string }[] };

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

  const journey = failedAnswers.questionIds.map((question) => question.id);

  return {
    sections,
    answers: improvementPlanAnswers,
    journey,
  };
};
