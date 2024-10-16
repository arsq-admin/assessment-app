// import { useParams } from "react-router-dom";
import { TEMP_assessmentConfigs } from "../services";
import { getQuestionFromConfig } from "@/services/assessment";
import { useState } from "react";
import { AssessmentAnswers } from "../types/assessmentAnswers";
import { useSearchParams } from "react-router-dom";
import { Question } from "../types/assessmentConfig";

export const useAssessment = () => {
  // const { name: assessmentName = "" } = useParams();
  const assessmentName = "saql";

  const [searchParams] = useSearchParams();

  const idInParam = searchParams.get("id");

  // Config will need to be fetched from db instead of local file
  const assessmentConfig = TEMP_assessmentConfigs[assessmentName];
  const firstQuestion = assessmentConfig?.sections?.[0]?.questions?.[0];

  const [reachedReviewPage, setReachedReviewPage] = useState<boolean>(false);
  const [questionId, setQuestionId] = useState<string>(
    idInParam || firstQuestion.id || ""
  );
  const [currentAnswers, setCurrentAnswers] = useState<AssessmentAnswers>({});
  const [journey, setJourney] = useState<string[]>([]);
  const [inPreviewMode, setInPreviewMode] = useState(false);

  const questionOrder: string[] = [];
  const questionsById: Record<string, Question> = {};
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
  };
};
