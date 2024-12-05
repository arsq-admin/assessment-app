import { QueryFunctionContext } from "@tanstack/react-query";
import { ASSESSMENT_SERVICE_URL } from "../index";
import { AnswerValue } from "@/pages/assessmentPage/types/assessmentAnswers";
import { AssessmentAnswer, ImprovementAction } from "./types";

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

interface SaveImprovementAction {
  assessmentId: string;
  questionId: string;
  answer: string;
  organisationId: string;
}

export const saveImprovementAction = async ({
  assessmentId,
  questionId,
  answer,
  organisationId,
}: SaveImprovementAction) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", organisationId);

  const res = await fetch(`${ASSESSMENT_SERVICE_URL}/improvement-action`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      assessmentId,
      questionId,
      answer,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error when saving your improvement action.`);
  }

  return await res.json();
};

type GetMyImprovementActionsQueryKey = [string, string];

export const getMyImprovementActions = async ({
  queryKey,
}: QueryFunctionContext<GetMyImprovementActionsQueryKey>): Promise<{
  data: ImprovementAction[];
}> => {
  const [assessmentId, organisationId] = queryKey;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", organisationId);

  const res = await fetch(
    `${ASSESSMENT_SERVICE_URL}/improvement-action/${assessmentId}`,
    {
      method: "GET",
      headers,
      credentials: "include",
    }
  );

  if (!res.ok) {
    throw new Error(`Error when getting your improvement actions.`);
  }

  return await res.json();
};

type GetMyAssessmentAnswersQueryKey = [string, string];

export const getMyAssessmentAnswers = async ({
  queryKey,
}: QueryFunctionContext<GetMyAssessmentAnswersQueryKey>): Promise<{
  data: AssessmentAnswer[];
}> => {
  const [assessmentId, organisationId] = queryKey;

  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", organisationId);

  const res = await fetch(`${ASSESSMENT_SERVICE_URL}/answer/${assessmentId}`, {
    method: "GET",
    headers,
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error when getting your improvement actions.`);
  }

  return await res.json();
};

interface SubmitImprovementPlan {
  organisationId: string;
  urlId: string;
}

export const submitImprovementPlan = async ({
  organisationId,
  urlId,
}: SubmitImprovementPlan) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Organisation-Id", organisationId);

  const res = await fetch(`${ASSESSMENT_SERVICE_URL}/submit/improvement-plan`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      urlId,
    }),
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(`Error when submitting your improvement plan.`);
  }

  return await res.json();
};
