import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  applicants: { applications: [] } // default empty job object
};

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setAllApplicants: (state, action) => {
      state.applicants = action.payload || { applications: [] }; // default fallback
    }
  }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
