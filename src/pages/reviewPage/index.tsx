import { Heading } from "./Heading";
import { useAnswers } from "./useAnswers";
import { ReviewSection } from "./ReviewSection";
import { Column, Container, PreviewNotice } from "@/components";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AssessmentContext } from "@/context";

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ReviewPage = () => {
  const { answers, journey, skippedQuestionId, isComplete, resolveAssessment } =
    useAnswers();
  const { urlId } = useParams();
  const navigate = useNavigate();

  const { config } = useContext(AssessmentContext);
  const { isTemplate } = config || {};

  const sections = Object.keys(answers);

  return (
    <Container padding="2rem">
      <Heading isTemplate={isTemplate} />
      {!isTemplate && skippedQuestionId && (
        <Column span={12}>
          <PreviewNotice skippedQuestionId={skippedQuestionId} />
        </Column>
      )}
      {sections.map((sectionName) => {
        return (
          <ReviewSection
            isTemplate={isTemplate}
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
              navigate(`/${urlId}/assessment`);
            }}
          >
            Go back to the assessments
          </button>
          {!isTemplate && (
            <button
              className="ds_button"
              disabled={!isComplete || isTemplate}
              onClick={() => {
                resolveAssessment();
              }}
            >
              Submit
            </button>
          )}
        </NavigationContainer>
      </Column>
    </Container>
  );
};
