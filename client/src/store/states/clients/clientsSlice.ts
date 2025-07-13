import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import initialState from "./initialStates";

const clientSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    selectedClient(state, action: PayloadAction<string>) {
      if (state.selected.find((id: string) => id === action.payload)) return;

      state.selected = [...state.selected, action.payload];
    },
    deselectedClient(state, action: PayloadAction<string>) {
      state.selected = state.selected.filter(
        (id: string) => id !== action.payload
      );
    },
    deselectedAllClient(state) {
      state.selected = [];
    },
  },
});

export const { selectedClient, deselectedClient, deselectedAllClient } =
  clientSlice.actions;

export default clientSlice.reducer;
