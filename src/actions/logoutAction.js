import setJwtToken from "../securityUtils/setJwtToken";

export const logoutAction = () => {
  localStorage.removeItem("jwtToken");
  setJwtToken(false);
  return {
    type: "SET_USER",
    payload: {},
  };
};
