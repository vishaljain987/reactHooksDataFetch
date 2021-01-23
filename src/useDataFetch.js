import React, { useState, useEffect } from "react";
import axios from "axios";

const useDataFetch = (initialData, initialUrl) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    console.log("useEffect");
    const fecthData = async function () {
      setIsLoading(true);
      setIsError(false);
      try {
        const result = await axios(url);
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }

      setIsLoading(false);
    };
    fecthData();
  }, [url]);

  return [{ data, isLoading, isError }, setUrl];
};

export default useDataFetch;
