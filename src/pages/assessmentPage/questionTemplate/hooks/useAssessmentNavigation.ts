import { useNavigate, useSearchParams } from "react-router-dom";
import {
  LogicAction,
  Question,
  TargetType,
} from "../../types/assessmentConfig";
import { useContext } from "react";
import { isConditionMet } from "../../services";
import { AssessmentAnswers } from "../../types/assessmentAnswers";
import { AssessmentContext } from "../../../../context";

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
  const [_, setSearchParams] = useSearchParams();
  const {
    setQuestionId,
    questionId,
    questionOrder,
    journey,
    setCurrentAnswers,
    setReachedReviewPage,
  } = useContext(AssessmentContext);
  const onNext = () => {
    saveAnswer();

    const onLastQuestion =
      questionId === questionOrder[questionOrder.length - 1];

    if (onLastQuestion) {
      navigate("/review");
      setReachedReviewPage(true);
      return;
    }

    if (logic) {
      const firstLogicMatchedIndex = logic.findIndex(({ condition }) =>
        isConditionMet(condition, answer, currentAnswers)
      );

      if (firstLogicMatchedIndex !== -1) {
        const { target, action } = logic[firstLogicMatchedIndex];

        if (action === LogicAction.END) {
          navigate(`/outcome?name=${target.value}`);
          return;
        }

        if (action === LogicAction.SKIP) {
          if (target.type === TargetType.QUESTION) {
            setQuestionId(target.value);
            setSearchParams({ id: target.value });
            return;
          }
        }
      }
    }

    const currentIndex = questionOrder.findIndex((id) => id === questionId);
    setQuestionId(questionOrder[currentIndex + 1]);
    setSearchParams({ id: questionOrder[currentIndex + 1] });
  };

  const onPrev = () => {
    saveAnswer(false);
    setCurrentAnswers((prevState) => {
      const newState = { ...prevState };
      delete newState[question.id];
      return newState;
    });

    setQuestionId(journey[journey.length - 2]);
  };

  const backToSummary = () => {
    saveAnswer();
    navigate("/review");
  };

  return { onPrev, onNext, backToSummary };
};
