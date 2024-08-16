import {
  AssessmentConfig,
  Condition,
  MultipleChoiceQuestion,
  Op,
  Question,
  QuestionType,
} from "./types/assessmentConfig";
import rpa from "./assessments/rpa.json";
import accessibility from "./assessments/accessibility.json";
import saql from "./assessments/lowSaq.json";
import saqm from "./assessments/modSaq.json";
import saqh from "./assessments/highSaq.json";
import {
  AnswerValue,
  AssessmentAnswers,
  QuestionAnswer,
} from "./types/assessmentAnswers";

export const TEMP_assessmentConfigs = {
  rpa,
  accessibility,
  saql,
  saqm,
  saqh,
} as unknown as Record<string, AssessmentConfig>;

export const isConditionMet = (
  conditions: Condition[],
  answer: (string | number)[],
  allAnswers: AssessmentAnswers
) => {
  return conditions.every(({ op, value, questionId }) => {
    let isMet = false;
    let assertedValue = answer;

    if (questionId) {
      const answerFromQuestionId = allAnswers[questionId]?.answer?.map(
        ({ value }) => value
      );

      if (!answerFromQuestionId) return false;

      assertedValue = answerFromQuestionId;
    }

    switch (op) {
      // Equal should only be used for single value, eg not checkbox answers
      case Op.EQUAL:
        isMet = assertedValue.length === 1 && value === assertedValue[0];
        break;

      case Op.INCLUDES: {
        isMet = assertedValue.some((val) => value.includes(val));
        break;
      }

      case Op.NOT_INCLUDES: {
        isMet = assertedValue.every((val) => !value.includes(val));
        break;
      }

      default:
        // Should log error of unmatching value (eg sentry or datadog)
        isMet = false;
    }

    return isMet;
  });
};

export const isMultipleChoiceQuestion = (
  question: Question
): question is MultipleChoiceQuestion =>
  question.type === QuestionType.MULTIPLE_CHOICE;

export const storeAnswer = (
  assessmentId: string,
  questionId: string,
  answer: QuestionAnswer
) => {
  const storedAnswers =
    localStorage.getItem(`assessment-${assessmentId}`) || "{}";

  localStorage.setItem(
    `assessment-${assessmentId}`,
    JSON.stringify({
      ...JSON.parse(storedAnswers),
      [questionId]: answer,
    })
  );
};

export const formatAnswer = (
  answer: (string | number)[],
  freeTextAnswers: Record<string, string> = {}
): AnswerValue[] => {
  return answer.map((value) => {
    return { value, freeText: freeTextAnswers[value] || undefined };
  });
};

export const getQuestionFromConfig = (
  config: AssessmentConfig,
  questionId: string
): {
  question: Question | null;
  section: string;
} => {
  if (!questionId) {
    return {
      question: null,
      section: "",
    };
  }

  for (let i = 0; i <= config.sections.length - 1; i++) {
    const { questions } = config.sections[i];
    for (let j = 0; j <= questions.length - 1; j++) {
      if (questions[j].id === questionId) {
        return { question: questions[j], section: config.sections[i].name };
      }
    }
  }

  return {
    question: null,
    section: "",
  };
};
