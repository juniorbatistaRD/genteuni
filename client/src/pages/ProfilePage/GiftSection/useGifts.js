import { useEffect, useReducer } from "react";
import { getUserGiftsWithPagination } from "../../../data/queryGifts";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_GIFTS_SUCCESS":
      return {
        ...state,
        gifts: [...state.gifts, ...action.payload.gifts],
        count: action.payload.count,
        isLoading: false,
      };

    case "FETCH_NEXT_PAGE":
      return { ...state, startFrom: state.startFrom + state.perPage };
    default:
      break;
  }
}
const initialState = {
  isLoading: true,
  gifts: [],
  startFrom: 0,
  perPage: 10,
  count: 0,
};

function useGifts(user) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getGifts = async () => {
      const data = await getUserGiftsWithPagination({
        startFrom: state.startFrom,
        perPage: 10,
        user,
      });

      dispatch({
        type: "FETCH_GIFTS_SUCCESS",
        payload: { gifts: data.results, count: data.count },
      });
    };

    getGifts();
  }, [state.perPage, state.startFrom, user]);

  const nextPage = () => {
    dispatch({ type: "FETCH_NEXT_PAGE" });
  };

  return { ...state, nextPage };
}

export default useGifts;
