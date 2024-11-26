import React from "react";
import { scotGovColour } from "@/themes";
import styled from "styled-components";
import { AssessmentAnswer } from "@/api/assessment/types";

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
  failedAnswer: AssessmentAnswer;
}

export const YourAnswer = ({ failedAnswer }: Props) => {
  const { secondaryText } = scotGovColour;
  return (
    <Container>
      <h4>Your answer</h4>
      {failedAnswer.answer.map((answer) => {
        return (
          <React.Fragment key={answer.value}>
            <p style={{ color: secondaryText }}>{answer.value}</p>
            {answer.freeText && (
              <p style={{ color: secondaryText }}>{answer.freeText}</p>
            )}
          </React.Fragment>
        );
      })}
    </Container>
  );
};
