import axios from "axios";
import * as types from "./actionTypes";
import { localhost, url2 } from "../Api/api";

//POST
export const addproducedmilkRequestAction = () => {
  return { type: types.ADD_PRODUCEDMILK_REQUEST };
};

export const addproducedmilkSuccessAction = (payload) => {
  return { type: types.ADD_PRODUCEDMILK_SUCCESS, payload };
};

export const addproducedmilkFailureAction = () => {
  return { type: types.ADD_PRODUCEDMILK_FAILURE };
};

//GET
export const getproducedmilkRequestAction = () => {
  return { type: types.GET_PRODUCEDMILK_REQUEST };
};

export const getproducedmilkSuccessAction = (payload) => {
  return { type: types.GET_PRODUCEDMILK_SUCCESS, payload };
};

export const getproducedmilkFailureAction = (payload) => {
  return { type: types.GET_PRODUCEDMILK_FAILURE,payload };
};

//================function for api request =====================

export const addproducedmilk =({ value, token }) =>async (dispatch) => {

    dispatch(addproducedmilkRequestAction());
    return await axios
      .post(`${url2}/producedmilk/add/${value.mobile}`, value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .catch((res) => {
        dispatch(addproducedmilkFailureAction(res.data));
      });
  };

//get producedmilk data
export const getproducedmilkDetails =({ value, token }) =>async (dispatch) => {

    dispatch(getproducedmilkRequestAction());
    await axios
      .get(`${url2}/producedmilk/get/${value}`,
      {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      })
      .then((res) => {
        dispatch(getproducedmilkSuccessAction(res.data));
      })
      .catch((res) => {
        dispatch(getproducedmilkFailureAction(res.data));
      });
  };
