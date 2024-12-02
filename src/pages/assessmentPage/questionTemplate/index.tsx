import { Fragment, useCallback, useContext, useEffect } from "react";
import { RadioGroup } from "./RadioGroup";
import { CheckboxGroup } from "./CheckboxGroup";
import { FollowUpQuestions } from "./FollowUpQuestions";
import { Question } from "../types/assessmentConfig";
import { isMultipleChoiceQuestion } from "../services";
import { useAssessmentAnswers, useAssessmentNavigation } from "./hooks";
import { AssessmentAnswers } from "../types/assessmentAnswers";
import { AssessmentContext } from "../../../context";
import styled from "styled-components";
import { QuestionTitle, QuestionGuidance } from "@/components";

const QuestionContainer = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
  button {
    margin: 1rem 0;
  }
`;

const BackToSummaryButton = styled.button`
  margin: 0;
`;

interface Props {
  question: Question;
  currentAnswers: AssessmentAnswers;
  disabled: boolean;
}

export const QuestionTemplate = ({
  question,
  currentAnswers,
  disabled,
}: Props) => {
  const { title, guidance, id, followUp } = question;
  const { questionOrder, reachedReviewPage } = useContext(AssessmentContext);
  const currentIndex = questionOrder.findIndex(
    (questionId) => questionId === id
  );

  const {
    answer,
    setAnswer,
    freeText,
    setFreeText,
    followUpValue,
    setFollowUpValue,
    followUpFreeText,
    setFollowUpFreeText,
    saveAnswer,
  } = useAssessmentAnswers({
    question,
  });

  const { onNext, onPrev, backToSummary } = useAssessmentNavigation({
    currentAnswers,
    saveAnswer,
    question,
    answer,
  });

  // Temporary keyboard control
  const keydownListener = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "n") {
        onNext();
      }
      if (event.key === "b") {
        onPrev();
      }
    },
    [onNext, onPrev]
  );

  useEffect(() => {
    window.addEventListener("keydown", keydownListener, true);
    return () => window.removeEventListener("keydown", keydownListener, true);
  }, [keydownListener]);

  const currentQuestionPosition = questionOrder.findIndex(
    (questionId) => questionId === id
  );

  return (
    <Fragment>
      <QuestionContainer>
        <QuestionTitle>
          <span>{currentQuestionPosition + 1}.</span>
          <span>{title}</span>
        </QuestionTitle>

        {guidance && <QuestionGuidance guidance={guidance} />}

        {isMultipleChoiceQuestion(question) && !question.allowMultiple ? (
          <RadioGroup
            questionId={id}
            value={answer[0]}
            freeText={freeText[answer[0]]}
            onChange={(event) => {
              setAnswer([event.target.value]);
            }}
            freeTextOnChange={(event, optionValue) =>
              setFreeText((prevState) => ({
                ...prevState,
                [optionValue]: event.target.value,
              }))
            }
            options={question.options}
            disabled={disabled}
          />
        ) : null}

        {isMultipleChoiceQuestion(question) && question.allowMultiple ? (
          <CheckboxGroup
            questionId={id}
            value={answer}
            onChange={(event) => {
              const isChecked = event.target.checked;
              setAnswer((prevValue) => {
                const answer = Array.isArray(prevValue)
                  ? prevValue.filter((option) => option !== event.target.value)
                  : [];

                if (isChecked) {
                  answer.push(event.target.value);
                }

                return answer;
              });
            }}
            freeTextOnChange={(event, optionValue) =>
              setFreeText((prevState) => ({
                ...prevState,
                [optionValue]: event.target.value,
              }))
            }
            freeText={freeText}
            options={question.options}
            disabled={disabled}
          />
        ) : null}

        {followUp && (
          <FollowUpQuestions
            value={answer}
            config={followUp}
            setFollowUpValue={setFollowUpValue}
            followUpValue={followUpValue}
            followUpFreeText={followUpFreeText}
            setFollowUpFreeText={setFollowUpFreeText}
          />
        )}
        <NavigationContainer>
          <button
            className="ds_button ds_button--secondary"
            type="button"
            id="prev"
            onClick={onPrev}
            disabled={currentIndex <= 0}
          >
            Previous
          </button>
          <button
            className="ds_button"
            type="button"
            id="next"
            onClick={onNext}
          >
            {questionOrder[questionOrder.length - 1] === question.id
              ? "Review your answers"
              : "Next"}
          </button>
        </NavigationContainer>
        {reachedReviewPage && (
          <BackToSummaryButton
            className="ds_button"
            type="button"
            onClick={backToSummary}
          >
            Back to Summary
          </BackToSummaryButton>
        )}
      </QuestionContainer>
    </Fragment>
  );
};
