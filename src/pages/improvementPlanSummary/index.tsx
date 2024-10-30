import { Container, Column, PoweredBySupply25 } from "@/components";
import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Section } from "../assessmentPage/types/assessmentConfig";
import { StatusLabel } from "./StatusLabel";

interface FailedQuestions {
  questionIds: {
    id: string;
    question: string;
    answers: {
      label: string;
      value: string;
    }[];
  }[];
}

export const ImprovementPlanSummary = () => {
  const { config, questionOrder } = useContext(AssessmentContext);
  const data = localStorage.getItem(`failed-questions-${config?.id}`);

  const failedQuestions: FailedQuestions = JSON.parse(
    data || '{"questionIds": []}'
  );

  const questionIds = failedQuestions?.questionIds?.map(
    (question) => question.id
  );

  const questionConfig = config?.sections.reduce<Section[]>((acc, section) => {
    const newQuestions = section.questions.filter((question) =>
      questionIds.includes(question.id)
    );

    if (newQuestions.length > 0) {
      return [
        ...acc,
        {
          ...section,
          questions: newQuestions,
        },
      ];
    }

    return acc;
  }, []);

  const currentImprovementPlan = JSON.parse(
    localStorage.getItem("improvement-plan-answers") || "{}"
  );

  let answeredCount = 0;

  questionIds.forEach((id) => {
    if (currentImprovementPlan[id]) {
      answeredCount++;
    }
  });

  return (
    <Container padding="3rem 0">
      <Column span="1 / span 9" margin="0 0 4rem">
        <p style={{ marginBottom: "0.5rem" }}>{config?.name}</p>

        <h1>Improvement Plan</h1>

        <h2>
          {Object.keys(questionIds).length} of your answers did not meet the
          minimum requirements.
        </h2>

        <p>
          You have completed <b>{answeredCount}</b> out of{" "}
          <b>{questionIds.length}</b> improvement plan answers.
        </p>
        <div style={{ padding: "2rem 0" }}>
          {questionConfig?.map((section) => {
            return (
              <div>
                <h3 style={{ marginBottom: "1rem" }}>{section.name}</h3>
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    flexDirection: "column",
                  }}
                >
                  {section.questions.map((question) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          gap: "4rem",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <a href={`/improvement-plan/${question.id}`}>
                          {questionOrder.findIndex((id) => id === question.id) +
                            1}
                          . {question.title}
                        </a>
                        <StatusLabel
                          hasAnswer={Boolean(
                            currentImprovementPlan?.[question.id]
                          )}
                        />
                      </div>
                    );
                  })}
                </div>
                <hr />
              </div>
            );
          })}
        </div>
      </Column>
      <Column span="10 / span 3">
        <PoweredBySupply25 />
      </Column>
    </Container>
  );
};
