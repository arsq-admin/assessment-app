import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 1rem 1.5rem;
  border-left: 10px solid #d9d9d9;
`;

interface Props {
  guidance: string;
}

export const QuestionGuidance = ({ guidance }: Props) => {
  return <Wrapper>{guidance}</Wrapper>;
};
