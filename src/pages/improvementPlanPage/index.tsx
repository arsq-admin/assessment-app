import { AssessmentTitle, Column, Container } from "@/components";
import { useImprovementPlan } from "./useImprovementPlan";
import { ImprovementPlanBanner } from "./improvementPlanBanner";
import { useContext } from "react";
import { AssessmentContext } from "@/context";

export const ImprovementPlanPage = () => {
  useImprovementPlan();
  const { config } = useContext(AssessmentContext);

  return (
    <>
      <ImprovementPlanBanner />
      <Container padding="2rem">
        <Column span={12}>
          <AssessmentTitle
            question={{}}
            section={""}
            title={config?.name || ""}
          />
        </Column>
        <Column span={12}>improvement plan</Column>
      </Container>
    </>
  );
};
