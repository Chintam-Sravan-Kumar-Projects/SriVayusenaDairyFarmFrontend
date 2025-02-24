import axios from "axios";
import * as types from "./actionTypes";
import { localhost, url2 } from "../Api/api";

//POST
export const addexpenseRequestAction = () => {
  return { type: types.ADD_EXPENSE_REQUEST };
};

export const addexpenseSuccessAction = (payload) => {
  return { type: types.ADD_EXPENSE_SUCCESS, payload };
};

export const addexpenseFailureAction = () => {
  return { type: types.ADD_EXPENSE_FAILURE };
};

//GET
export const getexpenseRequestAction = () => {
  return { type: types.GET_EXPENSE_REQUEST };
};

export const getexpenseSuccessAction = (payload) => {
  return { type: types.GET_EXPENSE_SUCCESS, payload };
};

export const getexpenseFailureAction = (payload) => {
  return { type: types.GET_EXPENSE_FAILURE,payload };
};

//================function for api request =====================

export const addexpense =({ value, token }) =>async (dispatch) => {
    dispatch(addexpenseRequestAction());
    
    return await axios
      .post(`${url2}/expense/add/`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .catch((res) => {
        dispatch(addexpenseFailureAction(res.data));
      });
  };

//get milk data
export const getexpenseDetails =({ value, token }) =>async (dispatch) => {

    dispatch(getexpenseRequestAction());
    await axios
      .get(`${url2}/expense/get/${value}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then((res) => {
        dispatch(getexpenseSuccessAction(res.data));
      })
      .catch((res) => {
        dispatch(getexpenseFailureAction(res.data));
      });
  };
