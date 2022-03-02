import { Typography } from "@mui/material";

import { FirstANdLastName } from "./Contact";

const Avatar = ({
  firstAndLastName,
}: {
  firstAndLastName: FirstANdLastName;
}) => {
  const initials = firstAndLastName
    .split(" ")
    .slice(0, 2)
    .map((partOfName) => partOfName[0])
    .join("");
  return (
    <Typography
      variant="h6"
      sx={{
        borderWidth: 1,
        borderRadius: "50%",
        borderStyle: "solid",
        borderColor: "common.black",
        width: "40px",
        lineHeight: 2,
        textAlign: "center",
      }}
    >
      {initials}
    </Typography>
  );
};

export default Avatar;
