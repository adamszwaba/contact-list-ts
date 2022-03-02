import { CardHeader, Typography } from "@mui/material";
import SelectableCard from "src/components/SelectableCard";
import Avatar from "./Avatar";

export type FirstANdLastName = string;

export type PersonId = string;

export type JobTitle = string;

export type EmailAddress = string;

export type Person = {
  id: PersonId;
  firstNameLastName: FirstANdLastName;
  jobTitle: JobTitle;
  emailAddress: EmailAddress;
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
    <SelectableCard
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
      />
      <Typography sx={{ color: "text.disabled" }} textAlign="center">
        {emailAddress}
      </Typography>
    </SelectableCard>
  );
}

export default Contact;
