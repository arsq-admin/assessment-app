interface Props {
  subsection?: string;
  section?: string;
}

export const SectionTitle = ({ section, subsection }: Props) => {
  const heading: string[] = [];
  if (section) heading.push(section);
  if (subsection) heading.push(subsection);

  return section || subsection ? (
    <span className="ds_page-header__label  ds_content-label">
      {heading.join(" - ")}
    </span>
  ) : null;
};
