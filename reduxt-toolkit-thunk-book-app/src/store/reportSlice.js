import {createSlice} from '@reduxjs/toolkit';

const reportSlice = createSlice({
  name: 'report',
  initialState: {report: []},
  reducers: {
    addReport: (state, action) => {
      state.report.push(action.payload);
    },
  },
});

export const {addReport} = reportSlice.actions;

export default reportSlice.reducer;
