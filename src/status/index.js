export const Status = {
  CANNOT_SEND_EMAIL: 501,
  LOGIN_FAILE: 502,
  SUCCESS: 200,
  REGISTER_SUCCESSFULLY: 201,
  REGISTER_FAILE: 503,
  LOGIN_SUCCESS: 202,
  LOGOUT_SUCCESS: 203,
  MAIL_VERIFIED: 204,
  SEND_MAIL: 205,
  SEND_MAIL_SUCCESS: 206,
  GET_USER_SUCCESS: 207,
  USER_NOT_FOUND: 504,
};
export const getStatus = (status) => {
  return Object.keys(Status).find((key) => Status[key] == status);
};
export const checkStatus = (status) => {
  return status >= 500 ? false : true;
};
