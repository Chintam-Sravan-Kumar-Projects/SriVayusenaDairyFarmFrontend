import * as types from "./actionTypes";
// NOTE: DO NOT MODIFY the intial state structure in this file.
const initialState = {
  usersData:[],
  isLoading: false,
  isError: true,
  errorMessage:null,
  isUserAdded:false,
  response:null,
};

export const reducer = (state = initialState, action) => {
  const {type,payload}=action;
  

  switch(type)
  {
    //add CUSTOMER user
    case types.CUSTOMER_USER_REQUEST:
      return {...state, isLoading:true,errorMessage:null};
    
    case types.CUSTOMER_USER_SUCCESS:
      return {...state, isLoading:false,isError:false, isUserAdded:payload};
    
    case types.CUSTOMER_USER_FAILURE:
      return {...state, isLoading:false, isError:true, response:payload};

    
    //get user details
    case types.GET_CUSTOMER_REQUEST:
      return {...state, isLoading:true,isError:false, errorMessage:null}
    
      case types.GET_CUSTOMER_SUCCESS:
        return {...state, isLoading:false,isError:false, usersData:payload};
      
      case types.GET_CUSTOMER_FAILURE:
        return {...state, isLoading:false, isError:true,errorMessage:payload};

    default:
      return state;
  }
};


