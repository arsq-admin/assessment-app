import { Question } from "../types/assessmentConfig";
import { SectionTitle } from ".";

interface Props {
  title: string;
  section: string;
  question: Question;
}

export const AssessmentTtile = ({ title, section, question }: Props) => {
  return (
    <header className="ds_page-header">
      <h1 className="ds_page-header__title">{title}</h1>
      <SectionTitle section={section} subsection={question.subsection} />
    </header>
  );
};
