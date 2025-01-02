import { scotGovColour } from "@/themes";
import { ImprovementPlanSection } from "./ImprovementPlanSection";
import { Column, PoweredBySupply25 } from "@/components";
import { useContext } from "react";
import {
  AssessmentContext,
  TenderPackageContext,
  UserContext,
} from "@/context";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { exportResultAsPdf } from "@/api/assessment";

export const UnsuccessfulPage = () => {
  const { secondaryText } = scotGovColour;
  const { config } = useContext(AssessmentContext);
  const { organisations } = useContext(UserContext);
  const { tenderPackage } = useContext(TenderPackageContext);
  const { urlId = "" } = useParams();

  const { mutate, isPending } = useMutation({
    mutationFn: exportResultAsPdf,
  });

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

        <button
          style={{ margin: "1.5rem 0" }}
          className="ds_button ds_button--secondary"
          disabled={isPending}
          onClick={() =>
            mutate({
              organisationId: organisations[0]?.id,
              urlId,
              tenderName: tenderPackage?.name || "",
              referenceId: tenderPackage?.referenceId || "",
            })
          }
        >
          Download PDF Result
        </button>
        {tenderPackage?.allowImprovementPlan ? (
          <ImprovementPlanSection />
        ) : null}
      </Column>
      <Column span={3}>
        <PoweredBySupply25 />
      </Column>
    </>
  );
};
