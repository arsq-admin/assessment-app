import { scotGovColour } from "@/themes";
import styled from "styled-components";
import { Question } from "../assessmentPage/types/assessmentConfig";
import { getQuestionMinimumRequiredAnswer } from "@/services/assessment";

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
  question: Question;
}

export const MinimumRequiredAnswer = ({ question }: Props) => {
  const minimumRequired = getQuestionMinimumRequiredAnswer(question);
  const { secondaryText } = scotGovColour;
  return (
    <Container>
      <h4>Minimum Requirement</h4>
      <p style={{ color: secondaryText }}>{minimumRequired}</p>
    </Container>
  );
};
