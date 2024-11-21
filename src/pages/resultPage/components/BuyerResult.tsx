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
  const { title, content } = outcome;
  const { name } = config || {};

  return (
    <>
      <Column span="2 / span 10" margin="0 0 4rem">
        <h2 style={{ marginBottom: "0" }}>{name}</h2>
        <div
          className="ds_notification-panel"
          style={{ backgroundColor: positive, color: white, marginTop: "2rem" }}
        >
          <div className="ds_notification-panel__content">
            <h2>Thank you</h2>
            <p style={{ margin: "0", fontSize: "1.5rem", fontWeight: 400 }}>
              {title}
            </p>
            <p style={{ fontSize: "1.5rem" }}>
              <b>{outcome.name}</b>
            </p>
          </div>
        </div>
      </Column>
      <Column span="3 / span 8">
        {content.map(({ heading, body }) => {
          return (
            <>
              <h2>{heading}</h2>
              <p style={{ color: secondaryText }}>{body}</p>
            </>
          );
        })}
        <br />
        <p style={{ color: secondaryText }}>
          You have completed the assessment and may now close this browser
          window.
        </p>
        <PoweredBySupply25 margin="5rem auto 0" />
      </Column>
    </>
  );
};
