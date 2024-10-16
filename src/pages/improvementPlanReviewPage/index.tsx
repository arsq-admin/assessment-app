import { Column, Container } from "@/components";
import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { useImprovementPlanAnswers } from "./useImprovementPlanAnswers";

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

        {sections.map((section) => {
          return (
            <div>
              <h2>{section.name}</h2>
              <hr />
              {section.questions.map((question) => {
                return (
                  <div>
                    <p>{question.title}</p>
                    <p>{answers[question.id]}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </Column>
    </Container>
  );
};
