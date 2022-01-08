import axios from "axios";

const defaultOption = {};

/**
 *
 * @param {object} options
 *  return axios object
 */
export const requestApi = function (options) {
  const finalOptions = Object.assign({}, defaultOption, options);
  const axiosInstance = axios(finalOptions);
  return axiosInstance;
};
