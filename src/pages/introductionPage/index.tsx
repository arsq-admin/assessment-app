import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { Column, Container } from "@/components";
import { useNavigate, useParams } from "react-router-dom";

export const IntroductionPage = () => {
  const { config } = useContext(AssessmentContext);
  const { urlId } = useParams();
  const navigate = useNavigate();
  const beginAssessment = () => {
    navigate(`/${urlId}/assessment`);
  };

  return (
    <Container padding="3rem">
      <Column span={10}>
        <p>
          <b>Welcome to the</b>
        </p>
        <h2 style={{ margin: "0 0 2rem" }}>{config?.name}</h2>
        {config?.introduction.map((intro, introIndex) => {
          return (
            <div key={introIndex} style={{ marginBottom: "3rem" }}>
              <h3>{intro.heading}</h3>
              {intro.content.map((element, contentIndex) => {
                return Array.isArray(element) ? (
                  <ul style={{ marginLeft: "3rem" }}>
                    {element.map((innerElement) => {
                      return <li>{innerElement}</li>;
                    })}
                  </ul>
                ) : (
                  <p key={contentIndex}>{element}</p>
                );
              })}
            </div>
          );
        })}

        <button
          style={{ marginTop: "1rem" }}
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
