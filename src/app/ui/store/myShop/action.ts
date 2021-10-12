import ShopEntity from "../../../domain/entity/shop.entity";
import { ADD_USER_SHOP, UPDATE_USER_SHOP, UserShopActionType } from "./type";

export function addUserShop(shop: ShopEntity): UserShopActionType {
    return {
        type: ADD_USER_SHOP,
        payload: shop
    }
}

export function updateUserShop(shop: ShopEntity): UserShopActionType {
    return {
        type: UPDATE_USER_SHOP,
        payload: shop
    }
}