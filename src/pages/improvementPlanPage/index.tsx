import { AssessmentTitle, Column, Container } from "@/components";
import { useImprovementPlan } from "./useImprovementPlan";
import { ImprovementPlanBanner } from "./ImprovementPlanBanner";
import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { getQuestionFromConfig } from "@/services/assessment";
import { ImprovementPlanQuestionTemplate } from "./ImprovementPlanQuestionTemplate";

export const ImprovementPlanPage = () => {
  useImprovementPlan();
  const { config, questionId } = useContext(AssessmentContext);

  const { question, section } =
    config && questionId
      ? getQuestionFromConfig(config, questionId)
      : { question: null, section: "" };

  return (
    <>
      <ImprovementPlanBanner />
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

          {question && <ImprovementPlanQuestionTemplate question={question} />}
        </Column>
      </Container>
    </>
  );
};
