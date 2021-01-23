import { useState, useEffect, useReducer } from "react";
import axios from "axios";

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, isLoading: true, isError: false };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false
      };
    case "FETCH_FAIL":
      return { ...state, isError: true, isLoading: false };
    default:
      return state;
  }
};

const useDataFetchReducer = (initialData, initialUrl) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [state, dispatch] = useReducer(reducerFunction, {
    isLoading: false,
    data: initialData,
    isError: false
  });

  useEffect(() => {
    let didCancel = false;
    console.log("useEffect");
    const fecthData = async function () {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAIL" });
        }
      }
    };
    fecthData();

    return () => {
      didCancel = true;
    };
  }, [url]);

  return [state, setUrl];
};

export default useDataFetchReducer;
