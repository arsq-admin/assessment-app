import { Column, PoweredBySupply25 } from "@/components";
import { scotGovColour } from "@/themes/scotGov";

interface Props {
  title?: string;
  body?: string;
}

export const SuccessfulPage = ({ title = "", body = "" }: Props) => {
  const { secondaryText, positive, white } = scotGovColour;
  return (
    <>
      <Column span="2 / span 10" margin="0 0 4rem">
        <div
          className="ds_notification-panel"
          style={{ backgroundColor: positive, color: white }}
        >
          <h1 className="ds_notification-panel__title">
            Thank you for your submission
          </h1>
          <div className="ds_notification-panel__content">
            <p style={{ margin: "0 0 2rem" }}>
              <strong>
                You have met the requirements for this assessment.
              </strong>
            </p>
            <p style={{ margin: "0" }}>We’ve sent you a confirmation email.</p>
            <p>Check your spam inbox if you do not get an email.</p>
          </div>
        </div>
      </Column>
      <Column span="3 / span 8">
        <h2>{title}</h2>
        <p style={{ color: secondaryText }}>{body}</p>
        <h2>What happens next?</h2>
        <p style={{ color: secondaryText }}>
          You have completed the assessment and may now close this browser
          window.
        </p>
        <p style={{ color: secondaryText }}>
          Please refer to the invitation to tender to see if there are any
          remaining assessments to complete.
        </p>
        <p style={{ color: secondaryText }}>
          If you’d like to track your progress please visit{" "}
          <a href="https://app-staging.supply25.com">app.supply25.com</a>
        </p>
        <PoweredBySupply25 margin="5rem auto 0" />
      </Column>
    </>
  );
};
