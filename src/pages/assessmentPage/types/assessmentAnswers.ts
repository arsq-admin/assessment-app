export interface AnswerValue {
  value: string | number;
  freeText?: string;
}

export interface QuestionAnswer {
  answer: AnswerValue[];
  followUp?: Record<string, AnswerValue[]>;
}

export type AssessmentAnswers = Record<string, QuestionAnswer>;
