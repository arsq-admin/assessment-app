import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { AnswerValue } from "../assessmentPage/types/assessmentAnswers";

export interface FormattedAnswer extends AnswerValue {
  label: string;
}

export type FormattedAnswers = Record<
  string,
  { id: string; question: string; answers: FormattedAnswer[] }[]
>;

export const useAnswers = () => {
  const { currentAnswers, config } = useContext(AssessmentContext);
  const formattedAnswers: FormattedAnswers = {};

  Object.keys(currentAnswers).forEach((questionId) => {
    const currentSection = config?.sections.find((section) => {
      return section.questions.find((question) => question.id === questionId);
    });

    const currentQuestion = currentSection?.questions.find((question) => {
      return question.id === questionId;
    });

    if (!currentQuestion || !currentSection) {
      return;
    }

    if (!formattedAnswers[currentSection.name]) {
      formattedAnswers[currentSection.name] = [];
    }

    formattedAnswers[currentSection.name].push({
      question: currentQuestion.title,
      id: questionId,
      answers: currentAnswers[questionId].answer.map((answer) => {
        const label =
          "options" in currentQuestion &&
          currentQuestion.options.find(
            (option) => option.value === answer.value
          )?.name;

        return {
          ...answer,
          label: label || "",
        };
      }),
    });
  });

  return { answers: formattedAnswers };
};
