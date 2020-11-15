const testReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_ERROR":
      return [...state, action.payload];

    default:
      return state;
  }
};

export default testReducer;
