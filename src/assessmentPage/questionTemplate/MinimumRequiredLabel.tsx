import { globalTheme } from "@/themes";
import { Typography } from "@mui/material";

export const MinimumRequiredLabel = () => {
  return (
    <Typography
      sx={{
        display: "inline",
        color: globalTheme.white,
        bgcolor: globalTheme.primary,
        p: "0.25rem 0.5rem",
        borderRadius: "5px",
        fontSize: "0.8rem",
      }}
    >
      Minimum Requirement
    </Typography>
  );
};
