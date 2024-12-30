import { AssessmentContext, UserContext } from "@/context";
import { useContext } from "react";
import { AnswerValue } from "../assessmentPage/types/assessmentAnswers";
import {
  getFirstUnansweredQuestion,
  getQuestionJourneyFromAnswers,
  isAssessmentComplete,
} from "@/services/assessment";
import { useNavigate, useParams } from "react-router-dom";
import { submitAssessment } from "@/api/assessment";
import { useMutation } from "@tanstack/react-query";

export interface FormattedAnswer extends AnswerValue {
  label: string;
}

export interface QuestionAndAnswer {
  id: string;
  question: string;
  answers: FormattedAnswer[];
}

export type FormattedAnswers = Record<string, QuestionAndAnswer[]>;

export const useAnswers = () => {
  const { setFailedAnswers } = useContext(AssessmentContext);
  const { organisations } = useContext(UserContext);

  const { mutate } = useMutation({
    mutationFn: submitAssessment,
    onSuccess: (data) => {
      const outcomeName = data.outcome?.id || "error";
      setFailedAnswers(data.failedAnswers);
      navigate(`/${urlId}/result?outcome=${outcomeName}`);
    },
  });

  const navigate = useNavigate();
  const { urlId } = useParams();
  const { currentAnswers, config } = useContext(AssessmentContext);

  const questionIds =
    (config && getQuestionJourneyFromAnswers(config, currentAnswers)) || [];

  const formattedAnswers: FormattedAnswers = {};

  questionIds.forEach((questionId) => {
    const currentSection = config?.sections.find((section) => {
      return section.questions.find((question) => question.id === questionId);
    });

    const currentQuestion = currentSection?.questions.find((question) => {
      return question.id === questionId;
    });

    if (!currentQuestion || !currentSection) {
      return;
    }

    if (!formattedAnswers[currentSection.name]) {
      formattedAnswers[currentSection.name] = [];
    }

    formattedAnswers[currentSection.name].push({
      question: currentQuestion.title,
      id: questionId,
      answers:
        currentAnswers[questionId]?.answer?.map((answer) => {
          const label =
            "options" in currentQuestion &&
            currentQuestion.options.find(
              (option) => option.value === answer.value
            )?.name;

          return {
            ...answer,
            label: label || "",
          };
        }) || [],
    });
  });

  const skippedQuestionId = getFirstUnansweredQuestion(
    questionIds,
    currentAnswers
  );

  const isComplete = isAssessmentComplete(questionIds, currentAnswers);

  const resolveAssessment = async () => {
    // Probably should go to an error page
    if (!config) return;

    if (config.isTemplate) return;

    if (!urlId || !organisations[0]?.id)
      throw new Error("Missing org id or url id");

    await mutate({
      urlId,
      organisationId: organisations[0]?.id,
    });
  };

  return {
    answers: formattedAnswers,
    journey: questionIds,
    skippedQuestionId,
    isComplete,
    resolveAssessment,
  };
};
