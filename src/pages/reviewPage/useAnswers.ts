import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Question, Section } from "../assessmentPage/types/assessmentConfig";
import { AnswerValue } from "../assessmentPage/types/assessmentAnswers";

export interface FormattedAnswer extends AnswerValue {
  label: string;
}

export const useAnswers = () => {
  const { currentAnswers, config } = useContext(AssessmentContext);
  console.log(currentAnswers);
  const formattedAnswers: Record<
    string,
    { question: string; answers: FormattedAnswer[] }[]
  > = {};

  Object.keys(currentAnswers).forEach((questionId) => {
    let currentQuestion: Question | null = null;
    let currentSection: Section | null = null;

    config?.sections.find((section) => {
      const question = section.questions.find(
        (question) => question.id === questionId
      );

      if (question) {
        currentQuestion = question;
        currentSection = section;
        return true;
      }

      return false;
    });

    if (!currentQuestion || !currentSection) {
      return;
    }

    if (!formattedAnswers[currentSection.name]) {
      formattedAnswers[currentSection.name] = [];
    }
    console.log(currentQuestion, currentAnswers[questionId].answer);
    formattedAnswers[currentSection.name].push({
      question: currentQuestion.title,
      answers: currentAnswers[questionId].answer.map((answer) => {
        console.log(answer);
        return {
          ...answer,
          label: currentQuestion.options.find(
            (option) => option.value === answer.value
          ).name,
        };
      }),
    });
  });

  return { answers: formattedAnswers };
};
