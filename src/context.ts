import { createContext, Dispatch, SetStateAction } from "react";
import {
  AssessmentAnswer,
  AssessmentConfig,
  Question,
} from "@/api/assessment/types";
import { Organisation, User } from "./api/user/types";
import { PublicTenderPackage } from "./api/tenderPackage/type";

interface AssessmentContext {
  config: AssessmentConfig | null;
  questionId: string;
  questionOrder: string[];
  setQuestionId: Dispatch<SetStateAction<string>>;
  journey: string[];
  currentAnswers: Record<string, Partial<AssessmentAnswer>>;
  setCurrentAnswers: Dispatch<
    SetStateAction<Record<string, Partial<AssessmentAnswer>>>
  >;
  tenderName: string;
  reachedReviewPage: boolean;
  setReachedReviewPage: Dispatch<SetStateAction<boolean>>;
  reachedImprovementPlanReviewPage: boolean;
  setReachedImprovementPlanReviewPage: Dispatch<SetStateAction<boolean>>;
  questionsById: Record<string, Question>;
  setAssessmentConfig: Dispatch<SetStateAction<AssessmentConfig | null>>;
  failedAnswers: AssessmentAnswer[];
  setFailedAnswers: Dispatch<SetStateAction<AssessmentAnswer[]>>;
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
  failedAnswers: [],
  setFailedAnswers: () => {},
});

interface UserContext {
  user: null | User;
  setUser: Dispatch<SetStateAction<User | null>>;
  organisations: Organisation[];
  setOrganisations: Dispatch<SetStateAction<Organisation[]>>;
}

export const UserContext = createContext<UserContext>({
  user: null,
  setUser: () => {},
  organisations: [],
  setOrganisations: () => {},
});

interface TenderPackageContext {
  tenderPackage: null | PublicTenderPackage;
  setTenderPackage: Dispatch<SetStateAction<PublicTenderPackage | null>>;
}

export const TenderPackageContext = createContext<TenderPackageContext>({
  tenderPackage: null,
  setTenderPackage: () => {},
});
