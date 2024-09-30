import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { AnswerValue } from "../assessmentPage/types/assessmentAnswers";
import {
  getFirstUnansweredQuestion,
  getQuestionJourneyFromAnswers,
  isAssessmentComplete,
} from "@/services/assessment";
import { QuestionType } from "../assessmentPage/types/assessmentConfig";

export interface FormattedAnswer extends AnswerValue {
  label: string;
}

export type FormattedAnswers = Record<
  string,
  { id: string; question: string; answers: FormattedAnswer[] }[]
>;

export const useAnswers = () => {
  const { currentAnswers, config, questionsById } =
    useContext(AssessmentContext);

  const questionIds =
    (config && getQuestionJourneyFromAnswers(config, currentAnswers)) || [];

  const formattedAnswers: FormattedAnswers = {};

  questionIds.forEach((questionId) => {
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
      answers:
        currentAnswers[questionId]?.answer.map((answer) => {
          const label =
            "options" in currentQuestion &&
            currentQuestion.options.find(
              (option) => option.value === answer.value
            )?.name;

          return {
            ...answer,
            label: label || "",
          };
        }) || [],
    });
  });

  const skippedQuestionId = getFirstUnansweredQuestion(
    questionIds,
    currentAnswers
  );

  const isComplete = isAssessmentComplete(questionIds, currentAnswers);

  const resolveAssessment = () => {
    console.group("resolve answers");
    const answers = Object.values(formattedAnswers).flat();
    console.log("config", questionsById);
    console.log("answers", answers);

    let finalScore = 0;

    answers.forEach((answer) => {
      const { id, answers: questionAnswer } = answer;
      const questionConfig = questionsById[id];
      let questionScore = 0;

      if (questionConfig.type === QuestionType.MULTIPLE_CHOICE) {
        questionAnswer.forEach(({ value }) => {
          const optionConfig = questionConfig.options.find(
            (option) => value === option.value
          );

          if (optionConfig) {
            questionScore += optionConfig.points;
          }
        });
      }

      finalScore += questionScore;
    });

    console.log("finalScore:: ", finalScore);
    console.groupEnd();
  };

  return {
    answers: formattedAnswers,
    journey: questionIds,
    skippedQuestionId,
    isComplete,
    resolveAssessment,
  };
};
