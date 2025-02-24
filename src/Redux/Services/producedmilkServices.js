// storyService.js

import axios from "axios";
import { url2 } from "../Api/api";


const API_URL = `${url2}/producedmilk`;


// Set up axios instance with baseURL
// const axiosInstance = axios.create({
// 	baseURL: API_URL,
// });

// const config = {
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 	},
// };

// get single user producedmilk collection data
export const getproducedmilkData = async (token,value) => {
	try{

		const response = await axios.get(`${API_URL}/${value}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});
	   return response.data;
	}
	catch(err)
	{
	}
};

// Function to add new producedmilk data on cow account by id
export const postproducedmilkData = async (value,token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await axios.post(`${API_URL}/${value.cowId}`, value, config);
		return response.data;
		
	} catch (error) {
	}
};

export const updateproducedmilkEntry = async (id, payload, token) =>{
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await axios.patch(`${API_URL}/${id}`, payload, config);
		return response.data;
		
	} catch (error) {
	}

}

export const deleteproducedmilkEntry = async (id, token) =>{
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};

		const response = await axios.delete(`${API_URL}/${id}`, config);
		return id;
		
	} catch (error) {
		return error;
	}

}





