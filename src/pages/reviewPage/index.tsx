import { Heading } from "./Heading";
import { useAnswers } from "./useAnswers";
import { ReviewSection } from "./ReviewSection";
import { Column } from "@/components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const NavigationContainer = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ReviewPage = () => {
  const { answers } = useAnswers();
  const navigate = useNavigate();

  const sections = Object.keys(answers);

  return (
    <>
      <Heading />
      {sections.map((sectionName) => {
        return (
          <ReviewSection
            key={sectionName}
            name={sectionName}
            answers={answers[sectionName] || []}
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
