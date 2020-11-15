export const createTestAction = (data) => {
  return {
    type: "SET_ERROR",
    payload: data,
  };
};
