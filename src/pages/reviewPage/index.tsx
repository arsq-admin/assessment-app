import { Heading } from "./Heading";
import { useAnswers } from "./useAnswers";
import { ReviewSection } from "./ReviewSection";
import { Column, Container, PreviewNotice } from "@/components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ReviewPage = () => {
  const { answers, journey, skippedQuestionId, isComplete, resolveAssessment } =
    useAnswers();
  const navigate = useNavigate();

  const sections = Object.keys(answers);

  return (
    <Container padding="2rem">
      <Heading />
      {skippedQuestionId && (
        <Column span={12}>
          <PreviewNotice skippedQuestionId={skippedQuestionId} />
        </Column>
      )}
      {sections.map((sectionName) => {
        return (
          <ReviewSection
            key={sectionName}
            name={sectionName}
            answers={answers[sectionName] || []}
            journey={journey}
            skippedQuestionId={skippedQuestionId}
            isComplete={isComplete}
          />
        );
      })}
      <Column span={12}>
        <NavigationContainer>
          <button
            className="ds_button ds_button--secondary"
            onClick={() => {
              navigate("/assessment");
            }}
          >
            Go back to the assessments
          </button>
          <button
            className="ds_button"
            disabled={!isComplete}
            onClick={() => {
              resolveAssessment();
            }}
          >
            Submit
          </button>
        </NavigationContainer>
      </Column>
    </Container>
  );
};
