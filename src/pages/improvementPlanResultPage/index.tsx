import { exportResultAsPdf } from "@/api/assessment";
import { Column, Container, PoweredBySupply25 } from "@/components";
import { TenderPackageContext, UserContext } from "@/context";
import { scotGovColour } from "@/themes";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { useParams } from "react-router-dom";

export const ImprovementPlanResultPage = () => {
  const { positive, white, secondaryText } = scotGovColour;
  const { organisations } = useContext(UserContext);
  const { tenderPackage } = useContext(TenderPackageContext);
  const { urlId = "" } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: exportResultAsPdf,
  });

  return (
    <Container padding="4rem 0 10rem">
      <Column span="2 / span 10" margin="0 0 4rem">
        <div
          className="ds_notification-panel"
          style={{ backgroundColor: positive, color: white }}
        >
          <h1 className="ds_notification-panel__title">
            Thank you for submitting your improvement plan
          </h1>
          <div className="ds_notification-panel__content">
            <p style={{ margin: "0" }}>We’ve sent you a confirmation email.</p>
            <p>Check your spam inbox if you do not get an email.</p>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
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
        </div>
      </Column>
      <Column span="3 / span 8">
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
          <a href={`https://app-${import.meta.env.VITE_STAGE}.supply25.com`}>
            app.supply25.com
          </a>
        </p>
        <PoweredBySupply25 margin="5rem auto 0" />
      </Column>
    </Container>
  );
};
