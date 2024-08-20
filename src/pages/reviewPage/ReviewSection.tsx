import { Column } from "@/components";
import { FormattedAnswer } from "./useAnswers";
import styled from "styled-components";
import { useContext } from "react";
import { AssessmentContext } from "@/context";
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
  const {
    lastSkippedQuestion,
    questionOrder,
    questionsById,
    config,
    inPreviewMode,
    isComplete,
  } = useContext(AssessmentContext);
  console.log(lastSkippedQuestion);
  const lastSkippedQuestionIndex = questionOrder.findIndex(
    (id) => id === lastSkippedQuestion
  );

  const remainingQuestionIds = questionOrder.slice(lastSkippedQuestionIndex);
  const currentSection = config?.sections.find(
    (section) => section.name === name
  );
  const remainingQuestionsInCurrentSection = remainingQuestionIds.filter((id) =>
    currentSection?.questions.find((question) => question.id === id)
  );

  const remainingQuestions = remainingQuestionsInCurrentSection.map((id) => {
    return questionsById[id];
  });

  return (
    <OuterContainer span={12}>
      <h3>{name}</h3>
      <Divider />
      {answers.map(({ question, answers, id }) => {
        return (
          <AnswerRow key={id} id={id} question={question} answers={answers} />
        );
      })}
      {(inPreviewMode || isComplete) &&
        remainingQuestions.map(({ title, id }) => {
          return <AnswerRow key={id} id={id} question={title} answers={[]} />;
        })}
    </OuterContainer>
  );
};
