import { ImprovementPlanSection } from "./ImprovementPlanSection";

interface Props {
  failedCount?: number;
}
export const UnsuccessfulPage = ({ failedCount }: Props) => {
  return (
    <>
      <div>Thank you for your submission</div>
      <h1>Currently, you do not meet the standards for this submission</h1>
      <ImprovementPlanSection failedCount={failedCount} />
      <h2>What is an improvement plan?</h2>
      <p>
        Laculis vulputate eu urna sed. Non at nunc tristique sollicitudin massa
        semper hac rutrum. Nam mauris turpis duis tincidunt nisl a morbi quam
        vitae. At tortor placerat amet id non gravida ac duis.
      </p>
      <p>
        Laculis vulputate eu urna sed. Non at nunc tristique sollicitudin massa
        semper hac rutrum. Nam mauris turpis duis tincidunt nisl a morbi quam
        vitae. At tortor placerat amet id non gravida ac duis.{" "}
      </p>
      <h2>What happens next?</h2>
      <p>
        Your submission has been submitted and the improvement plan will be
        submitted separately if you choose to submit it.
      </p>
      <p>
        Please refer to the invitation to tender to see if there are any
        remaining assessments to complete.
      </p>
      <p>If you’d like to track your progress please visit app.supply25.com</p>
    </>
  );
};
