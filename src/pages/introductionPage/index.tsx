import { useContext } from "react";
import { AssessmentContext } from "@/context";
import { Column } from "@/components";
import { useNavigate } from "react-router-dom";

export const IntroductionPage = () => {
  const { config, tenderName } = useContext(AssessmentContext);
  const navigate = useNavigate();
  const beginAssessment = () => {
    navigate("/assessment");
  };
  return (
    <Column span={12}>
      <p>
        <b>Welcome to the</b>
      </p>
      <h2>{config?.name}</h2>
      <p>{tenderName}</p>
      {config?.introduction.map((intro) => {
        return (
          <div>
            <h3>{intro.heading}</h3>
            <p>{intro.content}</p>
          </div>
        );
      })}

      <button
        className="ds_button ds_button--secondary"
        type="button"
        id="begin-assessement"
        onClick={beginAssessment}
      >
        Begin assessement
      </button>
    </Column>
  );
};
