import { ADD_USER_SHOP_PRODUCT, DELETE_USER_SHOP_PRODUCT, UPDATE_USER_SHOP_PRODUCT, UserShopsProductsActionType, UserShopsProductsStateInterface } from "./type";

const initialState: UserShopsProductsStateInterface = {
    shopsProducts: []
}

export default function userShopsProductsReducer(
    state = initialState,
    action: UserShopsProductsActionType
): UserShopsProductsStateInterface {

    switch (action.type) {
        case ADD_USER_SHOP_PRODUCT:
            console.log("action " + ADD_USER_SHOP_PRODUCT);
            console.log([action.payload, ...state.shopsProducts]);
            return {
                shopsProducts: [action.payload, ...state.shopsProducts]
            };
        case UPDATE_USER_SHOP_PRODUCT:
            console.log("action " + UPDATE_USER_SHOP_PRODUCT);

            let res = state.shopsProducts.map(
                (p) => {
                    if (p.getId() == action.payload.lastId &&
                        p.getShopId() == action.payload.lastId) {
                        return action.payload.product;
                    }
                    else return p;
                }
            )
            return {
                shopsProducts: [...res]
            };
        case DELETE_USER_SHOP_PRODUCT:
            console.log("action " + DELETE_USER_SHOP_PRODUCT);
            console.log("\n\nBefore delete Redux " + state.shopsProducts.length);

            let r = state.shopsProducts.filter(
                (p) => p.getId() != action.payload.getId()
            )

            console.log("After delete Redux " + r.length);

            return {
                shopsProducts: [...r]
            };
        default:
            return state;
    }
}