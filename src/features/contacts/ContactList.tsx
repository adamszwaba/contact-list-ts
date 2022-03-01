import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import Contact, { Person } from "./Contact";

function ContactList() {
  const [data, setData] = React.useState<Person[]>([
    {
      id: "1",
      emailAddress: "fake.mail@mail.ts",
      firstNameLastName: "Fake Name",
      jobTitle: "Fake Job Title",
    },
    {
      id: "1",
      emailAddress: "fake.mail@mail.ts",
      firstNameLastName: "Fake Name",
      jobTitle: "Fake Job Title",
    },
    {
      id: "1",
      emailAddress: "fake.mail@mail.ts",
      firstNameLastName: "Fake Name",
      jobTitle: "Fake Job Title",
    },
  ]);
  const [selected, setSelected] = React.useState<Person[]>([
    {
      id: "1",
      emailAddress: "fake.mail@mail.ts",
      firstNameLastName: "Fake Name",
      jobTitle: "Fake Job Title",
    },
  ]);

  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <div>
      <div>Selected contacts: {selected.length}</div>
      <Typography id="contact-list-label">List of contacts</Typography>
      <Stack spacing={2} aria-labelledby="contact-list-label">
        {selected.map((person) => (
          <Contact key={person.id} person={person} selected />
        ))}
        {data.map((person) => (
          <Contact key={person.id} person={person} />
        ))}
      </Stack>
      <Button variant="contained">Fetch contacts</Button>
    </div>
  );
}

export default ContactList;
