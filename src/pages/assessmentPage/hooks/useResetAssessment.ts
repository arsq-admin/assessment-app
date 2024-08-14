import { Dispatch, SetStateAction, useEffect } from "react";
import { TEMP_assessmentConfigs } from "../services";
import { useSearchParams } from "react-router-dom";
// import { useParams } from "react-router-dom";

interface Props {
  setQuestionId: Dispatch<SetStateAction<string>>;
  setJourney: Dispatch<SetStateAction<string[]>>;
}

export const useResetAssessment = ({ setQuestionId, setJourney }: Props) => {
  // const { name: assessmentName = "" } = useParams();
  const assessmentName = "saql";

  const [searchParams] = useSearchParams();
  const idInParam = searchParams.get("id");

  useEffect(() => {
    // Reset when a different assessment is loaded
    const assessmentConfig = TEMP_assessmentConfigs[assessmentName];
    const firstQuestion = assessmentConfig?.sections?.[0]?.questions?.[0];
    setQuestionId(idInParam || firstQuestion.id || "");
    setJourney([]);
  }, [assessmentName, setQuestionId, setJourney, idInParam]);
};
