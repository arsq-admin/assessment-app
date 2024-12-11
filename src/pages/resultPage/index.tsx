import { AssessmentContext } from "@/context";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BuyerResult, SupplierResult } from "./components";
import { Container } from "@/components";
import { AssessmentType } from "@/api/assessment/types";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { config } = useContext(AssessmentContext);
  const [searchParam] = useSearchParams();

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
    </Container>
  );
};
