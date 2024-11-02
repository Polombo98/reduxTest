import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	id: number;
	name: string;
	username: string;
}

const initialState: UserState = {
	id: 0,
	name: "",
	username: "",
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<UserState>) => {
			state.id = action.payload.id;
			state.name = action.payload.name;
			state.username = action.payload.username;
		},
		logout: (state) => {
			state.id = initialState.id;
			state.name = initialState.name;
			state.username = initialState.username;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
