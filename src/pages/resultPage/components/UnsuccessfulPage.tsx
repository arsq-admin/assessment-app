import { scotGovColour } from "@/themes/scotGov";
import { ImprovementPlanSection } from "./ImprovementPlanSection";
import { Column } from "@/components";

interface Props {
  failedCount?: number;
}

export const UnsuccessfulPage = ({ failedCount }: Props) => {
  const { secondaryText } = scotGovColour;

  return (
    <Column span={9}>
      <p style={{ color: secondaryText }}>Thank you for your submission</p>
      <h1>Currently, you do not meet the standards for this submission</h1>
      <ImprovementPlanSection failedCount={failedCount} />
      <h2>What is an improvement plan?</h2>
      <p style={{ color: secondaryText }}>
        Laculis vulputate eu urna sed. Non at nunc tristique sollicitudin massa
        semper hac rutrum. Nam mauris turpis duis tincidunt nisl a morbi quam
        vitae. At tortor placerat amet id non gravida ac duis.
      </p>
      <p style={{ color: secondaryText }}>
        Laculis vulputate eu urna sed. Non at nunc tristique sollicitudin massa
        semper hac rutrum. Nam mauris turpis duis tincidunt nisl a morbi quam
        vitae. At tortor placerat amet id non gravida ac duis.{" "}
      </p>
      <h2>What happens next?</h2>
      <p style={{ color: secondaryText }}>
        Your submission has been submitted and the improvement plan will be
        submitted separately if you choose to submit it.
      </p>
      <p style={{ color: secondaryText }}>
        Please refer to the invitation to tender to see if there are any
        remaining assessments to complete.
      </p>
      <p style={{ color: secondaryText }}>
        If you’d like to track your progress please visit app.supply25.com
      </p>
    </Column>
  );
};
