import { Card } from "@mui/material";
import { styled } from "@mui/system";

const SelectableCard = styled(Card)<{ selected?: boolean }>(
  ({ theme, selected = false }) => ({
    ...(selected && {
      border: `${theme.spacing(0.25)} solid ${theme.palette.secondary.main}`,
      "&:hover": {
        padding: theme.spacing(2),
        border: `${theme.spacing(0.25)} solid ${theme.palette.secondary.main}`,
      },
    }),
  })
);

export default SelectableCard;
