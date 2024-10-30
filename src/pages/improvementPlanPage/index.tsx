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
  const { failedAnswer, onNext, onPrev, improvementAction, currentQuestionId } =
    useImprovementPlan();
  const { config } = useContext(AssessmentContext);

  const { question, section } =
    config && currentQuestionId
      ? getQuestionFromConfig(config, currentQuestionId)
      : { question: null, section: "" };

  return (
    <Container padding="2rem">
      <Column span={8}>
        <h3>
          Please detail the improvements you will make to reach at least the
          minimum requirement for this question.
        </h3>

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
            improvementAction={improvementAction}
          />
        )}
      </Column>
      <Column span={4}>
        <PoweredBySupply25 />
      </Column>
    </Container>
  );
};
