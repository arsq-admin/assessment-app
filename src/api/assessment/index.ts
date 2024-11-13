import { QueryFunctionContext } from "@tanstack/react-query";
import { ASSESSMENT_SERVICE_URL } from "../index";
import { QuestionAnswer } from "@/pages/assessmentPage/types/assessmentAnswers";

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
  answer: QuestionAnswer;
  title: string;
}

export const saveQuestionAnswer = async ({
  assessmentId,
  questionId,
  answer,
  title,
}: SaveQuestionAnswer) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", "");

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
