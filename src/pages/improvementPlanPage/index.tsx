import { AssessmentTitle, Column, Container } from "@/components";
import { useImprovementPlan } from "./useImprovementPlan";
import { ImprovementPlanBanner } from "./improvementPlanBanner";
import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { getQuestionFromConfig } from "@/services/assessment";

export const ImprovementPlanPage = () => {
  useImprovementPlan();
  const { config, questionId } = useContext(AssessmentContext);

  const { question, section } =
    config && questionId
      ? getQuestionFromConfig(config, questionId)
      : { question: null, section: "" };

  return (
    <>
      <ImprovementPlanBanner />
      <Container padding="2rem">
        <Column span={12}>
          {question && (
            <AssessmentTitle
              question={question}
              section={section}
              title={`${config?.name} - Improvement Plan`}
            />
          )}
        </Column>
        <Column span={12}>improvement plan</Column>
      </Container>
    </>
  );
};
