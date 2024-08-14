// import { useParams } from "react-router-dom";
import { getQuestionFromConfig, TEMP_assessmentConfigs } from "../services";
import { useState } from "react";
import { AssessmentAnswers } from "../types/assessmentAnswers";

export const useAssessment = () => {
  // const { name: assessmentName = "" } = useParams();
  const assessmentName = "saql";

  // Config will need to be fetched from db instead of local file
  const assessmentConfig = TEMP_assessmentConfigs[assessmentName];
  const firstQuestion = assessmentConfig?.sections?.[0]?.questions?.[0];

  const [questionId, setQuestionId] = useState<string>(firstQuestion.id || "");
  const [currentAnswers, setCurrentAnswers] = useState<AssessmentAnswers>({});
  const [journey, setJourney] = useState<string[]>([]);

  const questionOrder: string[] = [];
  assessmentConfig?.sections.forEach((section) => {
    section.questions.forEach((question) => {
      questionOrder.push(question.id);
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
  };
};