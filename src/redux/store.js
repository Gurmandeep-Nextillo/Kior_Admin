import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import logoutReducer from "./logoutSlice";
import getCategoryListReducer from "./getCategoryListSlice";
import addCategoryReducer from "./addCategoriesSlice";
import updateCategoryReducer from "./updateCategorySlice";
import getTestListReducer from "./getTestListSlice";
import addTestReducer from "./addTestSlice";
import updateTestReducer from "./updateTestSlice";
import getPackageListReducer from "./getPackageListSlice";
import addPackageReducer from "./addPackageListSlice";
import updatePackageReducer from "./updatePackageSlice";
import uploadFileReducer from "./uploadFileSlice";

const store = configureStore({
    reducer: {
        loginReducer: loginReducer,
        logoutReducer: logoutReducer,
        getCategoryListReducer: getCategoryListReducer,
        addCategoryReducer: addCategoryReducer,
        updateCategoryReducer: updateCategoryReducer,
        getTestListReducer: getTestListReducer,
        addTestReducer: addTestReducer,
        updateTestReducer: updateTestReducer,
        getPackageListReducer: getPackageListReducer,
        addPackageReducer: addPackageReducer,
        updatePackageReducer: updatePackageReducer,
        uploadFileReducer: uploadFileReducer,
    },
});

export default store;