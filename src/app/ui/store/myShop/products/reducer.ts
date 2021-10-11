import { ADD_USER_SHOP_PRODUCT, UserShopsProductsActionType, UserShopsProductsStateInterface } from "./type";

const initialState: UserShopsProductsStateInterface = {
    shopsProducts: []
}

export default function userShopsProductsReducer(
    state = initialState,
    action: UserShopsProductsActionType
): UserShopsProductsStateInterface {

    switch(action.type){
        case ADD_USER_SHOP_PRODUCT:
            console.log("action " + ADD_USER_SHOP_PRODUCT);
            console.log([action.payload, ...state.shopsProducts]);
            return {
                shopsProducts: [action.payload, ...state.shopsProducts]
            };
        default:
            return state;
    }
}