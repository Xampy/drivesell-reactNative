import { ADD_USER_SHOP, UserShopActionType, UserShopStateInterface } from "./type";

const initialState: UserShopStateInterface = {
    shops: []
}

export default function userShopReducer(
    state = initialState,
    action: UserShopActionType
): UserShopStateInterface {

    switch(action.type){
        case ADD_USER_SHOP:
            console.log("action " + ADD_USER_SHOP);
            console.log([action.payload, ...state.shops]);
            return {
                shops: [action.payload, ...state.shops]
            };
        default:
            return state;
    }
}