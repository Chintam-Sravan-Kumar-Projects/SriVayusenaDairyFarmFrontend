import axios from "axios";
import * as types from "./actionTypes";
import { localhost, url2 } from "../Api/api";

//POST
export const addhealthRequestAction = () => {
  return { type: types.ADD_HEALTH_REQUEST };
};

export const addhealthSuccessAction = (payload) => {
  return { type: types.ADD_HEALTH_SUCCESS, payload };
};

export const addhealthFailureAction = () => {
  return { type: types.ADD_HEALTH_FAILURE };
};

//GET
export const gethealthRequestAction = () => {
  return { type: types.GET_HEALTH_REQUEST };
};

export const gethealthSuccessAction = (payload) => {
  return { type: types.GET_HEALTH_SUCCESS, payload };
};

export const gethealthFailureAction = (payload) => {
  return { type: types.GET_HEALTH_FAILURE,payload };
};

//================function for api request =====================

export const addhealth =({ value, token }) =>async (dispatch) => {

    dispatch(addhealthRequestAction());
    return await axios
      .post(`${url2}/health/add/${value.mobile}`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .catch((res) => {
        dispatch(addhealthFailureAction(res.data));
      });
  };

//get health data
export const gethealthDetails =({ value, token }) =>async (dispatch) => {

    dispatch(gethealthRequestAction());
    await axios
      .get(`${url2}/health/get/${value}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then((res) => {
        dispatch(gethealthSuccessAction(res.data));
      })
      .catch((res) => {
        dispatch(gethealthFailureAction(res.data));
      });
  };
