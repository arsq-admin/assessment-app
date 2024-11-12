import { getQuestionFromConfig } from "@/services/assessment";
import { useState } from "react";
import { AssessmentAnswers } from "../pages/assessmentPage/types/assessmentAnswers";
import { useSearchParams } from "react-router-dom";
import { AssessmentConfig, Question } from "@/api/assessment/types";

export const useAssessment = () => {
  const [searchParams] = useSearchParams();
  const idInParam = searchParams.get("id");

  const [assessmentConfig, setAssessmentConfig] =
    useState<null | AssessmentConfig>(null);

  const firstQuestion = assessmentConfig?.sections?.[0]?.questions?.[0];
  const [
    reachedImprovementPlanReviewPage,
    setReachedImprovementPlanReviewPage,
  ] = useState<boolean>(false);
  const [reachedReviewPage, setReachedReviewPage] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<string>(
    idInParam || firstQuestion?.id || ""
  );
  const [currentAnswers, setCurrentAnswers] = useState<AssessmentAnswers>({});
  const [journey, setJourney] = useState<string[]>([]);
  const [inPreviewMode, setInPreviewMode] = useState(false);

  const questionOrder: string[] = [];
  const questionsById: Record<string, Question> = {};

  console.log(assessmentConfig);
  assessmentConfig?.sections.forEach((section) => {
    section.questions.forEach((question) => {
      questionOrder.push(question.id);
      questionsById[question.id] = question;
    });
  });

  const { question, section } =
    assessmentConfig && questionId
      ? getQuestionFromConfig(assessmentConfig, questionId)
      : { question: null, section: "" };

  return {
    setQuestionId,
    questionId,
    currentAnswers,
    setCurrentAnswers,
    journey,
    setJourney,
    question,
    section,
    questionOrder,
    assessmentConfig,
    reachedReviewPage,
    setReachedReviewPage,
    inPreviewMode,
    setInPreviewMode,
    questionsById,
    reachedImprovementPlanReviewPage,
    setReachedImprovementPlanReviewPage,
    setAssessmentConfig,
  };
};
