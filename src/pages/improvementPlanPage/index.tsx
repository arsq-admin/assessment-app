import { Column, Container } from "@/components";
import { useImprovementPlan } from "./useImprovementPlan";

export const ImprovementPlanPage = () => {
  useImprovementPlan();

  return (
    <Container padding="2rem">
      <Column>improvement plan</Column>
    </Container>
  );
};
