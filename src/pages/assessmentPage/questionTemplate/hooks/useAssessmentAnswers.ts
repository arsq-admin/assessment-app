import { useContext, useEffect, useState } from "react";
import {
  AnswerValue,
  AssessmentAnswers,
  QuestionAnswer,
} from "../../types/assessmentAnswers";
import { isConditionMet } from "../../services";
import { Question } from "../../types/assessmentConfig";
import { AssessmentContext, UserContext } from "@/context";
import { useMutation } from "@tanstack/react-query";
import { saveQuestionAnswer } from "@/api/assessment";
import { useParams } from "react-router-dom";
import { QuestionType } from "@/api/assessment/types";

interface Props {
  question: Question;
}

export const useAssessmentAnswers = ({ question }: Props) => {
  const { urlId } = useParams();
  const { organisations } = useContext(UserContext);

  const { mutate } = useMutation({
    mutationFn: saveQuestionAnswer,
  });
  const { setCurrentAnswers, currentAnswers } = useContext(AssessmentContext);
  const assessmentId = urlId;

  const { id: questionId, followUp: followUpConfig, title } = question;

  const [answer, setAnswer] = useState<(string | number)[]>([]);
  const [freeText, setFreeText] = useState<Record<string, string>>({});

  const [followUpValue, setFollowUpValue] = useState<
    Record<string, (string | number)[]>
  >({});
  const [followUpFreeText, setFollowUpFreeText] = useState<
    Record<string, Record<string, string>>
  >({});

  useEffect(() => {
    const storedAnswers: AssessmentAnswers = JSON.parse(
      localStorage.getItem(`assessment-${assessmentId}`) || "{}"
    );
    const { answer: defaultAnswer = [], followUp: defaultFollowUp = {} } =
      currentAnswers[questionId] || storedAnswers[questionId] || {};

    const formattedAnswer: {
      answer: (string | number)[];
      freeText: Record<string, string>;
    } = {
      answer: [],
      freeText: {},
    };
    defaultAnswer.forEach(({ value, freeText }) => {
      formattedAnswer.answer.push(value);
      if (freeText) {
        formattedAnswer.freeText[value] = freeText;
      }
    });
    setAnswer(formattedAnswer.answer);
    setFreeText(formattedAnswer.freeText);

    const formattedFollowUp: {
      answer: Record<string, (string | number)[]>;
      freeText: Record<string, Record<string, string>>;
    } = {
      answer: {},
      freeText: {},
    };

    Object.entries(defaultFollowUp).forEach(([questionId, value = []]) => {
      formattedFollowUp.answer[questionId] = [];
      value.forEach(({ value, freeText }) => {
        formattedFollowUp.answer[questionId].push(value);
        if (freeText) {
          if (!formattedFollowUp.freeText?.[questionId]) {
            formattedFollowUp.freeText[questionId] = {};
          }

          formattedFollowUp.freeText[questionId][value] = freeText;
        }
      });
    });
    setFollowUpValue(formattedFollowUp.answer);
    setFollowUpFreeText(formattedFollowUp.freeText);
  }, [assessmentId, questionId, currentAnswers]);

  const saveAnswer = (saveToCurrentAnswers: boolean = true) => {
    const formattedAnswers = answer.map((value) => {
      const originalOption =
        question.type === QuestionType.MULTIPLE_CHOICE
          ? question.options.find((option) => option.value === value)
          : undefined;

      const formatted: AnswerValue = {
        value: originalOption?.value || value,
        name:
          originalOption?.name ||
          `Error: unable to find name of ${value} from question id: ${questionId}`,
      };
      if (freeText[value]) {
        formatted.freeText = freeText[value];
      }
      return formatted;
    });

    const response: QuestionAnswer = {
      answer: formattedAnswers,
      followUp: {},
    };

    const formattedFollowUp: Record<string, AnswerValue[]> = {};
    Object.entries(followUpValue).forEach(([questionId, values]) => {
      const formattedValues = values.map((value) => {
        const formatted: AnswerValue = { value };
        if (followUpFreeText?.[questionId]?.[value]) {
          formatted.freeText = followUpFreeText?.[questionId]?.[value];
        }
        return formatted;
      });
      formattedFollowUp[questionId] = formattedValues;
    });

    followUpConfig?.forEach((followUpConfig) => {
      if (isConditionMet(followUpConfig.condition, answer, currentAnswers)) {
        followUpConfig.questions.forEach((que) => {
          if (!response?.followUp) {
            response.followUp = {};
          }

          response.followUp[que.id] = formattedFollowUp[que.id];
        });
      }
    });

    if (response.followUp && Object.keys(response.followUp).length === 0) {
      delete response.followUp;
    }

    if (response.answer.length > 0) {
      if (organisations[0]?.id) {
        mutate({
          organisationId: organisations[0].id,
          assessmentId: urlId || "",
          questionId,
          answer: response.answer,
          title,
        });
      }

      if (saveToCurrentAnswers) {
        setCurrentAnswers((prevState) => {
          return { ...prevState, [questionId]: response };
        });
      }
    }
  };

  return {
    answer,
    setAnswer,
    freeText,
    setFreeText,
    followUpValue,
    setFollowUpValue,
    followUpFreeText,
    setFollowUpFreeText,
    saveAnswer,
  };
};
