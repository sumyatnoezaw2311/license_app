import { configureStore } from "@reduxjs/toolkit";
//auth
import LoginReducer from "../features/Auth/loginSlice";
import RefreshTokenReducer from "../features/Auth/refreshTokenSlice";
import ForgotPasswordReducer from "../features/Auth/forgotPasswordSlice";
import VerifyTokenReducer from "../features/Auth/verifyTokenSlice";
import ResetPasswordReducer from "../features/Auth/resetPasswordSlice";

//licenses
import LicensesReducer from "../features/licenses/licensesSlice";
import GetSingleLicenseReducer from "../features/licenses/getSingleLicenseSlice";
import UpdateLicReducer from "../features/licenses/updateLicenseSlice";

//items
import ItemsSlice from "../features/licenses/items/itemsSlice";

//settings
import AllSettingReducer from "../features/settings/allSettingSlice";

//taxs
import TaxReducer from "../features/Transactions/taxsSlice";
import SingleTaxReducer from "../features/Transactions/singleTaxSlice";


const store = configureStore({
  reducer:{
    login: LoginReducer,
    forgotPassword: ForgotPasswordReducer,
    verifyToken: VerifyTokenReducer,
    resetPassword: ResetPasswordReducer,
    allLicenses: LicensesReducer,
    singleLicense: GetSingleLicenseReducer,
    updateLic : UpdateLicReducer,
    items: ItemsSlice,
    refreshedToken: RefreshTokenReducer,
    allSettings: AllSettingReducer,
    taxs: TaxReducer,
    tax: SingleTaxReducer
  }
});


export default store;