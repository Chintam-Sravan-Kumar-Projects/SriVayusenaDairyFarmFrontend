import axios from "axios";
import * as types from "./actionTypes";
import { localhost, url2 } from "../Api/api";

//POST
export const addMilkRequestAction = () => {
  return { type: types.ADD_MILK_REQUEST };
};

export const addMilkSuccessAction = (payload) => {
  return { type: types.ADD_MILK_SUCCESS, payload };
};

export const addMilkFailureAction = () => {
  return { type: types.ADD_MILK_FAILURE };
};

//GET
export const getMilkRequestAction = () => {
  return { type: types.GET_MILK_REQUEST };
};

export const getMilkSuccessAction = (payload) => {
  return { type: types.GET_MILK_SUCCESS, payload };
};

export const getMilkFailureAction = (payload) => {
  return { type: types.GET_MILK_FAILURE,payload };
};

//================function for api request =====================

export const addMilk =({ value, token }) =>async (dispatch) => {

    dispatch(addMilkRequestAction());
    return await axios
      .post(`${url2}/milk/add/${value.mobile}`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .catch((res) => {
        dispatch(addMilkFailureAction(res.data));
      });
  };

//get milk data
export const getMilkDetails =({ value, token }) =>async (dispatch) => {

    dispatch(getMilkRequestAction());
    await axios
      .get(`${url2}/milk/get/${value}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then((res) => {
        dispatch(getMilkSuccessAction(res.data));
      })
      .catch((res) => {
        dispatch(getMilkFailureAction(res.data));
      });
  };
