import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allAdminJobs:[],
    singlejob: null,
    searchJobByText:"",
  },
  reducers: {
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSinglejob: (state, action) => {
      state.singlejob = action.payload;
    },
    setSearchJobByText:(state,action) => {
            state.searchJobByText = action.payload;
    },
    setAllAdminJobs:(state,action) => {
            state.allAdminJobs = action.payload;
    },
  },
});

export const { setAllJobs, setSinglejob,setSearchJobByText ,setAllAdminJobs } = jobSlice.actions;
export default jobSlice.reducer;
