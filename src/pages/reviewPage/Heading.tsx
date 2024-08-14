import { Column } from "@/components";
import { useContext } from "react";
import { AssessmentContext } from "../../context";

export const Heading = () => {
  const { config, tenderName } = useContext(AssessmentContext);
  return (
    <Column span={10} margin="0 0 2rem">
      <h1>{config?.name}</h1>
      <h2>Review your assessment answers</h2>
      <p>
        Thank you for completing your assessment for {tenderName}. You can
        review your answers below and when you are ready, please submit your
        assessment.
      </p>
    </Column>
  );
};
