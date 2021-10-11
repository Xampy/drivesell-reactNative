import { combineReducers } from "redux";
import userShopsProductsReducer from "./myShop/products/reducer";
import userShopReducer from "./myShop/reducer";

export const rootReducer = combineReducers({
    userShopReducer: userShopReducer,
    userShopsProductsReducer: userShopsProductsReducer
});



export type RootStateType = ReturnType<typeof rootReducer>;
