import { useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        count: action.payload.count,
        isLoading: false,
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

  useEffect(() => {
    const fetchData = async () => {
      const data = await query({
        startFrom: state.startFrom,
        perPage,
        user,
        queryData,
      });

      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: { items: data.results, count: data.count },
      });
    };
    fetchData();
  }, [perPage, query, state.startFrom, user, queryData]);

  const nextPage = () => {
    dispatch({ type: "FETCH_NEXT_PAGE", payload: { perPage: perPage } });
  };

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
