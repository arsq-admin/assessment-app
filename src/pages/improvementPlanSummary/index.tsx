import { Container, Column, PoweredBySupply25 } from "@/components";
import { AssessmentContext } from "@/context";
import { useContext } from "react";
import { Section } from "@/api/assessment/types";
import { StatusLabel } from "./StatusLabel";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ImprovementPlanContext } from "../improvementPlanRoot/context";

export const ImprovementPlanSummary = () => {
  const { config, questionOrder, failedAnswers } =
    useContext(AssessmentContext);
  const { improvementPlan } = useContext(ImprovementPlanContext);
  const { urlId } = useParams();

  const questionIds = failedAnswers?.map((answer) => answer.questionId);

  const questionConfig = config?.sections.reduce<Section[]>((acc, section) => {
    const failedQuestions = section.questions.filter((question) =>
      questionIds.includes(question.id)
    );

    if (failedQuestions.length > 0) {
      return [
        ...acc,
        {
          ...section,
          questions: failedQuestions,
        },
      ];
    }

    return acc;
  }, []);

  let answeredCount = 0;

  questionIds.forEach((id) => {
    if (improvementPlan[id]) {
      answeredCount++;
    }
  });

  const navigate = useNavigate();

  return (
    <Container padding="3rem 0">
      <Column span="1 / span 9" margin="0 0 4rem">
        <p style={{ marginBottom: "0.5rem" }}>{config?.name}</p>

        <h1>Improvement Plan</h1>

        <h2>
          {failedAnswers.length} of your answers did not meet the minimum
          requirements.
        </h2>

        <p>
          You have completed <b>{answeredCount}</b> out of{" "}
          <b>{failedAnswers.length}</b> improvement plan answers.
        </p>
        <div style={{ padding: "2rem 0" }}>
          {questionConfig?.map((section) => {
            return (
              <div key={section.name}>
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
                        key={question.id}
                        style={{
                          display: "flex",
                          gap: "4rem",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Link to={`/${urlId}/improvement-plan/${question.id}`}>
                          {questionOrder.findIndex((id) => id === question.id) +
                            1}
                          . {question.title}
                        </Link>
                        <StatusLabel
                          hasAnswer={Boolean(improvementPlan?.[question.id])}
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
        <div style={{ display: "flex", gap: "2rem" }}>
          <button
            style={{ margin: "0" }}
            className="ds_button ds_button--secondary"
            type="button"
            onClick={() => {
              navigate(`/${urlId}/improvement-plan/introduction`);
            }}
          >
            Previous
          </button>

          <button
            disabled={answeredCount !== questionIds.length}
            style={{ margin: "0" }}
            className="ds_button"
            type="button"
            onClick={() => {
              navigate(`/${urlId}/improvement-plan/review`);
            }}
          >
            See summary
          </button>
        </div>
      </Column>
      <Column span="10 / span 3">
        <PoweredBySupply25 />
      </Column>
    </Container>
  );
};
