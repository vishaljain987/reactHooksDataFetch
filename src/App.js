import "./styles.css";
import React, { useState } from "react";
import useDataFetch from "./useDataFetch";
import useDataFetchReducer from "./useDataFetchReducer";

export default function App() {
  const [query, setQuery] = useState("redux");
  /*
  const [{ data, isLoading, isError }, setUrl] = useDataFetch(
    { hits: [] },
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
*/
  const [{ data, isLoading, isError }, setUrl] = useDataFetchReducer(
    { hits: [] },
    "https://hn.algolia.com/api/v1/search?query=redux"
  );
  return (
    <div>
      <form
        onSubmit={(event) => {
          setUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
          event.preventDefault();
        }}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {isError && <div>Something went wrong...</div>}

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data.hits.map((item) => (
            <li key={item.objectID}>
              <a href={item.url}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
