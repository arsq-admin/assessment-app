import styled from "styled-components";

interface Props {
  title: string;
  section: string;
}

const Title = styled.h2`
  margin: 0;
  font-size: 1.7rem;
  font-weight: 400;
  margin-bottom: 0.25rem;
`;

export const AssessmentTtile = ({ title }: Props) => {
  return (
    <>
      <Title>{title}</Title>
    </>
  );
};
