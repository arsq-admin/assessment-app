import { QuestionGuidance, QuestionTitle, FreeTextInput } from "@/components";
import { Question } from "../assessmentPage/types/assessmentConfig";
import styled from "styled-components";
import { YourAnswer } from "./YourAnswer";
import { MinimumRequiredAnswer } from "./MinimumRequiredAnswer";
import { useContext, useEffect, useState } from "react";
import { AssessmentContext } from "@/context";
import { useNavigate, useParams } from "react-router-dom";
import { AssessmentAnswer } from "@/api/assessment/types";

const QuestionContainer = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Divider = styled.hr`
  margin: 0;
  border-color: #ebebeb;
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
  button {
    margin: 0;
  }
`;

interface Props {
  question: Question;
  failedAnswer?: AssessmentAnswer;
  onPrev: (callback: () => void) => void;
  onNext: (callback: () => void) => void;
  improvementAction: string;
}

export const ImprovementPlanQuestionTemplate = ({
  question,
  failedAnswer,
  onPrev,
  onNext,
  improvementAction,
}: Props) => {
  const { urlId } = useParams();
  const { reachedImprovementPlanReviewPage, questionOrder } =
    useContext(AssessmentContext);
  const navigate = useNavigate();
  const { title, guidance, id } = question;
  const [ipValue, setIpValue] = useState(improvementAction || "");

  const saveImprovementAction = (questionId: string, answer: string) => {
    const currentImprovementPlan = JSON.parse(
      localStorage.getItem("improvement-plan-answers") || "{}"
    );
    const improvementPlanAnswers = {
      ...currentImprovementPlan,
      [questionId]: answer,
    };

    localStorage.setItem(
      "improvement-plan-answers",
      JSON.stringify(improvementPlanAnswers)
    );
  };

  useEffect(() => {
    setIpValue(improvementAction);
  }, [improvementAction]);

  return (
    <QuestionContainer>
      <QuestionTitle>
        <span>
          {questionOrder.findIndex((questionId) => questionId === id) + 1}.
        </span>
        <span>{title}</span>
      </QuestionTitle>
      {guidance && <QuestionGuidance guidance={guidance} />}
      {failedAnswer && <YourAnswer failedAnswer={failedAnswer} />}
      {question && <MinimumRequiredAnswer question={question} />}
      <Divider />
      <FreeTextInput
        label="Please outline the improvements you will make"
        value={ipValue}
        setValue={setIpValue}
        name={`improvementPlan-${id}`}
      />
      <NavigationContainer>
        <button
          className="ds_button ds_button--secondary"
          type="button"
          id="previous"
          onClick={() => {
            onPrev(() => {
              setIpValue("");
            });
          }}
        >
          Back
        </button>
        <button
          className="ds_button"
          type="button"
          id="next"
          onClick={() => {
            onNext(() => {
              setIpValue("");
              saveImprovementAction(id, ipValue);
            });
          }}
        >
          Save Answer
        </button>
      </NavigationContainer>
      {reachedImprovementPlanReviewPage && (
        <div>
          <button
            style={{ margin: "0" }}
            className="ds_button"
            type="button"
            onClick={() => {
              setIpValue("");
              saveImprovementAction(id, ipValue);
              navigate(`/${urlId}/improvement-plan/review`);
            }}
          >
            Back to Summary
          </button>
        </div>
      )}
    </QuestionContainer>
  );
};
