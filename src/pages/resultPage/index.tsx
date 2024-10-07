import { AssessmentContext } from "@/context";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { OutcomeType } from "../assessmentPage/types/assessmentConfig";
import { UnsuccessfulPage } from "./components";
import { SuccessfulPage } from "./components/SuccessfulPage";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { config } = useContext(AssessmentContext);
  const [searchParam] = useSearchParams();

  const outcomeName = searchParam.get("outcome");
  const failedCount = searchParam.get("fail-count");

  const matchedOutcome =
    outcomeName &&
    config?.outcomes.find((outcome) => outcome.name === outcomeName);

  useEffect(() => {
    if (!outcomeName || !matchedOutcome) {
      navigate("/");
    }
  }, [matchedOutcome, navigate, outcomeName]);

  return (
    <>
      {matchedOutcome && matchedOutcome.type === OutcomeType.SUCCESSFUL && (
        <SuccessfulPage
          title={matchedOutcome.title}
          body={matchedOutcome.body}
        />
      )}
      {matchedOutcome && matchedOutcome.type === OutcomeType.UNSUCCESSFUL && (
        <UnsuccessfulPage failedCount={parseInt(failedCount || "1")} />
      )}
    </>
  );
};
