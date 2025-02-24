import * as types from "./actionTypes";
// NOTE: DO NOT MODIFY the intial state structure in this file.
const initialState = {
  cowsData:[],
  isLoading: false,
  isError: true,
  errorMessage:null,
  iscowAdded:false,
  response:null,
};

export const reducer = (state = initialState, action) => {
  const {type,payload}=action;
  

  switch(type)
  {
    //add Cow user
    case types.COW_USER_REQUEST:
      return {...state, isLoading:true,errorMessage:null};
    
    case types.COW_USER_SUCCESS:
      return {...state, isLoading:false,isError:false, iscowAdded:payload};
    
    case types.COW_USER_FAILURE:
      return {...state, isLoading:false, isError:true, response:payload};

    
    //get cows details
    case types.GET_COW_REQUEST:
      return {...state, isLoading:true,isError:false, errorMessage:null}
    
      case types.GET_COW_SUCCESS:
        return {...state, isLoading:false,isError:false, cowsData:payload};
      
      case types.GET_COW_FAILURE:
        return {...state, isLoading:false, isError:true,errorMessage:payload};

    default:
      return state;
  }
};


