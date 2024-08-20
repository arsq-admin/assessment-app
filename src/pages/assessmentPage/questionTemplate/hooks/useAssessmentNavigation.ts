import { useNavigate } from "react-router-dom";
import {
  LogicAction,
  Question,
  TargetType,
} from "../../types/assessmentConfig";
import { useContext, useEffect } from "react";
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
  const {
    setQuestionId,
    questionId,
    questionOrder,
    journey,
    setCurrentAnswers,
    setReachedReviewPage,
    inPreviewMode,
    setInPreviewMode,
    lastSkippedQuestion,
    setlastSkippedQuestion,
  } = useContext(AssessmentContext);

  const onNext = () => {
    if (answer.length === 0) {
      if (!inPreviewMode) {
        setInPreviewMode(true);
      }

      if (!lastSkippedQuestion) {
        setlastSkippedQuestion(questionId);
      }
    } else {
      saveAnswer();
      setlastSkippedQuestion("");
    }

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
    saveAnswer(false);
    setCurrentAnswers((prevState) => {
      const newState = { ...prevState };
      delete newState[question.id];
      return newState;
    });

    setQuestionId(journey[journey.length - 2]);
    navigate({
      pathname: "/",
      search: `id=${journey[journey.length - 2]}`,
    });
  };

  const backToSummary = () => {
    saveAnswer();
    navigate("/review");
  };

  useEffect(() => {
    if (questionId === lastSkippedQuestion) {
      setInPreviewMode(false);
    }
  }, [questionId, lastSkippedQuestion, setInPreviewMode]);

  return { onPrev, onNext, backToSummary };
};
