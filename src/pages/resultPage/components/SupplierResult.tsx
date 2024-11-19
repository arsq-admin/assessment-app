import { Outcome, OutcomeType } from "@/api/assessment/types";
import { SuccessfulPage } from "./SuccessfulPage";
import { UnsuccessfulPage } from "./UnsuccessfulPage";
import { useSearchParams } from "react-router-dom";

interface Props {
  outcome: Outcome;
}

export const SupplierResult = ({ outcome }: Props) => {
  const [searchParam] = useSearchParams();
  const failedCount = searchParam.get("fail-count");

  return (
    <>
      {outcome && outcome.type === OutcomeType.SUCCESSFUL && (
        <SuccessfulPage title={outcome.title} body={outcome.body} />
      )}
      {outcome && outcome.type === OutcomeType.UNSUCCESSFUL && (
        <UnsuccessfulPage failedCount={parseInt(failedCount || "1")} />
      )}
    </>
  );
};
