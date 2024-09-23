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
import getPackageDetailReducer from "./getPackageDetailSlice";
import getPatientListReducer from "./getPatientListSlice";
import addPatientReducer from "./addPatientSlice";
import updatePatientReducer from "./updatePatientSlice";
import getDoctorListReducer from "./getDoctorListSlice";
import addDoctorReducer from "./addDoctorSlice";
import updateDoctorReducer from "./updateDoctorSlice";

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
        getPackageDetailReducer: getPackageDetailReducer,
        getPatientListReducer: getPatientListReducer,
        addPatientReducer: addPatientReducer,
        updatePatientReducer: updatePatientReducer,
        getDoctorListReducer: getDoctorListReducer,
        addDoctorReducer: addDoctorReducer,
        updateDoctorReducer: updateDoctorReducer,
    },
});

export default store;