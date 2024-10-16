import { scotGovColour } from "@/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  p {
    font-size: 1rem;
    margin: 0 0 0.5rem;
    white-space: pre-wrap;
  }
`;

interface Props {
  question: string;
  answer: string;
  editUrl?: string;
}

export const ReviewAnswerRow = ({ question, answer, editUrl }: Props) => {
  const { secondaryText } = scotGovColour;

  return (
    <Container>
      <div>
        <p>
          <b>{question}</b>
        </p>
        <p style={{ color: secondaryText }}>{answer || "-"}</p>
      </div>
      <Link to={editUrl || ""}>Edit</Link>
    </Container>
  );
};
