export const postReducer = (state, action) => {
  switch (action.type) {
    case "SET_POSTS":
      console.log("payload", action.payload);
      return {
        ...state,
        posts: action.payload,
      };

    case "SETREFRESH":
      return {
        ...state,
        refresh: true,
      };

    case "SETLIKEREFRESH":
      // alert("hit")
      return {
        ...state,
        likeRefresh: true,
      };

    case "SETCOMMENTS":
      // alert("hit")
      return {
        ...state,
        allComments: action.payload,
      };
    default:
      return state;
  }
};
