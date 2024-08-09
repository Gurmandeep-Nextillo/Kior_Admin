import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import logoutReducer from "./logoutSlice";
import categoriesTableReducer from "./categoriesTableSlice";
import updateCategoryReducer from "./updateCategorySlice";
import getCategoryListReducer from "./getCategoryListSlice";
import getTestListReducer from "./getTestListSlice";

const store = configureStore({
    reducer: {
        loginReducer: loginReducer,
        logoutReducer: logoutReducer,
        categoriesTableReducer: categoriesTableReducer,
        updateCategoryReducer: updateCategoryReducer,
        getCategoryListReducer: getCategoryListReducer,
        getTestListReducer: getTestListReducer,
    },
});

export default store;