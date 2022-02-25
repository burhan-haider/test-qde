import { ADD_ROUTE, REMOVE_ROUTE } from "./routes.types";

const initialState = {
    postRoutes: [
        {name: 'Page One', url: '/page-one'},
    ],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ROUTE:
            return {
                ...state, postRoutes: [...state.postRoutes, action.payload],
            };
        case REMOVE_ROUTE:
            return {
                postRoutes: [
                    ...state.postRoutes.filter(item=>item.name !== action.payload.name)
                ],
            };
        default: return state;
    }
}

export default reducer;