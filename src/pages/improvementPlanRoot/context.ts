import { ImprovementAction } from "@/api/assessment/types";
import { createContext, Dispatch, SetStateAction } from "react";

export interface ImprovementPlanContext {
  improvementPlan: Record<string, Partial<ImprovementAction>>;
  setImprovementPlan: Dispatch<
    SetStateAction<Record<string, Partial<ImprovementAction>>>
  >;
}

export const ImprovementPlanContext = createContext<ImprovementPlanContext>({
  improvementPlan: {},
  setImprovementPlan: () => {},
});
