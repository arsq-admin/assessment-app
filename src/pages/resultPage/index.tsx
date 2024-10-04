import { Column } from "@/components";
import { AssessmentContext } from "@/context";
import { useContext, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export const ResultPage = () => {
  const navigate = useNavigate();
  const { config } = useContext(AssessmentContext);
  const [searchParam] = useSearchParams();

  const outcomeName = searchParam.get("outcome");

  const matchedOutcome =
    outcomeName &&
    config?.outcomes.find((outcome) => outcome.name === outcomeName);

  useEffect(() => {
    if (!outcomeName || !matchedOutcome) {
      navigate("/");
    }
  }, [matchedOutcome, navigate, outcomeName]);

  return (
    <Column span={12}>
      <h1>{matchedOutcome ? matchedOutcome.title : ""}</h1>
      <p>{matchedOutcome ? matchedOutcome.body : ""}</p>
    </Column>
  );
};
