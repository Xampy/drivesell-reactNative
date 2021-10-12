import { ADD_USER_SHOP, UPDATE_USER_SHOP, UserShopActionType, UserShopStateInterface } from "./type";

const initialState: UserShopStateInterface = {
    shops: []
}

export default function userShopReducer(
    state = initialState,
    action: UserShopActionType
): UserShopStateInterface {

    switch (action.type) {
        case ADD_USER_SHOP:
            console.log("action " + ADD_USER_SHOP);
            console.log([action.payload, ...state.shops]);
            return {
                shops: [action.payload, ...state.shops]
            };
        case UPDATE_USER_SHOP:
            console.log("action " + UPDATE_USER_SHOP);

            let res = state.shops.map(
                (s) => {
                    if(s.getId() == action.payload.getId())
                        return action.payload;
                    return s;
                }
            )
            return {
                shops: [...res]
            };
        default:
            return state;
    }
}