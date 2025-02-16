//Write the ActionCreator functions here
import axios from "axios";
import * as types from "./actionTypes" ;
import {url2} from "../Api/api"

export const addUserRequestAction = () => {
  return { type: types.CUSTOMER_USER_REQUEST };
};

export const addUserSuccessAction = (payload) => {
  return { type: types.CUSTOMER_USER_SUCCESS, payload };
};

export const addUserFailureAction = (payload) => {
  return { type: types.CUSTOMER_USER_FAILURE,payload };
};


//GET USER DETAILS
export const getUserRequestAction = () => {
  return { type: types.GET_CUSTOMER_REQUEST };
};

export const getUserSuccessAction = (payload) => {
  return { type: types.GET_CUSTOMER_SUCCESS, payload };
};

export const getUserFailureAction = (payload) => {
  return { type: types.GET_CUSTOMER_FAILURE,payload };
};


//=============Functions currying js ==========================================================================


// admin signin function


//add CUSTOMER function
export const addcustomer = ({value,token}) => async (dispatch) => {
  //console.log("add user action", value,token);
  dispatch(addUserRequestAction());
  try {
    return  await axios
      .post(`${url2}/customer/register`,value,{
        headers: {
          'Authorization':`Bearer ${token}`,
        }
      })
      
  } catch (error) {
    dispatch(addUserFailureAction(error.message));
  }
};

//get All customer details

export const getcustomersDetails = ({token}) => async (dispatch) => {
  //console.log("customer details action", token);
  dispatch(getUserRequestAction());
  try {
      await axios 
    .get(`${url2}/customer/`,
    {
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .then((res)=>{
      if(res.data.err)
      {
        dispatch(getUserFailureAction(res.data.err))
      }
      else
      {

        dispatch(getUserSuccessAction(res.data));
      }
      console.log("action user detials",res.data);
    }).catch((error)=>{
      //console.log(error)
      dispatch(getUserFailureAction(error));
    })
    
  } catch (error) {
    //console.log("error usre action",error)
    dispatch(getUserFailureAction(error));
  }
};

