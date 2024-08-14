export enum Op {
  EQUAL = "EQUAL",
  INCLUDES = "INCLUDES",
  NOT_INCLUDES = "NOT_INCLUDES",
}

export enum Status {
  DRAFT = "DRAFT",
  GLOBAL = "GLOBAL",
}

export enum QuestionType {
  TEXT = "TEXT",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  NUMBER = "NUMBER",
}

export interface Option {
  value: string;
  name: string;
  points: number;
  freeText?: boolean;
  freeTextLabel?: string;
  minimumRequired?: boolean;
}

export enum LogicAction {
  SKIP = "SKIP",
  END = "END",
  HIDE = "HIDE",
}

interface BaseCondition {
  questionId?: string;
  sectionName?: string;
}

interface EqualCondition extends BaseCondition {
  value: string | number;
  op: Op.EQUAL;
}

interface IncludesCondition extends BaseCondition {
  value: (string | number)[];
  op: Op.INCLUDES | Op.NOT_INCLUDES;
}

export type Condition = EqualCondition | IncludesCondition;

export enum TargetType {
  QUESTION = "QUESTION",
  SECTION = "SECTION",
  OUTCOME = "OUTCOME",
}

interface QuestionTarget {
  type: TargetType.QUESTION;
  value: string;
  section: string;
}

interface SectionTarget {
  type: TargetType.SECTION;
  value: string;
}

interface OutcomeTarget {
  target: TargetType.OUTCOME;
  value: string;
}

export type SkipTarget = QuestionTarget | SectionTarget;

interface BaseLogic {
  condition: Condition[];
  priority?: number;
}

export interface SkipLogic extends BaseLogic {
  action: LogicAction.SKIP;
  target: SkipTarget;
}

export interface EndLogic extends BaseLogic {
  action: LogicAction.END;
  target: OutcomeTarget;
}

export type Logic = SkipLogic | EndLogic;

export interface FollowUp {
  condition: Condition[];
  questions: Question[];
}

export interface BaseQuestion {
  subsection: string;
  id: string;
  title: string;
  guidance?: string;
  logic?: Logic[];
  followUp?: FollowUp[];
}

export interface FreeTextQuestion extends BaseQuestion {
  type: QuestionType.TEXT;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  allowMultiple?: boolean;
  options: Option[];
}

export interface NumberQuestion extends BaseQuestion {
  type: QuestionType.NUMBER;
}

export type Question =
  | FreeTextQuestion
  | MultipleChoiceQuestion
  | NumberQuestion;

export interface Outcomes {
  title: string;
  body: string;
}

export interface AssessmentConfig {
  id: string;
  name: string;
  status: Status;
  sections: {
    name: string;
    subsections: string[];
    questions: Question[];
  }[];
  outcomes: Record<string, Outcomes>;
}
