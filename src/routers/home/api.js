import { api } from "../../utils/api";
import axios from 'axios';

export const getInTheaters = () => {
  return api
    .get("/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a")
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
    .post("/signin", params)
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};

export const getUserProperty = () => {
  return api
    .get("/getUserProperty?status=signUp")
    .then(function(response) {
      return response;
    })
    .catch(data => {
      console.log(data);
    });
};
