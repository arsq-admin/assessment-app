import { QuestionTemplate } from "./questionTemplate";
import { AssessmentContext } from "../../context";
import { Column } from "@/components";
import { AssessmentTtile } from "./components";
import { ProgressBar } from "./progressBar";
import { useContext } from "react";
import { getQuestionFromConfig } from "./services";

export const AssessmentPage = () => {
  const { config, questionId, currentAnswers } = useContext(AssessmentContext);

  const { question, section } =
    config && questionId
      ? getQuestionFromConfig(config, questionId)
      : { question: null, section: "" };

  return (
    <>
      <Column span={8}>
        {question ? (
          <>
            <AssessmentTtile
              question={question}
              section={section}
              title={config?.name || ""}
            />
            <QuestionTemplate
              question={question}
              currentAnswers={currentAnswers}
            />
          </>
        ) : (
          <div>Missing question</div>
        )}
      </Column>
      <ProgressBar />
    </>
  );
};
