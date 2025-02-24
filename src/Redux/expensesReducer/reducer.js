import * as types from "./actionTypes";

const initialState={
    data:[],
    isexpenseAdded:false,
    isLoading:false,
    isError:false,
    errorMessage:null,
    status:404,
    response:"Initial"
}
export const reducer =(state=initialState,action)=>{
    const {type, payload} =action;

    switch(type)
    {
        //add milk

        case types.ADD_EXPENSE_REQUEST:
            return {...state, isLoading:true}
        
        case types.ADD_EXPENSE_SUCCESS:
            return {...state,isLoading:false, isexpenseAdded:true, }
        
        case types.ADD_EXPENSE_FAILURE:
            return {...state,isError:true, isLoading:false,}
        
        //GET Milk data
        case types.GET_EXPENSE_REQUEST:
            return {...state, isLoading:true}
        
        case types.GET_EXPENSE_SUCCESS:
            return {...state,isLoading:false, data:payload}
        
        case types.GET_EXPENSE_FAILURE:
            return {...state, isLoading:false, isError:true,errorMessage:payload}
        
        
        default:
            return state;
    }
}