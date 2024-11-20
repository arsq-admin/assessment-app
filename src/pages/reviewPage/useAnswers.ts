import { AssessmentContext, TenderPackageContext } from "@/context";
import { useContext } from "react";
import { AnswerValue } from "../assessmentPage/types/assessmentAnswers";
import {
  getFirstUnansweredQuestion,
  getQuestionJourneyFromAnswers,
  isAssessmentComplete,
} from "@/services/assessment";
import { QuestionType } from "../assessmentPage/types/assessmentConfig";
import { useNavigate, useParams } from "react-router-dom";
import { AssessmentType, OutcomeType } from "@/api/assessment/types";
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
  const { mutate, data } = useMutation({
    mutationFn: submitAssessment,
  });

  const { tenderPackage } = useContext(TenderPackageContext);
  const navigate = useNavigate();
  const { urlId } = useParams();
  const { currentAnswers, config, questionsById, setQuestionId } =
    useContext(AssessmentContext);

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
        currentAnswers[questionId]?.answer.map((answer) => {
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

    if (config.assessmentType === AssessmentType.BUYER) {
      if (!urlId || !tenderPackage?.organisationId)
        throw new Error("Missing org id or url id");

      await mutate({
        urlId,
        organisationId: tenderPackage.organisationId,
      });
    } else {
      const answers = Object.values(formattedAnswers).flat();

      let hasPassed = true;

      const failedAnswers: Record<string, QuestionAndAnswer> = {};

      answers.forEach((answer) => {
        const { id, answers: questionAnswer } = answer;
        const questionConfig = questionsById[id];

        if (questionConfig.type === QuestionType.MULTIPLE_CHOICE) {
          questionAnswer.forEach(({ value }) => {
            const optionConfig = questionConfig.options.find(
              (option) => value === option.value
            );

            if (optionConfig && !optionConfig.isAcceptable) {
              hasPassed = false;
              failedAnswers[id] = answer;
            }
          });
        }
      });

      setQuestionId(Object.values(failedAnswers)[0].id);

      localStorage.setItem(
        `failed-questions-${config.id}`,
        JSON.stringify({ questionIds: Object.values(failedAnswers) })
      );

      const outcomeType = hasPassed
        ? OutcomeType.SUCCESSFUL
        : OutcomeType.UNSUCCESSFUL;

      const finalOutcome = config.outcomes.find(
        (outcome) => outcome.type === outcomeType
      );

      if (!finalOutcome)
        throw new Error("Unable to find outcome. Please check your config.");

      return navigate(
        `/${urlId}/result?outcome=${finalOutcome.id}${
          hasPassed ? `&fail-count=${Object.keys(failedAnswers).length}` : ""
        }`
      );
    }
  };

  return {
    answers: formattedAnswers,
    journey: questionIds,
    skippedQuestionId,
    isComplete,
    resolveAssessment,
    submitResponse: data,
  };
};
