import { createSlice } from '@reduxjs/toolkit'

export const initialState = {
    base_url: window.location.origin,
    api_url: 'https://v2.jokeapi.dev/joke/',
    blacklist: 'blacklistFlags=nsfw,religious,racist,sexist',
    lang: 'en',
    category: localStorage.getItem("category") === null ? ['Any'] : localStorage.getItem("category").split(","),
    safe: 'safe-mode'
}
//Create a slice
const globalsSlice = createSlice({
    name: 'globals',
    initialState,
    reducers: {
        getCategory: (state, { payload } ) => {
            localStorage.setItem("category", payload.categories);
            state.category = localStorage.getItem("category");
        },
    },
})

// Generated actions from the slice
export const { getCategory } = globalsSlice.actions

// A selector
export const globalsSelector = (state) => state.globals

// The reducer
export default globalsSlice.reducer

// Asynchronous thunk action
export function setCategory() {
    return async (dispatch) => {
        const res = await axios('https://v2.jokeapi.dev/categories');
        const { data, status } = await res;
        if(status === 200 && data.error === false)
            return dispatch(getCategory(data));
    }
    
}