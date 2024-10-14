import { QuestionGuidance, QuestionTitle } from "@/components";
import { Question } from "../assessmentPage/types/assessmentConfig";
import styled from "styled-components";
import { QuestionAndAnswer } from "../reviewPage/useAnswers";
import { YourAnswer } from "./YourAnswer";
import { MinimumRequiredAnswer } from "./MinimumRequiredAnswer";

const QuestionContainer = styled.div`
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Divider = styled.hr`
  margin: 0;
  border-color: #ebebeb;
`;

interface Props {
  question: Question;
  failedAnswer?: QuestionAndAnswer;
}

export const ImprovementPlanQuestionTemplate = ({
  question,
  failedAnswer,
}: Props) => {
  const { title, guidance } = question;

  return (
    <QuestionContainer>
      <QuestionTitle>
        <span>{title}</span>
      </QuestionTitle>
      {guidance && <QuestionGuidance guidance={guidance} />}
      {failedAnswer && <YourAnswer failedAnswer={failedAnswer} />}
      {question && <MinimumRequiredAnswer question={question} />}
      <Divider />
      <h3>Please outline the improvements you will make</h3>
      <input />
    </QuestionContainer>
  );
};
