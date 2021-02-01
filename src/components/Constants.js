export const color = "red";

export const colorHex = "#db2828";

const rootUrl = "http://localhost:8080";

export const getRestaurantUrl = rootUrl + "/api/restaurant";

export const getRestaurantByIdUrl = rootUrl + "/api/restaurant/";

export const getSearchRestaurantUrl = rootUrl + "/api/restaurant/search/";

export const getRestaurantCitiesUrl = rootUrl + "/api/restaurant/search/cities";

export const getRestaurantCategoriesUrl =
  rootUrl + "/api/restaurant/search/categories";

export const getAllCommentsUrl = rootUrl + "/api/comment/all/";

export const postCommentUrl = rootUrl + "/api/comment/";

export const getTablesUrl = rootUrl + "/api/table/all/";

export const postReservationUrl = rootUrl + "/api/reservation/";

export const registerUserUrl = rootUrl + "/api/users/register";

export const loginUserUrl = rootUrl + "/api/users/login";

export const getUserReservationsUrl = rootUrl + "/api/reservation/user/";

export const deleteReservationUrl = rootUrl + "/api/reservation/delete/";

export const addFavouritesUrl = rootUrl + "/api/restaurant/favourite/";

export const getFavouriteRestaurantsUrl = rootUrl + "/api/restaurant/favourite";

export const deleteFavouriteRestaurantUrl =
  rootUrl + "/api/restaurant/favourite/delete/";

export const newRestaurantUrl = rootUrl + "/api/restaurant";

export const saveMultipleTablesUrl = rootUrl + "/api/table/multiple/";

export const saveRestaurantThumbnail = rootUrl + "/api/restaurant/thumbnail/";
