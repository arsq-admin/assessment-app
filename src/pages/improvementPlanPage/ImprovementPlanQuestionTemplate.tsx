import { QuestionGuidance, QuestionTitle } from "@/components";
import { Question } from "../assessmentPage/types/assessmentConfig";
import styled from "styled-components";
import { QuestionAndAnswer } from "../reviewPage/useAnswers";
import { getQuestionMinimumRequiredAnswer } from "@/services/assessment";
import React from "react";

const QuestionContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface Props {
  question: Question;
  failedAnswer?: QuestionAndAnswer;
}

export const ImprovementPlanQuestionTemplate = ({
  question,
  failedAnswer,
}: Props) => {
  const { title, guidance } = question;

  const minimumRequired = getQuestionMinimumRequiredAnswer(question);

  return (
    <QuestionContainer>
      <QuestionTitle>
        <span>{title}</span>
      </QuestionTitle>

      {guidance && <QuestionGuidance guidance={guidance} />}

      <div>
        <h4>Your answer</h4>
        {failedAnswer?.answers.map((answer) => {
          return (
            <React.Fragment key={answer.value}>
              <div>{answer.label}</div>
              <div>{answer.freeText}</div>
            </React.Fragment>
          );
        })}
      </div>

      {minimumRequired && (
        <div>
          <h4>Minimum Requirement</h4>
          <div>{minimumRequired}</div>
        </div>
      )}

      <hr />

      <h3>Please outline the improvements you will make</h3>
      <input />
    </QuestionContainer>
  );
};
