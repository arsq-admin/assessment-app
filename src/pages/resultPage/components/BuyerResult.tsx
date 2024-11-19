import { Outcome } from "@/api/assessment/types";
import { Column, PoweredBySupply25 } from "@/components";
import { AssessmentContext } from "@/context";
import { scotGovColour } from "@/themes";
import { useContext } from "react";

interface Props {
  outcome: Outcome;
}

export const BuyerResult = ({ outcome }: Props) => {
  const { config } = useContext(AssessmentContext);
  const { secondaryText, positive, white } = scotGovColour;
  const { title } = outcome;
  const { name } = config || {};
  console.log(outcome);
  return (
    <>
      <Column span="2 / span 10" margin="0 0 4rem">
        <div
          className="ds_notification-panel"
          style={{ backgroundColor: positive, color: white }}
        >
          <div className="ds_notification-panel__content">
            <p>Thank you for completing the {name}</p>
          </div>
          <h1 className="ds_notification-panel__title">{title}</h1>
        </div>
      </Column>
      <Column span="3 / span 8">
        <h2>What happens next?</h2>
        <p style={{ color: secondaryText }}>
          You have completed the assessment and may now close this browser
          window.
        </p>
        <p style={{ color: secondaryText }}>
          Please go back to the{" "}
          <a href={`https://app-${import.meta.env.VITE_STAGE}.supply25.com`}>
            Supply25
          </a>{" "}
          app to complete your assessment package set up for your tender.
        </p>
        <PoweredBySupply25 margin="5rem auto 0" />
      </Column>
    </>
  );
};
