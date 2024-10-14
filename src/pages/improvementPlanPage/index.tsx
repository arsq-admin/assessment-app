import { Column, Container } from "@/components";
import { useImprovementPlan } from "./useImprovementPlan";
import { ImprovementPlanBanner } from "./improvementPlanBanner";

export const ImprovementPlanPage = () => {
  useImprovementPlan();

  return (
    <>
      <ImprovementPlanBanner />
      <Container padding="0 2rem 2rem">
        <Column span={12}>improvement plan</Column>
      </Container>
    </>
  );
};
