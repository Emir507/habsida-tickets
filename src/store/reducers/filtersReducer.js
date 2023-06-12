// const initialState = {
//   all: true,
//   empty: false,
//   transfer_1: false,
//   transfer_2: false,
//   transfer_3: false,
// };
const allTrueState = {
  all: true,
  empty: true,
  transfer_1: true,
  transfer_2: true,
  transfer_3: true,
};
const allFalseState = {
  all: false,
  empty: false,
  transfer_1: false,
  transfer_2: false,
  transfer_3: false,
};

const reducer = (state = allTrueState, action) => {
  const { all, empty, transfer_1, transfer_2, transfer_3 } = state;
  switch (action.type) {
    case 'INC':
      return {
        ...state,
        counter: state.counter + 1,
      };
    case 'TOGGLE_ALL':
      if (action.payload) {
        return allTrueState;
      }
      return allFalseState;
    case 'TOGGLE_EMPTY':
      if (!action.payload && all) {
        return {
          ...state,
          empty: action.payload,
          all: false,
        };
      }
      if (transfer_1 && transfer_2 && transfer_3) {
        return allTrueState;
      }
      return {
        ...state,
        empty: action.payload,
      };
    case 'TOGGLE_TRANSFER_1':
      if (!action.payload && all) {
        return {
          ...state,
          transfer_1: action.payload,
          all: false,
        };
      }
      if (empty && transfer_2 && transfer_3) {
        return allTrueState;
      }
      return {
        ...state,
        transfer_1: action.payload,
      };
    case 'TOGGLE_TRANSFER_2':
      if (!action.payload && all) {
        return {
          ...state,
          transfer_2: action.payload,
          all: false,
        };
      }
      if (empty && transfer_1 && transfer_3) {
        return allTrueState;
      }
      return {
        ...state,
        transfer_2: action.payload,
      };
    case 'TOGGLE_TRANSFER_3':
      if (!action.payload && all) {
        return {
          ...state,
          transfer_3: action.payload,
          all: false,
        };
      }
      if (empty && transfer_1 && transfer_2) {
        return allTrueState;
      }
      return {
        ...state,
        transfer_3: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
