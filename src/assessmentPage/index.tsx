import { QuestionTemplate } from "./questionTemplate";
import { AssessmentContext } from "./context";
import { useAssessment, useResetAssessment, useSetJourney } from "./hooks";
import { Container } from "@/components";
import { AssessmentTtile } from "./components";
import styled from "styled-components";
import { ProgressBar } from "./progressBar";

const QuestionContainer = styled.div`
  width: 70%;
`;

export const AssessmentPage = () => {
  const {
    setQuestionId,
    questionId,
    currentAnswers,
    setCurrentAnswers,
    journey,
    setJourney,
    question,
    section,
    questionOrder,
    assessmentConfig,
  } = useAssessment();

  useResetAssessment({
    setJourney,
    setQuestionId,
  });

  useSetJourney({
    questionId,
    setJourney,
  });
  console.log(question);
  return (
    <AssessmentContext.Provider
      value={{
        config: assessmentConfig,
        questionId,
        questionOrder,
        setQuestionId,
        journey,
        currentAnswers,
        setCurrentAnswers,
      }}
    >
      <Container style={{ paddingTop: "3rem", display: "flex", gap: "10rem" }}>
        <QuestionContainer>
          {question ? (
            <>
              <AssessmentTtile
                title={assessmentConfig.name}
                section={section}
              />
              <QuestionTemplate
                sectionName={section}
                question={question}
                currentAnswers={currentAnswers}
              />
            </>
          ) : (
            <div>Missing question</div>
          )}
        </QuestionContainer>
        <ProgressBar />
      </Container>
    </AssessmentContext.Provider>
  );
};
