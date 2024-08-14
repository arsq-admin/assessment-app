import { useContext } from "react";
import styled from "styled-components";
import { AssessmentContext } from "../context";
import { Section } from "./Section";
import { Column } from "@/components";

const Title = styled.h4`
  font-size: 1.3rem;
  margin: 0;
`;

const Sections = styled.div`
  display: flex;
  gap: 1rem;
  flex-direction: column;
  position: relative;
`;

const LineWrapper = styled.div`
  top: 0px;
  left: 9px;
  z-index: -1;
  position: absolute;
  height: 100%;
  padding: 0.5rem 0;
`;

const Line = styled.div`
  height: 100%;
  border-left: 2px solid #535353;
`;

export const ProgressBar = () => {
  const { config, questionId } = useContext(AssessmentContext);

  if (!config) return null;

  const sections = config.sections.map((section) => section.name);
  const currentSectionIndex = config.sections.findIndex((section) => {
    return section.questions.find((question) => question.id === questionId);
  });

  const currentSection = config.sections[currentSectionIndex];

  return (
    <Column span={4}>
      <Title>Progress</Title>
      <p>
        You have completed {currentSectionIndex} out of{" "}
        {config?.sections.length} sections.
      </p>
      <Sections>
        {sections?.map((section, index, array) => (
          <Section
            isLast={index === array.length - 1}
            key={section}
            name={section}
            isCurrentSection={currentSection?.name === section}
            isComplete={index < currentSectionIndex}
          />
        ))}
        <LineWrapper>
          <Line />
        </LineWrapper>
      </Sections>
    </Column>
  );
};
