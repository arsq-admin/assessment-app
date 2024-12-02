import { ReviewAnswerRow } from "@/components";
import { ImprovementAction, Section } from "@/api/assessment/types";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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
  answers: Record<string, Partial<ImprovementAction>>;
}

export const ImprovementPlanSection = ({ section, answers }: Props) => {
  const { urlId } = useParams();
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
              answer={answers[question.id]?.answer || ""}
              id={question.id}
              editUrl={`/${urlId}/improvement-plan/${question.id}`}
            />
          );
        })}
      </QuestionContainer>
    </Container>
  );
};
