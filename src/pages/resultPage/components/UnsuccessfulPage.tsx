import { scotGovColour } from "@/themes";
import { ImprovementPlanSection } from "./ImprovementPlanSection";
import { Column, PoweredBySupply25 } from "@/components";

interface Props {
  failedCount?: number;
  name: string;
}

export const UnsuccessfulPage = ({ failedCount, name }: Props) => {
  const { secondaryText } = scotGovColour;

  return (
    <>
      <Column span={9}>
        <p style={{ color: secondaryText }}>
          Thank you for completing the {name}
        </p>
        <h1>
          Sorry, you do not meet the minimum requirements for this assessment
        </h1>
        <p style={{ color: secondaryText }}>
          Your current {name} answers have been saved and you can view these at
          any time in your Tender Assessments Package dashboard within Supply25.
          You can also download your answers in PDF format below.
        </p>

        <ImprovementPlanSection failedCount={failedCount} />
      </Column>
      <Column span={3}>
        <PoweredBySupply25 />
      </Column>
    </>
  );
};
