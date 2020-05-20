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

function useInfiniteScrolling({ query, perPage, user }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      const data = await query({
        startFrom: state.startFrom,
        perPage,
        user,
      });

      dispatch({
        type: "FETCH_DATA_SUCCESS",
        payload: { items: data.results, count: data.count },
      });
    };

    getData();
  }, [perPage, query, state.startFrom, user]);

  const nextPage = () => {
    dispatch({ type: "FETCH_NEXT_PAGE", payload: { perPage: perPage } });
  };

  return {
    startFrom: state.startFrom,
    count: state.count,
    items: state.items,
    isLoading: state.isLoading,
    nextPage,
  };
}

export default useInfiniteScrolling;
