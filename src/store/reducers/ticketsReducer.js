const initialState = {
  tickets: [],
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TICKETS':
      // fetching tickets logic
      return {
        ...state,
        tickets: action.payload,
      };

    case 'SET_LOADING_STATE':
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
