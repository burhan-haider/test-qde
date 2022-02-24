import { createSlice } from "@reduxjs/toolkit";

export const routeSlice = createSlice({
    name: 'route',
    initialState: {
        postRoutes: [
            {name: 'Page One', url: '/page-one'},
        ],
    },
    reducers: {
        add: (state, action) => {
            state.postRoutes = action.payload;
        },
        remove: (state, action) => {
            state.postRoutes = action.payload;
        }
    }
});

export const { add, remove } = routeSlice.actions;

export default routeSlice.reducer