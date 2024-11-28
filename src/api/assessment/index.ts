import { QueryFunctionContext } from "@tanstack/react-query";
import { ASSESSMENT_SERVICE_URL } from "../index";
import { AnswerValue } from "@/pages/assessmentPage/types/assessmentAnswers";

export const publicGetAssessmentById = async ({
  queryKey,
}: QueryFunctionContext) => {
  const [urlId] = queryKey;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const res = await fetch(`${ASSESSMENT_SERVICE_URL}/public/${urlId}`, {
    method: "GET",
    headers,
  });

  return await res.json();
};

interface SaveQuestionAnswer {
  assessmentId: string;
  questionId: string;
  answer: AnswerValue[];
  title: string;
  organisationId: string;
}

export const saveQuestionAnswer = async ({
  organisationId,
  assessmentId,
  questionId,
  answer,
  title,
}: SaveQuestionAnswer) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", organisationId);

  const res = await fetch(`${ASSESSMENT_SERVICE_URL}/answer`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      assessmentId,
      questionId,
      answer,
      title,
    }),
    credentials: "include",
  });

  return await res.json();
};

interface SubmitAssessment {
  organisationId: string;
  urlId: string;
}

export const submitAssessment = async ({
  organisationId,
  urlId,
}: SubmitAssessment) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", organisationId);

  const res = await fetch(`${ASSESSMENT_SERVICE_URL}/submit`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      urlId,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error when submitting your answers.`);
  }

  return await res.json();
};
