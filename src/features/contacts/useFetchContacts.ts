import React from "react";
import apiData from "./api";
import { Person } from "./Contact";

type UseFetchContactsReturnType = [
  () => void,
  {
    error: boolean;
    loading: boolean;
    hasMore: boolean;
    data: Person[];
  }
];

const useFetchContacts = (): UseFetchContactsReturnType => {
  const [data, setData] = React.useState<Person[]>([]);
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
          setData(response);
        } catch {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [loading]);

  const fetchContacts = () => {
    setLoading(true);
  };

  return [fetchContacts, { error, loading, hasMore, data }];
};

export default useFetchContacts;
