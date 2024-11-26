import { Outcome, OutcomeType } from "@/api/assessment/types";
import { SuccessfulPage } from "./SuccessfulPage";
import { UnsuccessfulPage } from "./UnsuccessfulPage";

interface Props {
  outcome: Outcome;
}

export const SupplierResult = ({ outcome }: Props) => {
  return (
    <>
      {outcome && outcome.type === OutcomeType.SUCCESSFUL && (
        <SuccessfulPage title={outcome.title} body={outcome.body} />
      )}
      {outcome && outcome.type === OutcomeType.UNSUCCESSFUL && (
        <UnsuccessfulPage />
      )}
    </>
  );
};
