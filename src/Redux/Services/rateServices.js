 import axios from 'axios';
 import {url2} from '../Api/api';

 const API_URL = `${url2}/rate` ;

 // get Milk rates
 export const getRates = async (token) =>{

    try {
        
        const config ={
            headers : {
                Authorization : `Bearer ${token}`,
            },
        };

        const response = await axios.get(`${API_URL}`, config);
        return response.data

    } catch(error) 
    {
        return error;
    }
 };

 // post milk Rates 

 export const postRates = async (token,newRate) =>{
     
        const config ={
           headers : {
            Authorization : `Bearer ${token}`
           },
        };

        const response = await axios.post(`${API_URL}`, newRate, config);
        return response.data;
        

 }

 // delete milk rate collection
 export const deleteRates = async (token,id) =>{
     
        const config ={
           headers : {
            Authorization : `Bearer ${token}`
           },
        };

        const response = await axios.delete(`${API_URL}/${id}`, config);
        return response.data;
        

 }