import { ImprovementAction } from "@/api/assessment/types";
import { useState } from "react";

export const useImprovementPlan = () => {
  const [improvementPlan, setImprovementPlan] = useState<
    Record<string, Partial<ImprovementAction>>
  >({});
  return { improvementPlan, setImprovementPlan };
};
