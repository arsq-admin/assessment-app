import { createContext, Dispatch, SetStateAction } from "react";
import { AssessmentConfig, Question } from "@/api/assessment/types";
import { AssessmentAnswers } from "./pages/assessmentPage/types/assessmentAnswers";
import { User } from "./api/user/types";

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
  setAssessmentConfig: Dispatch<SetStateAction<AssessmentConfig | null>>;
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
  setAssessmentConfig: () => {},
});

interface UserContext {
  user: null | User;
  setUser: Dispatch<SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
});
