import { Heading } from "./Heading";
import { useAnswers } from "./useAnswers";
import { ReviewSection } from "./ReviewSection";
import { Column } from "@/components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { areThereUnansweredQuestions } from "@/services/assessment";

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ReviewPage = () => {
  const { config, currentAnswers } = useContext(AssessmentContext);
  const { answers } = useAnswers();
  const navigate = useNavigate();

  const { sections: configSections = [] } = config || {};

  const isAssessmentIncomplete =
    config && areThereUnansweredQuestions(config, currentAnswers);

  const sections = isAssessmentIncomplete
    ? configSections.map((section) => section.name)
    : Object.keys(answers);

  return (
    <>
      <Heading />
      {sections.map((sectionName) => {
        return (
          <ReviewSection
            key={sectionName}
            name={sectionName}
            answers={answers[sectionName] || []}
            isComplete={!isAssessmentIncomplete}
          />
        );
      })}
      <Column span={12}>
        <NavigationContainer>
          <button
            className="ds_button ds_button--secondary"
            onClick={() => {
              navigate("/");
            }}
          >
            Go back to the assessments
          </button>
          <button className="ds_button">Submit</button>
        </NavigationContainer>
      </Column>
    </>
  );
};
