export interface AnswerValue {
  value: string | number;
  name?: string;
  freeText?: string;
}

export interface QuestionAnswer {
  answer: AnswerValue[];
  followUp?: Record<string, AnswerValue[]>;
}

export type AssessmentAnswers = Record<string, QuestionAnswer>;
