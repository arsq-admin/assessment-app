import { Column } from "@/components";
import { FormattedAnswer } from "./useAnswers";
import styled from "styled-components";
import { AnswerRow } from "./AnswerRow";

const OuterContainer = styled(Column)`
  margin-bottom: 3rem;
`;

const Divider = styled.hr`
  margin: 0.5rem 0;
`;

interface Props {
  name: string;
  answers: { id: string; question: string; answers: FormattedAnswer[] }[];
}

export const ReviewSection = ({ name, answers }: Props) => {
  return (
    <OuterContainer span={12}>
      <h3>{name}</h3>
      <Divider />
      {answers.map(({ question, answers, id }) => {
        return (
          <AnswerRow key={id} id={id} question={question} answers={answers} />
        );
      })}
    </OuterContainer>
  );
};
