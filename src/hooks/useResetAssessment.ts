import { Dispatch, SetStateAction, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { AssessmentConfig } from "@/api/assessment/types";

interface Props {
  setQuestionId: Dispatch<SetStateAction<string>>;
  setJourney: Dispatch<SetStateAction<string[]>>;
  assessmentConfig: AssessmentConfig | null;
}

export const useResetAssessment = ({
  setQuestionId,
  setJourney,
  assessmentConfig,
}: Props) => {
  const [searchParams] = useSearchParams();
  const idInParam = searchParams.get("id");

  useEffect(() => {
    // Reset when a different assessment is loaded
    const firstQuestion = assessmentConfig?.sections?.[0]?.questions?.[0];
    setQuestionId(idInParam || firstQuestion?.id || "");
  }, [setQuestionId, setJourney, idInParam, assessmentConfig]);

  useEffect(() => {
    setJourney([]);
  }, [setJourney]);
};
