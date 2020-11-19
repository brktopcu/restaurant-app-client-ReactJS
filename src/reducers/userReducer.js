const initialState = {
  user: {},
  validToken: false,
};

const booleanPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        validToken: booleanPayload(action.payload),
        user: action.payload,
      };

    default:
      return initialState;
  }
};

export default userReducer;
