// ebikeReducer.js and more information about Redux reducers
const initialState = {
  ebikes: [],
  error: null,
};

const ebikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_EBIKE_SUCCESS':
      return {
        ...state,
        ebikes: [...state.ebikes, action.payload],
        error: null,
      };
    case 'ADD_EBIKE_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ebikeReducer;
