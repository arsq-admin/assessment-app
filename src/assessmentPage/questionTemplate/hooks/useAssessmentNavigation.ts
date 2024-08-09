// import { useNavigate } from "react-router-dom";
import {
  LogicAction,
  Question,
  TargetType,
} from "../../types/assessmentConfig";
import { useContext } from "react";
import { isConditionMet } from "../../services";
import { AssessmentAnswers } from "../../types/assessmentAnswers";
import { AssessmentContext } from "../../context";

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
  // const navigate = useNavigate();
  const {
    setQuestionId,
    questionId,
    questionOrder,
    journey,
    setCurrentAnswers,
  } = useContext(AssessmentContext);
  const onNext = () => {
    saveAnswer();
    if (logic) {
      const firstLogicMatchedIndex = logic.findIndex(({ condition }) =>
        isConditionMet(condition, answer, currentAnswers)
      );

      if (firstLogicMatchedIndex !== -1) {
        const { target, action } = logic[firstLogicMatchedIndex];

        if (action === LogicAction.END) {
          // navigate(`/outcome?name=${target.value}`);
          return;
        }

        if (action === LogicAction.SKIP) {
          if (target.type === TargetType.QUESTION) {
            setQuestionId(target.value);
            return;
          }
        }
      }
    }

    const currentIndex = questionOrder.findIndex((id) => id === questionId);
    setQuestionId(questionOrder[currentIndex + 1]);
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

  return { onPrev, onNext };
};
