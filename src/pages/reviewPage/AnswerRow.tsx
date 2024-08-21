import { Column, Container } from "@/components";
import { FormattedAnswer } from "./useAnswers";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const QuestionColumn = styled(Column)`
  font-weight: 500;
`;

const AnswerColumn = styled(Column)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Paragraph = styled.p`
  margin: 0 0 0.25rem;
  > i {
    color: #727272;
  }
`;

interface Props {
  question: string;
  answers: FormattedAnswer[];
  id: string;
  previewOnly: boolean;
}

export const AnswerRow = ({ question, answers, id, previewOnly }: Props) => {
  const navigate = useNavigate();

  return (
    <Container>
      <QuestionColumn span={8}>{question}</QuestionColumn>
      <AnswerColumn span={3}>
        {answers.length > 0
          ? answers.map((answer) => (
              <div key={answer.value}>
                <Paragraph>{answer.label || "-"}</Paragraph>
                {answer.freeText && (
                  <Paragraph>
                    <i>{answer.freeText || "-"}</i>
                  </Paragraph>
                )}
              </div>
            ))
          : "—"}
      </AnswerColumn>
      <Column span={1}>
        <a onClick={() => navigate(`/?id=${id}`)}>
          {!previewOnly ? "Edit" : "View"}
        </a>
      </Column>
    </Container>
  );
};
