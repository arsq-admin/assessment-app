import { Question } from "../types/assessmentConfig";
import { SectionTitle } from ".";
import styled from "styled-components";

interface Props {
  title: string;
  section: string;
  question: Question;
}

const Header = styled.header`
  margin-top: 0;
`;

export const AssessmentTtile = ({ title, section, question }: Props) => {
  return (
    <Header className="ds_page-header">
      <h1 className="ds_page-header__title">{title}</h1>
      <SectionTitle section={section} subsection={question.subsection} />
    </Header>
  );
};
