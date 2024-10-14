import styled from "styled-components";
import { Question } from "../types/assessmentConfig";
import { SectionTitle } from ".";

interface Props {
  title: string;
  section: string;
  question: Question;
}

const Title = styled.h2`
  margin: 0;
  font-size: 1.1875rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

export const AssessmentTtile = ({ title, section, question }: Props) => {
  return (
    <>
      <Title>{title}</Title>
      <SectionTitle section={section} subsection={question.subsection} />
    </>
  );
};
