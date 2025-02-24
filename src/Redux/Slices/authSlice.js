import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import {
	currentUser,
	loginUser,
	logoutUser,
	registerUser,
} from "../Services/authServices";

export const register = createAsyncThunk(
	"auth/register",
	async (userData, { rejectWithValue }) => {
		try {
			return await registerUser(userData);
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const login = createAsyncThunk(
	"auth/login",
	async (userData, { rejectWithValue }) => {
		try {
			return await loginUser(userData);
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const existingUser = createAsyncThunk(
	"auth/me",
	(token, { rejectWithValue }) => {
		try {
			return currentUser(token);
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const logout = createAsyncThunk(
	"auth/logout",
	async (token, { rejectWithValue }) => {
		try {
			return await logoutUser(token);
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: null,
		token: localStorage.getItem("token") || null,
		loading: false,
		error: null,
	},
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},

	extraReducers: (builder) => {
		builder

			//registration
			.addCase(register.pending, (state) => {
				state.loading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
       
				state.loading = false;
				state.user = action.payload.admin;
				state.token = action.payload.token;
				localStorage.setItem("token", action.payload.token);
        toast.info(`${action.payload.admin.name} , Welcome to Sri Vayusena Dairy Farm`)
				toast.success(action.payload.message || "Registration successful !");
			})
			.addCase(register.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;

				toast.error(action.payload.message || "Registration failed!");
			})

			//login
			.addCase(login.pending, (state) => {
				state.loading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.admin;
				state.token = action.payload.token;
				localStorage.setItem("token", action.payload.token);
				toast.success(action.payload.message?`${action.payload.message}`:`${action.payload.error}` || "Login successful!");
        toast.info(`Welcome back, ${action.payload.admin.name}`)
			})
			.addCase(login.rejected, (state, action) => {
				state.loading = false;
				state.error = true;
				toast.error(`${action.payload?.message} ` || "Login failed!" || `${action.error}`);
			})

			//logout
			.addCase(logout.pending, (state) => {
				state.loading = true;
			})
			.addCase(logout.fulfilled, (state, action) => {
				state.loading = false;
				state.user = null;
				state.token = null;
			})

			.addCase(logout.rejected, (state) => {
				state.loading = false;
				state.error = true;
				toast.info("Logged out fail..!");
			})

			// current user
			.addCase(existingUser.pending, (state) => {
				state.pending = true;
			})

			.addCase(existingUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload.admin;
				toast.success(
					action.payload.message ? action.payload.message : "user auto login"
				);
			})

			.addCase(existingUser.rejected, (state, action) => {
				state.pending = false;
				state.error = action.payload;
				toast.success("Thanks for choosing Sri Vayusena Dairy Farm");
			});
	},
});

export const { setUser } = authSlice.actions;
