import { Column, Container } from "@/components";
import { FormattedAnswer } from "./useAnswers";
import styled from "styled-components";

const OuterContainer = styled(Column)`
  margin-bottom: 3rem;
`;

const Divider = styled.hr`
  margin: 0.5rem 0;
`;

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
  name: string;
  answers: Record<string, { question: string; answers: FormattedAnswer[] }[]>;
}

export const ReviewSection = ({ name, answers }: Props) => {
  return (
    <OuterContainer span={12}>
      <h3>{name}</h3>
      <Divider />
      {answers[name].map(({ question, answers }) => {
        return (
          <Container>
            <QuestionColumn span={8}>{question}</QuestionColumn>
            <AnswerColumn span={3}>
              {answers.map((answer) => (
                <div>
                  <Paragraph>{answer.label}</Paragraph>
                  {answer.freeText && (
                    <Paragraph>
                      <i>{answer.freeText}</i>
                    </Paragraph>
                  )}
                </div>
              ))}
            </AnswerColumn>
            <Column span={1}>
              <a>Edit</a>
            </Column>
          </Container>
        );
      })}
    </OuterContainer>
  );
};
