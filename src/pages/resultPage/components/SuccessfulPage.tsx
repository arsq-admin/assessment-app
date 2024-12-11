import { Column, PoweredBySupply25 } from "@/components";
import { scotGovColour } from "@/themes";
import { useMutation } from "@tanstack/react-query";
import { exportResultAsPdf } from "@/api/assessment";
import { useContext } from "react";
import { TenderPackageContext, UserContext } from "@/context";
import { useParams } from "react-router-dom";

interface Props {
  title?: string;
  body?: string;
}

export const SuccessfulPage = ({ title = "", body = "" }: Props) => {
  const { secondaryText, positive, white } = scotGovColour;
  const { organisations } = useContext(UserContext);
  const { tenderPackage } = useContext(TenderPackageContext);
  const { urlId = "" } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: exportResultAsPdf,
  });

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
              <b>You have met the requirements for this assessment.</b>
            </p>
            <p style={{ margin: "0" }}>We’ve sent you a confirmation email.</p>
            <p>Check your spam inbox if you do not get an email.</p>
          </div>
        </div>
      </Column>
      <Column span="3 / span 8">
        <h2>{title}</h2>
        <p style={{ color: secondaryText }}>{body}</p>

        <button
          style={{ margin: "1.5rem 0" }}
          className="ds_button"
          disabled={isPending}
          onClick={() =>
            mutate({
              organisationId: organisations[0]?.id,
              urlId,
              tenderName: tenderPackage?.name || "",
              pcsId: tenderPackage?.pcsId || "",
            })
          }
        >
          Download PDF Result
        </button>

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
