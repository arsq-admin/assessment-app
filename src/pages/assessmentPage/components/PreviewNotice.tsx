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
  const { lastAnsweredQuestion } = useContext(AssessmentContext);
  const href = lastAnsweredQuestion ? `/?id=${lastAnsweredQuestion}` : "/";

  return (
    <Notice>
      You have skipped a question and are now in preview mode.{" "}
      <Link to={href}>
        Click to go to your last question and continue with your assessment.
      </Link>
    </Notice>
  );
};
