import styled from "styled-components";

interface Props {
  subsection?: string;
  section?: string;
}

const Section = styled.h3`
  margin: 0 !important;
  font-size: 1.2rem;
  font-weight: 400;
`;

export const SectionTitle = ({ section, subsection }: Props) => {
  const heading: string[] = [];
  if (section) heading.push(section);
  if (subsection) heading.push(subsection);

  return section || subsection ? (
    <Section>{heading.join(" - ")}</Section>
  ) : null;
};
