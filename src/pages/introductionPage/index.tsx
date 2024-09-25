import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { Column } from "@/components";

export const IntroductionPage = () => {
  const { config } = useContext(AssessmentContext);
  return (
    <Column span={12}>
      <h2>Welcome to the</h2>
      <h1>{config?.name}</h1>
    </Column>
  );
};
