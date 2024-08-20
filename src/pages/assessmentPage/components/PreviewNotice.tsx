import { AssessmentContext } from "@/context";
import {
  getLastAnsweredQuestion,
  getNextQuestion,
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

export const PreviewNotice = () => {
  const { config, currentAnswers, questionOrder } =
    useContext(AssessmentContext);

  const lastAnsweredQuestion = getLastAnsweredQuestion(
    questionOrder,
    currentAnswers
  );
  const nextQuestion =
    config && getNextQuestion(config, lastAnsweredQuestion.id, currentAnswers);

  const href = nextQuestion?.id ? `/?id=${nextQuestion.id}` : "/";

  return (
    <Notice>
      You have skipped a question and are now in preview mode.{" "}
      <Link to={href}>Click to go to skipped question.</Link>
    </Notice>
  );
};
