import {
  AssessmentContext,
  TenderPackageContext,
  UserContext,
} from "@/context";
import { useContext, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BuyerResult, SupplierResult } from "./components";
import { Container } from "@/components";
import { AssessmentType } from "@/api/assessment/types";
import { useMutation } from "@tanstack/react-query";
import { exportResultAsPdf } from "@/api/assessment";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { config } = useContext(AssessmentContext);
  const { organisations } = useContext(UserContext);
  const { tenderPackage } = useContext(TenderPackageContext);
  const [searchParam] = useSearchParams();
  const { urlId = "" } = useParams();

  const { mutate } = useMutation({
    mutationFn: exportResultAsPdf,
  });

  const outcomeName = searchParam.get("outcome");

  const matchedOutcome =
    outcomeName &&
    config?.outcomes.find(
      (outcome) => outcome.name === outcomeName || outcome.id === outcomeName
    );

  useEffect(() => {
    if (!outcomeName || !matchedOutcome) {
      // TODO: Error here, what should happen
      // navigate("/");
    }
  }, [matchedOutcome, navigate, outcomeName]);

  return (
    <Container padding="4rem">
      {config?.assessmentType === AssessmentType.BUYER && matchedOutcome && (
        <BuyerResult outcome={matchedOutcome} />
      )}
      {config?.assessmentType === AssessmentType.SUPPLIER && matchedOutcome && (
        <SupplierResult outcome={matchedOutcome} />
      )}
      <button
        onClick={() =>
          mutate({
            organisationId: organisations[0]?.id,
            urlId,
            tenderName: tenderPackage?.name || "",
          })
        }
      >
        download pdf
      </button>
    </Container>
  );
};
