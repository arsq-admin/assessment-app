import { useNavigate } from "react-router-dom";
import {
  LogicAction,
  Question,
  TargetType,
} from "../../types/assessmentConfig";
import { useContext } from "react";
import { isConditionMet } from "../../services";
import { AssessmentAnswers } from "../../types/assessmentAnswers";
import { AssessmentContext } from "../../../../context";
import { getQuestionJourneyFromAnswers } from "@/services/assessment";

interface Props {
  saveAnswer: (saveToCurrentAnswers?: boolean) => void;
  question: Question;
  answer: (string | number)[];
  currentAnswers: AssessmentAnswers;
}

export const useAssessmentNavigation = ({
  saveAnswer,
  question,
  answer,
  currentAnswers,
}: Props) => {
  const { logic } = question;
  const navigate = useNavigate();
  const {
    config,
    setQuestionId,
    questionId,
    questionOrder,
    setReachedReviewPage,
  } = useContext(AssessmentContext);

  const onNext = () => {
    saveAnswer();

    const onLastQuestion =
      questionId === questionOrder[questionOrder.length - 1];

    if (onLastQuestion) {
      setReachedReviewPage(true);
      navigate("/review");
      return;
    }

    const currentQuestionIndex = questionOrder.findIndex(
      (id) => id === questionId
    );
    let nextQuestionId = questionOrder[currentQuestionIndex + 1];
    let pathName = "/";
    let searchParams = `id=${nextQuestionId}`;

    if (logic) {
      const firstLogicMatchedIndex = logic.findIndex(({ condition }) =>
        isConditionMet(condition, answer, currentAnswers)
      );

      if (firstLogicMatchedIndex !== -1) {
        const { target, action } = logic[firstLogicMatchedIndex];

        if (action === LogicAction.END) {
          pathName = "/outcome";
          searchParams = `name=${target.value}`;
        }

        if (action === LogicAction.SKIP) {
          if (target.type === TargetType.QUESTION) {
            nextQuestionId = target.value;
            searchParams = `id=${target.value}`;
          }
        }
      }
    }

    setQuestionId(nextQuestionId || questionId);
    navigate({
      pathname: pathName,
      search: searchParams,
    });
  };

  const onPrev = () => {
    saveAnswer();

    const order = config
      ? getQuestionJourneyFromAnswers(config, currentAnswers)
      : [];

    const currentIndex = order.findIndex((id) => id === questionId);
    const prevQuestionId = order[currentIndex - 1] || order[0];

    setQuestionId(prevQuestionId);
    navigate({
      pathname: "/",
      search: `id=${prevQuestionId}`,
    });
  };

  const backToSummary = () => {
    saveAnswer();
    navigate("/review");
  };

  return { onPrev, onNext, backToSummary };
};
