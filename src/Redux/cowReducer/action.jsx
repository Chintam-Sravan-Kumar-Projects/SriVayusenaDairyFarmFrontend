//Write the ActionCreator functions here
import axios from "axios";
import * as types from "./actionTypes" ;
import {url2} from "../Api/api"

export const addcowRequestAction = () => {
  return { type: types.COW_USER_REQUEST };
};

export const addcowSuccessAction = (payload) => {
  return { type: types.COW_USER_SUCCESS, payload };
};

export const addcowFailureAction = (payload) => {
  return { type: types.COW_USER_FAILURE,payload };
};


//GET USER DETAILS
export const getcowRequestAction = () => {
  return { type: types.GET_COW_REQUEST };
};

export const getcowSuccessAction = (payload) => {
  return { type: types.GET_COW_SUCCESS, payload };
};

export const getcowFailureAction = (payload) => {
  return { type: types.GET_COW_FAILURE,payload };
};


//=============Functions currying js ==========================================================================


// admin signin function


//add Cow function
export const addcow = ({value,token}) => async (dispatch) => {
  dispatch(addcowRequestAction());
  try {
    return  await axios
      .post(`${url2}/cow/register`,value,{
        headers: {
          'Authorization':`Bearer ${token}`,
        }
      })
      
  } catch (error) {
    dispatch(addcowFailureAction(error.message));
  }
};

//get All cow details

export const getcowsDetails = ({token}) => async (dispatch) => {
  dispatch(getcowRequestAction());
  try {
      await axios 
    .get(`${url2}/cow/`,
    {
      headers: {
        'Authorization':`Bearer ${token}`
      }
    })
    .then((res)=>{
      if(res.data.err)
      {
        dispatch(getcowFailureAction(res.data.err))
      }
      else
      {

        dispatch(getcowSuccessAction(res.data));
      }
    }).catch((error)=>{
      dispatch(getcowFailureAction(error));
    })
    
  } catch (error) {
    dispatch(getcowFailureAction(error));
  }
};

