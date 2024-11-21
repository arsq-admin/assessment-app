import { Box, InputLabel, TextField } from "@mui/material";

interface Props {
  label: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: string | number;
}

export const FreeText = ({ value, label, onChange }: Props) => {
  return (
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <InputLabel
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          color: "#A6217A",
        }}
      >
        {label}
        <TextField type="text" value={value || ""} onChange={onChange} />
      </InputLabel>
    </Box>
  );
};
