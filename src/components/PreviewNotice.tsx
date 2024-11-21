import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export const Notice = styled.div`
  background-color: #ebebeb;
  padding: 1rem 2rem;
  margin: 0 0 2rem;
  font-size: 0.95rem;
`;

interface Props {
  skippedQuestionId: string;
}

export const PreviewNotice = ({ skippedQuestionId }: Props) => {
  const { urlId } = useParams();
  const href = skippedQuestionId
    ? `/${urlId}/assessment?id=${skippedQuestionId}`
    : "/";

  return (
    <Notice>
      You have skipped a question and are now in preview mode.{" "}
      <Link to={href}>Click to go to skipped question.</Link>
    </Notice>
  );
};
