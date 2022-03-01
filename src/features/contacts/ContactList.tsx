import { Add, Redo } from "@mui/icons-material";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import Contact, { Person, PersonId } from "./Contact";
import useFetchContacts from "./useFetchContacts";

function ContactList() {
  const [fetchContacts, { error, loading, hasMore, data }] = useFetchContacts();

  /**
   * for those reading - this pattern might seem a little bit of an overkill
   * but I reached the point of thinking that maybe for an object of 1000 elements, going through
   * each of them and filtering through that big one conditionally on every id seems computationally difficult
   *
   * So I reached out to a familiar concept of entities and indexes, effectively indexing  contacts doubly -
   * - differentiating between selected and not; hashmaps like contacts have this welcome property
   * that if we want to access a specific index, the complexity of this operation is o(1)
   */
  const [selected, setSelected] = React.useState<PersonId[]>([]);
  const [other, setOther] = React.useState<PersonId[]>([]);
  const [contacts, setContacts] = React.useState<Record<PersonId, Person>>({});

  React.useEffect(() => {
    if (data) {
      setContacts((c) =>
        data.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, c)
      );
      setOther((o) => o.concat(data.map((newContact) => newContact.id)));
    }
  }, [data]);

  const handleSelectContact = (id: PersonId) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
      setOther([...other, id]);
    } else {
      setSelected([...selected, id]);
      setOther(other.filter((o) => o !== id));
    }
  };

  const getStartIcon = React.useCallback(() => {
    if (loading) {
      return <CircularProgress size={24} />;
    }
    if (error) {
      return <Redo />;
    }

    if (hasMore) {
      return <Add />;
    }

    return null;
  }, [loading, error, hasMore]);

  const getButtonText = React.useCallback(() => {
    if (loading) {
      return "Loading...";
    }
    if (error) {
      return "Error. Try again?";
    }
    if (hasMore) {
      return "Load more";
    }
    return "No more contacts";
  }, [loading, error, hasMore]);

  return (
    <div>
      <div>Selected contacts: {selected.length}</div>
      <Typography id="contact-list-label">List of contacts</Typography>
      <Stack spacing={2} aria-labelledby="contact-list-label" mb={2}>
        {selected.map((personId) => (
          <Contact
            key={personId}
            person={contacts[personId]}
            selected
            onClick={() => handleSelectContact(personId)}
          />
        ))}
        {other.map((personId) => (
          <Contact
            key={personId}
            person={contacts[personId]}
            onClick={() => handleSelectContact(personId)}
          />
        ))}
      </Stack>
      <Button
        variant="contained"
        color={error ? "error" : "primary"}
        disabled={loading || !hasMore}
        onClick={fetchContacts}
        startIcon={getStartIcon()}
      >
        {getButtonText()}
      </Button>
    </div>
  );
}

export default ContactList;
