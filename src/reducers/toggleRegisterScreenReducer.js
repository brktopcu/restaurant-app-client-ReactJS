const toggleReducer = (state = "login", action) => {
  switch (action.type) {
    case "TOGGLE_REGISTER":
      return action.payload;

    default:
      return state;
  }
};

export default toggleReducer;
