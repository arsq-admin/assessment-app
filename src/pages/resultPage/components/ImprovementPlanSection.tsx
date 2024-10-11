import { scotGovColour } from "@/themes";
import { useNavigate } from "react-router-dom";

interface Props {
  failedCount?: number;
}

export const ImprovementPlanSection = ({ failedCount }: Props) => {
  const { text, secondaryText, primary, secondaryBackground } = scotGovColour;
  const navigate = useNavigate();

  return (
    <div
      className="ds_inset-text"
      style={{
        borderLeftColor: primary,
        backgroundColor: secondaryBackground,
      }}
    >
      <p className="ds_inset-text__text" style={{ color: secondaryText }}>
        However, you can complete an{" "}
        <strong style={{ color: text }}>Improvement plan</strong> to detail the
        changes you will make to meet the requirements of the tender.
      </p>
      <p className="ds_inset-text__text" style={{ color: secondaryText }}>
        You are required to submit an improvement plan for{" "}
        <strong style={{ color: text }}>{failedCount || 1} questions</strong>.
      </p>
      <button
        onClick={() => navigate("/improvement-plan")}
        className="ds_button"
        type="button"
        style={{ margin: "1rem" }}
      >
        Start your improvement plan
      </button>
    </div>
  );
};
