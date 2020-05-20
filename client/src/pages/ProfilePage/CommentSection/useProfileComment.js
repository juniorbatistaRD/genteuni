import { useEffect, useReducer, useCallback } from "react";
import { getCommentsWithPagination } from "../../../data/queryProfileComments";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_INITIAL_COMMENTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        comments: action.payload.comments,
        count: action.payload.count,
        startFrom: 0 + state.perPage
      };

    case "FETCH_MORE_COMMENTS_SUCCESS":
      return {
        ...state,
        comments: [...state.comments, ...action.payload.comments],
        startFrom: state.startFrom + state.perPage
      };

    case "FETCH_NEXT_PAGE":
      return {
        ...state,
        startFrom: state.startFrom + state.perPage
      };
    default:
      throw new Error("Action Unknown");
  }
}

const initialState = {
  comments: [],
  isLoading: true,
  startFrom: 0,
  count: 0,
  perPage: 10
};

const useProfileComment = user => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //initial fethc
  useEffect(() => {
    const initialFetch = async () => {
      const result = await getCommentsWithPagination({
        startFrom: 0,
        user,
        perPage: state.perPage
      });
      dispatch({
        type: "FETCH_INITIAL_COMMENTS_SUCCESS",
        payload: { comments: result.results, count: result.count }
      });
    };

    initialFetch(user);
  }, [state.perPage, user]);

  //reload when startFrom change
  const fetchMoreComments = useCallback(async () => {
    const result = await getCommentsWithPagination({
      startFrom: state.startFrom,
      user,
      perPage: state.perPage
    });
    dispatch({
      type: "FETCH_MORE_COMMENTS_SUCCESS",
      payload: { comments: result.results, count: result.count }
    });
  }, [state.perPage, state.startFrom, user]);

  //reload when add a comment
  const reloadComments = useCallback(async () => {
    const result = await getCommentsWithPagination({
      startFrom: 0,
      user,
      perPage: state.perPage
    });
    dispatch({
      type: "FETCH_INITIAL_COMMENTS_SUCCESS",
      payload: { comments: result.results, count: result.count }
    });
  }, [state.perPage, user]);

  return { ...state, fetchMoreComments, reloadComments };
};

export default useProfileComment;
