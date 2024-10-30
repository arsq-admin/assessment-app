import { scotGovColour } from "@/themes";

interface Props {
  hasAnswer: boolean;
}

export const StatusLabel = ({ hasAnswer }: Props) => {
  const { tertiaryBackground, positive } = scotGovColour;
  return (
    <div
      style={{
        padding: "0.25rem 0",
        flexShrink: 0,
        backgroundColor: hasAnswer ? "transparent" : tertiaryBackground,
        fontSize: "1rem",
        border: `2px solid ${hasAnswer ? positive : tertiaryBackground}`,
        color: hasAnswer ? positive : "inherit",
        width: "8rem",
        textAlign: "center",
      }}
    >
      <b>{hasAnswer ? "Completed" : "Not started"}</b>
    </div>
  );
};
