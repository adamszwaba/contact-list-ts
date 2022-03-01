import { Add, Redo } from "@mui/icons-material";
import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import React from "react";
import apiData from "./api";
import Contact, { Person, PersonId } from "./Contact";

type UseFetchContactsReturnType = [
  () => void,
  {
    error: boolean;
    loading: boolean;
    hasMore: boolean;
    data: Record<PersonId, Person>;
  }
];

const useFetchContacts = (): UseFetchContactsReturnType => {
  const [data, setData] = React.useState<Record<PersonId, Person>>({});
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);

  React.useEffect(() => {
    if (loading) {
      (async function () {
        setError(false);
        try {
          const response = await apiData();

          // in case we're at the end of the thing,
          // let's make sure we tell the user
          if (response.length < 10) {
            setHasMore(false);
          }
          setData(
            response.reduce((acc, curr) => {
              acc[curr.id] = curr;
              return acc;
            }, data)
          );
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [data, loading]);

  const fetchContacts = () => {
    setLoading(true);
  };

  return [fetchContacts, { error, loading, hasMore, data }];
};

function ContactList() {
  const [selected, setSelected] = React.useState<PersonId[]>([]);
  const [fetchContacts, { error, loading, hasMore, data }] = useFetchContacts();

  const handleSelectContact = (id: PersonId) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id));
    } else {
      setSelected([...selected, id]);
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
            person={data[personId]}
            selected
            onClick={() => handleSelectContact(personId)}
          />
        ))}
        {Object.values(data)
          .filter((person) => !selected.includes(person.id))
          .map((person) => (
            <Contact
              key={person.id}
              person={person}
              onClick={() => handleSelectContact(person.id)}
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
