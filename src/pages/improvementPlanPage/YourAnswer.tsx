import React from "react";
import { QuestionAndAnswer } from "../reviewPage/useAnswers";
import { scotGovColour } from "@/themes";
import styled from "styled-components";

const Container = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  h4,
  p {
    margin: 0;
  }
`;

interface Props {
  failedAnswer: QuestionAndAnswer;
}

export const YourAnswer = ({ failedAnswer }: Props) => {
  const { secondaryText } = scotGovColour;
  return (
    <Container>
      <h4>Your answer</h4>
      {failedAnswer.answers.map((answer) => {
        return (
          <React.Fragment key={answer.value}>
            <p style={{ color: secondaryText }}>{answer.label}</p>
            {answer.freeText && (
              <p style={{ color: secondaryText }}>{answer.freeText}</p>
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};
