import styled from "styled-components";
import { AssessmentContext } from "../context";
import { useContext } from "react";
import { Subsection } from "./Subsection";

const IndicatorWrapper = styled.div`
  height: 1.65rem;
  display: flex;
  align-items: center;
  flex: 20px 0 0;
`;

const Indicator = styled.div<{ isActive: boolean }>`
  height: 20px;
  width: 20px;
  border-radius: 100%;
  background-color: #ffffff;
  border: #535353 2px solid;
  background-color: ${({ isActive }) => (isActive ? "#0065BD" : "#ffffff")};
`;

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const Text = styled.span`
  font-size: 1rem;
  font-weight: 500;
`;

interface Props {
  name: string;
  isCurrentSection: boolean;
}

export const Section = ({ name, isCurrentSection }: Props) => {
  const { config, questionId } = useContext(AssessmentContext);
  const questions: { title: string; id: string }[] = [];

  if (isCurrentSection) {
    const section = config?.sections.find((section) => section.name === name);
    section?.questions.forEach((question) =>
      questions.push({ title: question.title, id: question.id })
    );
  }

  return (
    <>
      <Container>
        <IndicatorWrapper>
          <Indicator isActive={isCurrentSection} />
        </IndicatorWrapper>
        <Text>{name}</Text>
      </Container>
      {questions.map(({ title, id }) => (
        <Subsection key={id} title={title} isActive={id === questionId} />
      ))}
    </>
  );
};
