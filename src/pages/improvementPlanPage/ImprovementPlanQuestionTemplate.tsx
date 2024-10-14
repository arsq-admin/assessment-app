import { QuestionGuidance, QuestionTitle } from "@/components";
import { Question } from "../assessmentPage/types/assessmentConfig";
import styled from "styled-components";

const QuestionContainer = styled.div`
  padding: 3rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

interface Props {
  question: Question;
}

export const ImprovementPlanQuestionTemplate = ({ question }: Props) => {
  const { title, guidance } = question;

  return (
    <QuestionContainer>
      <QuestionTitle>
        <span>{title}</span>
      </QuestionTitle>

      {guidance && <QuestionGuidance guidance={guidance} />}
    </QuestionContainer>
  );
};
