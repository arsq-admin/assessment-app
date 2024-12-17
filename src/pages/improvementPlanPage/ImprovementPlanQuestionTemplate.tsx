import { QuestionGuidance, QuestionTitle, FreeTextInput } from "@/components";
import { Question } from "@/api/assessment/types";
import styled from "styled-components";
import { YourAnswer } from "./YourAnswer";
import { MinimumRequiredAnswer } from "./MinimumRequiredAnswer";
import { useContext } from "react";
import { AssessmentContext, UserContext } from "@/context";
import { useNavigate, useParams } from "react-router-dom";
import { AssessmentAnswer } from "@/api/assessment/types";
import { ImprovementPlanContext } from "../improvementPlanRoot/context";

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
  onPrev: (callback?: () => void) => void;
  onNext: (callback?: () => void) => void;
  saveImprovementAction: (param: {
    assessmentId: string;
    title: string;
    questionId: string;
    answer: string;
    organisationId: string;
  }) => void;
}

export const ImprovementPlanQuestionTemplate = ({
  question,
  failedAnswer,
  onPrev,
  onNext,
  saveImprovementAction,
}: Props) => {
  const { urlId } = useParams();
  const { organisations } = useContext(UserContext);
  const { improvementPlan, setImprovementPlan } = useContext(
    ImprovementPlanContext
  );
  const { reachedImprovementPlanReviewPage, questionOrder } =
    useContext(AssessmentContext);
  const navigate = useNavigate();
  const { title, guidance, id } = question;

  const onClick = (questionId: string) => {
    const { answer } = improvementPlan[question.id];
    if (urlId && organisations[0]?.id && answer) {
      saveImprovementAction({
        assessmentId: urlId,
        title,
        questionId: questionId,
        answer,
        organisationId: organisations[0].id,
      });
    }
  };

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
        value={improvementPlan[question.id]?.answer || ""}
        setValue={(value) =>
          setImprovementPlan((prevState) => ({
            ...prevState,
            [question.id]: { answer: value },
          }))
        }
        name={`improvementPlan-${id}`}
      />
      <NavigationContainer>
        <button
          className="ds_button ds_button--secondary"
          type="button"
          id="previous"
          onClick={() => {
            onPrev();
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
              onClick(id);
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
              onClick(id);
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
