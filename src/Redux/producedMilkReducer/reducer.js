import * as types from "./actionTypes";

const initialState={
    data:[],
    isproducedmilkAdded:false,
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
        //add producedmilk

        case types.ADD_PRODUCEDMILK_REQUEST:
            return {...state, isLoading:true}
        
        case types.ADD_PRODUCEDMILK_SUCCESS:
            return {...state,isLoading:false, isproducedmilkAdded:true, }
        
        case types.ADD_PRODUCEDMILK_FAILURE:
            return {...state,isError:true, isLoading:false,}
        
        //GET Milk data
        case types.GET_PRODUCEDMILK_REQUEST:
            return {...state, isLoading:true}
        
        case types.GET_PRODUCEDMILK_SUCCESS:
            return {...state,isLoading:false, data:payload}
        
        case types.GET_PRODUCEDMILK_FAILURE:
            return {...state, isLoading:false, isError:true,errorMessage:payload}
        
        
        default:
            return state;
    }
}