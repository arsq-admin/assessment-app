import {
  AssessmentTitle,
  Column,
  Container,
  PoweredBySupply25,
} from "@/components";
import { useImprovementPlan } from "./useImprovementPlan";
import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { getQuestionFromConfig } from "@/services/assessment";
import { ImprovementPlanQuestionTemplate } from "./ImprovementPlanQuestionTemplate";

export const ImprovementPlanPage = () => {
  const {
    failedAnswer,
    onNext,
    onPrev,
    currentQuestionId,
    saveImprovementAction,
  } = useImprovementPlan();
  const { config } = useContext(AssessmentContext);

  const { question, section } =
    config && currentQuestionId
      ? getQuestionFromConfig(config, currentQuestionId)
      : { question: null, section: "" };

  return (
    <Container padding="4rem">
      <Column span={8}>
        {question && (
          <AssessmentTitle
            question={question}
            section={section}
            title={`${config?.name} - Improvement Plan`}
          />
        )}

        {question && (
          <ImprovementPlanQuestionTemplate
            failedAnswer={failedAnswer}
            question={question}
            onPrev={onPrev}
            onNext={onNext}
            saveImprovementAction={saveImprovementAction}
          />
        )}
      </Column>
      <Column span={4}>
        <PoweredBySupply25 />
      </Column>
    </Container>
  );
};
