export enum AssessmentType {
  BUYER = "BUYER",
  SUPPLIER = "SUPPLIER",
}

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

export enum IntroSectionType {
  TEXT = "TEXT",
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
}

export interface Option {
  value: string | number;
  name: string;
  points?: number;
  freeText?: boolean;
  freeTextLabel?: string;
  minimumRequired?: boolean;
  isAcceptable?: boolean;
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

export enum OutcomeType {
  SUCCESSFUL = "SUCCESSFUL",
  UNSUCCESSFUL = "UNSUCCESSFUL",
}

interface OutcomeContent {
  heading: string;
  body: string;
}

export interface Outcome {
  id: string;
  name: string;
  type: OutcomeType;
  title: string;
  content: OutcomeContent[];
}

export interface Section {
  name: string;
  subsections: string[];
  questions: Question[];
}

export interface IntroTextSection {
  type: IntroSectionType;
  heading: string;
  content: string[] | string[][];
}

export interface AssessmentConfig {
  id: string;
  name: string;
  status: Status;
  sections: Section[];
  outcomes: Outcome[];
  introduction: IntroTextSection[];
  assessmentType: AssessmentType;
  isTemplate?: boolean;
}

export interface AnswerValue {
  value: string | number;
  freeText?: string;
}

export interface AssessmentAnswer {
  lastUpdated: string;
  createdDate: string;
  attempt: number;
  title: string;
  answer: AnswerValue[];
  followUp?: Record<string, AnswerValue[]>;
  organisationId: string;
  assessmentId: string;
  questionId: string;
}

export interface ImprovementAction {
  assessmentId: string;
  questionId: string;
  answer: string;
  authorId: string;
  lastUpdated: string;
  createdDate: string;
}
