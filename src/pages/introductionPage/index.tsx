import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { Column, Container } from "@/components";
import { useNavigate } from "react-router-dom";

export const IntroductionPage = () => {
  const { config, tenderName } = useContext(AssessmentContext);
  const navigate = useNavigate();
  const beginAssessment = () => {
    navigate("/assessment");
  };

  return (
    <Container padding="3rem">
      <Column span={12}>
        <p>
          <b>Welcome to the</b>
        </p>
        <h2>{config?.name}</h2>
        <p>{tenderName}</p>
        {config?.introduction.map((intro, introIndex) => {
          return (
            <div key={introIndex}>
              <h3>{intro.heading}</h3>
              {intro.content.map((element, contentIndex) => {
                return <p key={contentIndex}>{element}</p>;
              })}
            </div>
          );
        })}

        <button
          className="ds_button"
          type="button"
          id="begin-assessment"
          onClick={beginAssessment}
        >
          Begin assessment
        </button>
      </Column>
    </Container>
  );
};
