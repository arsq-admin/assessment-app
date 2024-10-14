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
