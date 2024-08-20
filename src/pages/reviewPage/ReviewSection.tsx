import { Column } from "@/components";
import { FormattedAnswer } from "./useAnswers";
import styled from "styled-components";
import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { AnswerRow } from "./AnswerRow";
import { getRemainingQuestionsInSection } from "@/services/assessment";

const OuterContainer = styled(Column)`
  margin-bottom: 3rem;
`;

const Divider = styled.hr`
  margin: 0.5rem 0;
`;

interface Props {
  name: string;
  isComplete: boolean;
  answers: { id: string; question: string; answers: FormattedAnswer[] }[];
}

export const ReviewSection = ({ name, answers, isComplete }: Props) => {
  const { config, currentAnswers } = useContext(AssessmentContext);

  const remainingQuestions = config
    ? getRemainingQuestionsInSection(config, name, currentAnswers)
    : [];

  return (
    <OuterContainer span={12}>
      <h3>{name}</h3>
      <Divider />
      {answers.map(({ question, answers, id }) => {
        return (
          <AnswerRow
            key={id}
            id={id}
            question={question}
            answers={answers}
            isAnswered
          />
        );
      })}
      {!isComplete &&
        remainingQuestions.map(({ title, id }) => {
          return <AnswerRow key={id} id={id} question={title} answers={[]} />;
        })}
    </OuterContainer>
  );
};
