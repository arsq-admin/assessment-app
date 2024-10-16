import { ReviewAnswerRow } from "@/components/ReviewAnswerRow";
import { Section } from "../assessmentPage/types/assessmentConfig";
import styled from "styled-components";

const Container = styled.div`
  margin: 0 0 3rem;
`;

const Name = styled.h3`
  margin: 0 0 0.5rem;
`;

const Divider = styled.hr`
  margin: 0 0 1rem;
`;

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

interface Props {
  section: Section;
  answers: Record<string, string>;
}

export const ImprovementPlanSection = ({ section, answers }: Props) => {
  return (
    <Container>
      <Name>{section.name}</Name>
      <Divider />
      <QuestionContainer>
        {section.questions.map((question) => {
          return (
            <ReviewAnswerRow
              key={question.id}
              question={question.title}
              answer={answers[question.id]}
            />
          );
        })}
      </QuestionContainer>
    </Container>
  );
};
