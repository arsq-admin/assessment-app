import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  border-left: 10px solid #d9d9d9;
`;

interface Props {
  guidance: string;
}

export const QuestionGuidance = ({ guidance }: Props) => {
  return (
    <details className="ds_details" style={{ margin: 0 }}>
      <summary className="ds_details__summary">Additional guidance</summary>
      <div className="ds_details__text">{guidance}</div>
    </details>
  );
};
