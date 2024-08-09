import { createTheme } from "@mui/material/styles";

const headingStyles = {
  fontFamily: '"Anek Tamil"',
  fontWeight: 600,
  letterSpacing: 0,
  margin: 0,
};

export const muiTheme = createTheme({
  typography: {
    h1: { ...headingStyles, fontSize: "2rem" },
    h2: { ...headingStyles, fontSize: "1.8rem" },
    h3: { ...headingStyles, fontSize: "1.6rem" },
    h4: { ...headingStyles, fontSize: "1.4rem" },
    h5: { ...headingStyles, fontSize: "1.2rem" },
    h6: { ...headingStyles, fontSize: "1.1rem" },
  },
});
