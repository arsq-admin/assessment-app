import {
  Column,
  Container,
  PoweredBySupply25,
  ImprovementPlanBanner,
} from "@/components";
import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { useImprovementPlanAnswers } from "./useImprovementPlanAnswers";
import { ImprovementPlanSection } from "./ImprovementPlanSection";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin: 5rem 0;
  button {
    margin: 0;
  }
`;

export const ImprovementPlanReviewPage = () => {
  const { config } = useContext(AssessmentContext);

  const navigate = useNavigate();
  const { sections, answers, journey } = useImprovementPlanAnswers();

  return (
    <>
      <ImprovementPlanBanner />
      <Container padding="2rem">
        <Column span={9}>
          <p>{config?.name} - Improvement Plan</p>
          <h1>Review your assessment answers</h1>
          <p>
            Thanks you for completing laculis vulputate eu urna sed. Non at nunc
            tristique sollicitudin massa semper hac rutrum. Nam mauris turpis
            duis tincidunt nisl a morbi quam vitae.
          </p>
          <br />

          {sections.map((section) => {
            return (
              <ImprovementPlanSection
                key={section.name}
                section={section}
                answers={answers}
              />
            );
          })}
          <NavigationContainer>
            <button
              className="ds_button ds_button--secondary"
              type="button"
              onClick={() => {
                navigate(`/improvement-plan?id=${journey[journey.length - 1]}`);
              }}
            >
              Previous
            </button>
            <button className="ds_button" type="button">
              Submit Improvement Plan
            </button>
          </NavigationContainer>
        </Column>
        <Column span={3}>
          <PoweredBySupply25 />
        </Column>
      </Container>
    </>
  );
};
