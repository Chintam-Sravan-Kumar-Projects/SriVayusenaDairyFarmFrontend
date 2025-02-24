//Write the ActionCreator functions here
import axios from "axios";
import * as types from "./actionTypes";
import { url, url2,localhost } from "../Api/api";

export const signinRequestAction = () => {
  return { type: types.USER_SIGNIN_REQUEST };
};

export const signinSuccessAction = (payload) => {
  return { type: types.USER_SIGNIN_SUCCESS, payload };
};

export const signinFailureAction = () => {
  return { type: types.USER_SIGNIN_FAILURE };
};

// SignUp
export const signupRequestAction = () => {
  return { type: types.USER_SIGNUP_REQUEST };
};

export const signupSuccessAction = (payload) => {
  return { type: types.USER_SIGNUP_SUCCESS, payload };
};

export const signupFailureAction = (payload) => {
  return { type: types.USER_SIGNUP_FAILURE ,payload};
};


// send message
export const sendMessageSuccessAction = (payload) => {
  return { type: types.USER_MESSAGE_SUCCESS, payload };
};

export const sendMessageFailureAction = () => {
  return { type: types.USER_MESSAGE_FAILURE };
};


//loginout 
export const logoutRequestAction = () => {
  return { type: types.USER_LOGOUT_REQUEST, };
};
export const logoutSuccessAction = () => {
  return { type: types.USER_LOGOUT_SUCCESS, };
};

export const logoutFailureAction = (payload) => {
  return { type: types.USER_LOGOUT_FAILURE, payload};
};


// current user

export const getCurrentUserRequestAction =() =>{
  return {type: types.CURRENT_USER_REQUEST};
}

export const getCurrentUserSuccessAction =(payload) =>{
  return {type: types.CURRENT_USER_SUCCESS,payload};
}

export const getCurrentUserFailureAction =() =>{
  return {type: types.CURRENT_USER_FAILURE};
}

//=============Functions currying js ==========================================================================
 

// admin login function
export const signin = (payload) => async (dispatch) => {
  dispatch(signinRequestAction());
  return await axios
    .post(`${url2}/admin/login`, payload)
    
};

//admin register function
export const signup = (payload) => async (dispatch) => {
  dispatch(signupRequestAction());
  try {
    return await axios
      .post(`${url2}/admin/register`, payload)
      .then((res) => {
        dispatch(signupSuccessAction(res));
      })
      
  }catch (error) {
    dispatch(signupFailureAction(error));
  }
};


// get current user

export const currentUser =(token) =>async(dispatch) =>{
  
  dispatch(getCurrentUserRequestAction())
  try {
     let res=await axios.get(`${url2}/admin/me`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      dispatch(getCurrentUserSuccessAction(res.data))
  } catch (error) {
    dispatch(getCurrentUserFailureAction())
  }
}




// logout current user

export const logout =() =>async (dispatch) =>{
  dispatch(logoutRequestAction())
  try {
    setTimeout(()=>{
      localhost.setTimeout("token",null);
      dispatch(logoutSuccessAction())
    },1000)
    
  } catch (error) {
    dispatch(logoutFailureAction(error))
  }
}

// send message
export const sendMail = (payload) => async (dispatch) => {
  dispatch(signinRequestAction());
  try {
    return await axios
      .post(`${url2}/admin/message`, payload)
      
  } catch (error) {
    dispatch(sendMessageFailureAction(error));
  }
};





