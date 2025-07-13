import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
  },
});

export const { setUserName } = userSlice.actions;

export default userSlice.reducer;
