const initialState = {
  activeSort: 'cheapest',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SORT':
      return {
        activeSort: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
