import { AssessmentContext } from "@/context";
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
  const { lastSkippedQuestion } = useContext(AssessmentContext);
  const href = lastSkippedQuestion ? `/?id=${lastSkippedQuestion}` : "/";

  return (
    <Notice>
      You have skipped a question and are now in preview mode.{" "}
      <Link to={href}>Click to go to skipped question.</Link>
    </Notice>
  );
};
