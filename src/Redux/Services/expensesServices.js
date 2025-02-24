// storyService.js

import axios from "axios";
import { url2 } from "../Api/api";


const API_URL = `${url2}/expense`;


// Set up axios instance with baseURL
// const axiosInstance = axios.create({
// 	baseURL: API_URL,
// });

// const config = {
// 	headers: {
// 		Authorization: `Bearer ${token}`,
// 	},
// };

// get single user milk collection data
export const getexpenseData = async (token,value) => {
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

// Function to add new milk data on customer account by id
export const postexpenseData = async (value,token) => {
	try {
		const config = {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		};
		const response = await axios.post(`${API_URL}/${"abcd"}`, value, config);
		return response.data;
		
	} catch (error) {
	}
};

export const updateexpenseEntry = async (id,payload, token) =>{
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

export const deleteexpenseEntry = async ( id,token) =>{
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





