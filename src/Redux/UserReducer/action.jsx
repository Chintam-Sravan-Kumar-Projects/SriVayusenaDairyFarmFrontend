import axios from "axios";
import * as types from "./actionTypes";
import { url2 } from "../Api/api";

// Add Customer Actions
export const addUserRequestAction = () => ({
  type: types.CUSTOMER_USER_REQUEST,
});

export const addUserSuccessAction = (payload) => ({
  type: types.CUSTOMER_USER_SUCCESS,
  payload,
});

export const addUserFailureAction = (payload) => ({
  type: types.CUSTOMER_USER_FAILURE,
  payload,
});

// Get Customer Actions
export const getUserRequestAction = () => ({
  type: types.GET_CUSTOMER_REQUEST,
});

export const getUserSuccessAction = (payload) => ({
  type: types.GET_CUSTOMER_SUCCESS,
  payload,
});

export const getUserFailureAction = (payload) => ({
  type: types.GET_CUSTOMER_FAILURE,
  payload,
});

// Add Customer Function
export const addcustomer = ({ value, token }) => async (dispatch) => {
  dispatch(addUserRequestAction());
  try {
    const response = await axios.post(`${url2}/customer/register`, value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Dispatch success action if needed (depending on your reducer flow)
    dispatch(addUserSuccessAction(response.data));
    return response.data;
  } catch (error) {
    const errorMsg =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(addUserFailureAction(errorMsg));
  }
};

// Get All Customer Details Function
export const getcustomersDetails = ({ token }) => async (dispatch) => {
  dispatch(getUserRequestAction());
  try {
    const response = await axios.get(`${url2}/customer/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Check for error in response data if present

    if (response.data.err) {
      dispatch(getUserFailureAction(response.data.err));
    } else {
      dispatch(getUserSuccessAction(response.data));
    }
  } catch (error) {
    const errorMsg =
      error.response && error.response.data && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch(getUserFailureAction(errorMsg));
  }
};
