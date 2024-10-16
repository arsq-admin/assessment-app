import { createContext, Dispatch, SetStateAction } from "react";
import {
  AssessmentConfig,
  Question,
} from "./pages/assessmentPage/types/assessmentConfig";
import { AssessmentAnswers } from "./pages/assessmentPage/types/assessmentAnswers";

interface AssessmentContext {
  config: AssessmentConfig | null;
  questionId: string;
  questionOrder: string[];
  setQuestionId: Dispatch<SetStateAction<string>>;
  journey: string[];
  currentAnswers: AssessmentAnswers;
  setCurrentAnswers: Dispatch<SetStateAction<AssessmentAnswers>>;
  tenderName: string;
  reachedReviewPage: boolean;
  setReachedReviewPage: Dispatch<SetStateAction<boolean>>;
  reachedImprovementPlanReviewPage: boolean;
  setReachedImprovementPlanReviewPage: Dispatch<SetStateAction<boolean>>;
  questionsById: Record<string, Question>;
}

export const AssessmentContext = createContext<AssessmentContext>({
  config: null,
  questionId: "",
  questionOrder: [],
  setQuestionId: () => {},
  journey: [],
  currentAnswers: {},
  setCurrentAnswers: () => {},
  tenderName: "",
  reachedReviewPage: false,
  setReachedReviewPage: () => {},
  reachedImprovementPlanReviewPage: false,
  setReachedImprovementPlanReviewPage: () => {},
  questionsById: {},
});
