import { Column } from "@/components";
import { useAssessmentResult } from "./hooks";

export const ResultPage = () => {
  const {} = useAssessmentResult();
  return <Column span={12}>result page</Column>;
};
