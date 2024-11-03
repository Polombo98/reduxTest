import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "./apiSlice";
import { RootState } from "../store";

const initialState: UserData = {
	id: 0,
	name: "",
	username: "",
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loggedIn(state, action: PayloadAction<UserData>) {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.username = action.payload.username;
		},
		loggedOut(state) {
			state.id = initialState.id;
			state.name = initialState.name;
			state.username = initialState.username;
		},
	},
});

export const selectAuth = (state: RootState) => state.auth;

export const { loggedIn, loggedOut } = authSlice.actions;

export default authSlice.reducer;
