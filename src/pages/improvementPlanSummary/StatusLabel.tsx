import { scotGovColour } from "@/themes";

export const StatusLabel = () => {
  const { tertiaryBackground } = scotGovColour;
  return (
    <div
      style={{
        padding: "0.5rem 1rem",
        backgroundColor: tertiaryBackground,
        flexShrink: 0,
        fontSize: "1rem",
      }}
    >
      <b>Not started</b>
    </div>
  );
};
