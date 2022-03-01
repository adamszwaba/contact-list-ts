import { Card, CardHeader, Typography } from "@mui/material";
import { styled } from "@mui/system";

const PersonCard = styled(Card)<{ selected?: boolean }>(
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

export type FirstANdLastName = string;

export type PersonId = string;

export type Person = {
  id: PersonId;
  firstNameLastName: FirstANdLastName;
  jobTitle: string;
  emailAddress: string;
};

export const Avatar = ({
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

function Contact({
  person,
  selected = false,
  onClick,
}: {
  person: Person;
  selected?: boolean;
  onClick: () => void;
}) {
  const { firstNameLastName, jobTitle, emailAddress, id } = person;

  return (
    <PersonCard
      aria-labelledby={`${id}-title`}
      selected={selected}
      aria-selected={selected}
      onClick={onClick}
    >
      <CardHeader
        avatar={<Avatar firstAndLastName={firstNameLastName} />}
        title={firstNameLastName}
        titleTypographyProps={{ id: `${id}-title` }}
        subheader={jobTitle}
      ></CardHeader>
      <Typography sx={{ color: "text.disabled" }} textAlign="center">
        {emailAddress}
      </Typography>
    </PersonCard>
  );
}

export default Contact;
