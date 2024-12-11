import { AssessmentContext } from "@/context";
import { Section } from "@/pages/assessmentPage/types/assessmentConfig";

import { scotGovColour } from "@/themes";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

interface Props {
  failedCount?: number;
}

export const ImprovementPlanSection = ({ failedCount }: Props) => {
  const { urlId } = useParams();
  const { config, questionOrder } = useContext(AssessmentContext);

  const { secondaryText } = scotGovColour;

  const data = localStorage.getItem(`failed-questions-${urlId}`);

  const failedQuestions: FailedQuestions = JSON.parse(data || "{}");

  const questionIds = failedQuestions?.questionIds?.map(
    (question) => question.id
  );

  const navigate = useNavigate();

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

  return (
    <>
      <h2>What happens next?</h2>
      <p style={{ color: secondaryText }}>
        Based on the answers you have provided, you do not currently meet the
        minimum requirements for this assessment. However, you can complete an
        Improvement Plan to detail the changes you will make to meet the
        requirements you currently do not meet for this contract. You can start
        your Improvement Plan now or you can come back to it at a later date
        from your Tender Assessments Package dashboard within Supply25.
      </p>
      <p style={{ color: secondaryText }}>
        If you’d like to track your progress please visit{" "}
        <a
          href={`https://app-${import.meta.env.VITE_STAGE}.supply25.com`}
          target="_blank"
        >
          app.supply25.com
        </a>
      </p>

      <h2>What happens if you do not complete an Improvement Plan?</h2>
      <p style={{ color: secondaryText }}>
        If you choose not to complete an Improvement Plan, you may not be
        awarded this contract because you have not demonstrated that you are
        able to meet the requirements.
      </p>

      <button
        onClick={() => navigate(`/${urlId}/improvement-plan/introduction`)}
        className="ds_button"
        type="button"
      >
        Start your improvement plan
      </button>

      <div
        className="ds_inset-text"
        style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
      >
        <p>
          {failedCount} of your answers did not meet the minimum requirements.
        </p>

        {questionConfig?.map((section) => {
          return (
            <div key={section.name}>
              <h3 style={{ marginBottom: "0.5rem" }}>{section.name}</h3>
              <hr style={{ margin: "0 0 1rem" }} />
              {section.questions.map((question) => {
                return (
                  <p key={question.id} style={{ fontSize: "1rem" }}>
                    <b>
                      {questionOrder?.findIndex((id) => id === question.id) + 1}
                      . {question.title}
                    </b>
                  </p>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};
