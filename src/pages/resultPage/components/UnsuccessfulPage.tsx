import { scotGovColour } from "@/themes";
import { ImprovementPlanSection } from "./ImprovementPlanSection";
import { Column, PoweredBySupply25 } from "@/components";
import { useContext } from "react";
import { AssessmentContext } from "@/context";

interface Props {
  failedCount?: number;
}

export const UnsuccessfulPage = ({ failedCount }: Props) => {
  const { secondaryText } = scotGovColour;
  const { config } = useContext(AssessmentContext);

  return (
    <>
      <Column span={9}>
        <p style={{ color: secondaryText }}>
          Thank you for completing the {config?.name}
        </p>
        <h1>
          Sorry, you do not meet the minimum requirements for this assessment
        </h1>
        <p style={{ color: secondaryText }}>
          Your current {config?.name} answers have been saved and you can view
          these at any time in your Tender Assessments Package dashboard within
          Supply25. You can also download your answers in PDF format below.
        </p>

        <ImprovementPlanSection failedCount={failedCount} />
      </Column>
      <Column span={3}>
        <PoweredBySupply25 />
      </Column>
    </>
  );
};
