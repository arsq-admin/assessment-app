import Supply25 from "@/assets/Supply25_Logo.png";

interface Props {
  margin?: string;
}

export const PoweredBySupply25 = ({ margin }: Props) => {
  return (
    <div
      style={{
        margin: margin || "0 auto",
        width: "100%",
        maxWidth: "13rem",
        border: "1px solid #D9D9D9",
        padding: "0.5rem 3rem",
        textAlign: "center",
        color: "#858B94",
        fontSize: "0.875rem",
        borderRadius: "8px",
      }}
    >
      <p style={{ margin: "0 0 0.5rem" }}>
        <strong>Powered by</strong>
      </p>
      <img width="100%" src={Supply25} />
    </div>
  );
};
