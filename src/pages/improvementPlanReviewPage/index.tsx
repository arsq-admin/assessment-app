import { Column, Container } from "@/components";
import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { useImprovementPlanAnswers } from "./useImprovementPlanAnswers";
import { ImprovementPlanSection } from "./ImprovementPlanSection";

export const ImprovementPlanReviewPage = () => {
  const { config } = useContext(AssessmentContext);
  const { sections, answers } = useImprovementPlanAnswers();

  return (
    <Container>
      <Column span={9}>
        <p>{config?.name} - Improvement Plan</p>
        <h1>Review your assessment answers</h1>
        <p>
          Thanks you for completing laculis vulputate eu urna sed. Non at nunc
          tristique sollicitudin massa semper hac rutrum. Nam mauris turpis duis
          tincidunt nisl a morbi quam vitae.
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
      </Column>
    </Container>
  );
};
