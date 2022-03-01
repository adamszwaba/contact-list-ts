import { createTheme } from "@mui/material";
import { createSpacing } from "@mui/system";

const colors = {
  pink: "#FFC0CB",
  orange: "#e74c3c",
  black: "#333333",
  grey: "#666666",
};

const spacing = createSpacing();

const theme = createTheme({
  palette: {
    secondary: { main: colors.pink },
    text: {
      secondary: colors.orange,
      primary: colors.black,
      disabled: colors.grey,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          cursor: "pointer",
          padding: spacing(2),
          "&:hover": {
            padding: spacing(1.75),
            border: `${spacing(0.25)} solid ${colors.pink}`,
          },
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          padding: spacing(0, 0, 1, 0),
        },
        content: {
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
        },
      },
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "body2",
          color: "text.secondary",
          textTransform: "uppercase",
        },
      },
    },
  },
});

export default theme;
