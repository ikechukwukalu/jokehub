import { createSlice } from '@reduxjs/toolkit'

export const initialState = localStorage.getItem("name") === null 
    ? 
{
    name: null,
    email: null,
    auth: false
}
    :
{
    name: localStorage.getItem("name"),
    email: localStorage.getItem("email"),
    auth: true
}

//Create a slice
const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        getUsers: (state, { payload }) => {
            state.name = payload.name;
            state.email = payload.email;
            state.auth = payload.auth;
        },
    },
})

// Generated actions from the slice
export const { getUsers } = usersSlice.actions

// A selector
export const usersSelector = (state) => state.users

// The reducer
export default usersSlice.reducer