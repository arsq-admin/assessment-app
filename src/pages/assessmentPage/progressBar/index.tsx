import { useContext } from "react";
import styled from "styled-components";
import { AssessmentContext } from "../../../context";
import { Section } from "./Section";
import { Column, PoweredBySupply25 } from "@/components";
import { getQuestionJourneyFromAnswers } from "@/services/assessment";

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
  z-index: -2;
  position: absolute;
  height: 100%;
  padding: 0.5rem 0;
`;

const Line = styled.div`
  height: 100%;
  border-left: 2px solid #535353;
`;

export const ProgressBar = () => {
  const { config, questionId, currentAnswers } = useContext(AssessmentContext);

  if (!config) return null;

  const journey = getQuestionJourneyFromAnswers(config, currentAnswers);

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
        {config.sections?.map(({ name, questions }, index, array) => {
          const questionsInJourney = questions.filter((question) =>
            journey.includes(question.id)
          );
          const isComplete = questionsInJourney.every(
            (question) => currentAnswers[question.id]
          );
          return (
            <Section
              isLast={index === array.length - 1}
              key={name}
              name={name}
              isCurrentSection={currentSection?.name === name}
              isComplete={isComplete}
            />
          );
        })}
        <LineWrapper>
          <Line />
        </LineWrapper>
      </Sections>
      <PoweredBySupply25 margin="2rem" />
    </Column>
  );
};
