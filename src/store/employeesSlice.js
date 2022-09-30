import { createSlice } from '@reduxjs/toolkit'

const initialState = []

export const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.push(action.payload)
    },
  },
})

// Action creators are generated for each case reducer function
export const { addEmployee } = employeesSlice.actions

export default employeesSlice.reducer