import { useReducer, useEffect, useCallback } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA_INITIAL_SUCCESS":
      return {
        ...state,
        items: [...action.payload.items],
        count: action.payload.count,
        isLoading: false,
        startFrom: 0 + action.payload.perPage,
      };

    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        count: action.payload.count,
        isLoading: false,
        startFrom: state.startFrom + action.payload.perPage,
      };

    case "FETCH_NEXT_PAGE":
      return { ...state, startFrom: state.startFrom + action.payload.perPage };

    case "RELOAD_DATA_SUCCESS":
      return {
        ...state,
        items: [...action.payload.items],
        count: action.payload.count,
        isLoading: false,
      };

    default:
      break;
  }
}

const initialState = {
  isLoading: true,
  startFrom: 0,
  count: 0,
  items: [],
};

function useInfiniteScrolling({ query, perPage, user, queryData }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  //fetch more data when startfrom change data
  useEffect(() => {
    const fetchData = async () => {
      const data = await query({
        startFrom: 0,
        perPage,
        user,
        queryData,
      });

      dispatch({
        type: "FETCH_DATA_INITIAL_SUCCESS",
        payload: { items: data.results, count: data.count, perPage },
      });
    };
    fetchData();
  }, [perPage, query, user, queryData]);

  //fetch next page
  // const nextPage = () => {
  //   dispatch({ type: "FETCH_NEXT_PAGE", payload: { perPage: perPage } });
  // };

  //reload when startFrom change
  const nextPage = useCallback(async () => {
    const data = await query({
      startFrom: state.startFrom,
      perPage,
      user,
      queryData,
    });
    dispatch({
      type: "FETCH_DATA_SUCCESS",
      payload: { items: data.results, count: data.count, perPage },
    });
  }, [perPage, query, state.startFrom, user, queryData]);

  //reload data (normally after new data is avalaible)
  const reloadData = async () => {
    const data = await query({
      startFrom: 0,
      perPage,
      user,
      queryData,
    });

    dispatch({
      type: "RELOAD_DATA_SUCCESS",
      payload: { items: data.results, count: data.count },
    });
  };

  return {
    startFrom: state.startFrom,
    count: state.count,
    items: state.items,
    isLoading: state.isLoading,
    nextPage,
    reloadData,
  };
}

export default useInfiniteScrolling;
