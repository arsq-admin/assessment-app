import { getHex } from "@/themes";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import loading from "@/assets/abstract-loader-white.json";

export const FullPageLoading = () => {
  return (
    <Box
      sx={{
        backgroundColor: getHex("white"),
        height: "100%",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        svg: {
          width: "50%",
          maxWidth: "20rem",
        },
      }}
    >
      <Typography m="0" zIndex={100}>
        Loading your assessment...
      </Typography>
      <Lottie animationData={loading} loop style={{ marginTop: "-2rem" }} />
    </Box>
  );
};
