import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { AnswerValue } from "../assessmentPage/types/assessmentAnswers";
import {
  getFirstUnansweredQuestion,
  getQuestionJourneyFromAnswers,
  isAssessmentComplete,
} from "@/services/assessment";
import { QuestionType } from "../assessmentPage/types/assessmentConfig";
import { useNavigate } from "react-router-dom";

export interface FormattedAnswer extends AnswerValue {
  label: string;
}

export type FormattedAnswers = Record<
  string,
  { id: string; question: string; answers: FormattedAnswer[] }[]
>;

export const useAnswers = () => {
  const navigate = useNavigate();
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
    // Probably should go to an error page
    if (!config) return;

    const answers = Object.values(formattedAnswers).flat();

    let hasPassed = true;
    const failedQuestionIds = new Set();

    answers.forEach((answer) => {
      const { id, answers: questionAnswer } = answer;
      const questionConfig = questionsById[id];

      if (questionConfig.type === QuestionType.MULTIPLE_CHOICE) {
        questionAnswer.forEach(({ value }) => {
          const optionConfig = questionConfig.options.find(
            (option) => value === option.value
          );

          if (optionConfig && !optionConfig.isAcceptable) {
            hasPassed = false;
            failedQuestionIds.add(id);
          }
        });
      }
    });

    return navigate(
      `/result?outcome=${
        hasPassed
          ? "successful"
          : `unsuccessful&fail-count=${failedQuestionIds.size}`
      }`
    );
  };

  return {
    answers: formattedAnswers,
    journey: questionIds,
    skippedQuestionId,
    isComplete,
    resolveAssessment,
  };
};
