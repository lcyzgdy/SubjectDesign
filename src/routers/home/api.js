import { api } from "../../utils/api";
import axios from 'axios';

export const getInTheaters = () => {
  return api
    .get("/")
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};

export const signUp = (params) => {
  return api
    .post("/signup", params)
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};

export const signIn = (params) => {
  return api
    .post("/login", params)
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};

export const getUserProperty = () => {
  return api
    .post("/getUserProperty")
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};

export const getRecommendList = (uuid) => {
  return api
    .post("/getRecommend",{uuid})
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};

export const getUserRating = (uuid) => {
  return api
    .post("/getUserRatings",{uuid})
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};
