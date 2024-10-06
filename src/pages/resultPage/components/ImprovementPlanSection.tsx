interface Props {
  failedCount?: number;
}

export const ImprovementPlanSection = ({ failedCount }: Props) => {
  return (
    <div className="ds_inset-text">
      <p className="ds_inset-text__text">
        However, you can complete an Improvement plan to detail the changes you
        will make to meet the requirements of the tender.
      </p>
      <p className="ds_inset-text__text">
        You are required to submit an improvement plan for {failedCount || 1}{" "}
        questions.
      </p>
      <button className="ds_button" type="button">
        Start your improvement plan
      </button>
    </div>
  );
};
