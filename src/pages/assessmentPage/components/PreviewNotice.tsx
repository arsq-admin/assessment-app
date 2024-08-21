import { AssessmentContext } from "@/context";
import {
  getFirstUnansweredQuestion,
  getLastAnsweredQuestion,
  getNextQuestion,
  getQuestionJourneyFromAnswers,
} from "@/services/assessment";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Notice = styled.div`
  background-color: #ebebeb;
  padding: 1rem 2rem;
  margin: 0 0 2rem;
  font-size: 0.95rem;
`;

interface Props {
  skippedQuestionId: string;
}

export const PreviewNotice = ({ skippedQuestionId }: Props) => {
  const href = skippedQuestionId ? `/?id=${skippedQuestionId}` : "/";

  return (
    <Notice>
      You have skipped a question and are now in preview mode.{" "}
      <Link to={href}>Click to go to skipped question.</Link>
    </Notice>
  );
};
