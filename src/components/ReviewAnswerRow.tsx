import { AssessmentContext } from "@/context";
import { scotGovColour } from "@/themes";
import { useContext } from "react";
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
  id: string;
  editUrl: string;
}

export const ReviewAnswerRow = ({ question, answer, editUrl, id }: Props) => {
  const { secondaryText } = scotGovColour;
  const { questionOrder } = useContext(AssessmentContext);

  return (
    <Container>
      <div>
        <p>
          <b>
            {questionOrder.findIndex((questionId) => questionId === id) + 1}.{" "}
            {question}
          </b>
        </p>
        <p style={{ color: secondaryText }}>{answer || "-"}</p>
      </div>
      <Link to={editUrl || ""}>Edit</Link>
    </Container>
  );
};
