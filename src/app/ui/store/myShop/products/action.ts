import ShopProductEntity from "../../../../domain/entity/product.entity";
import ShopEntity from "../../../../domain/entity/shop.entity";
import { ADD_USER_SHOP_PRODUCT, UPDATE_USER_SHOP_PRODUCT, UserShopsProductsActionType } from "./type";


export function addUserShopProduct(product: ShopProductEntity): UserShopsProductsActionType {
    return {
        type: ADD_USER_SHOP_PRODUCT,
        payload: product
    }
}

export function updateUserShopProduct(product: ShopProductEntity, lastShopId: string, lastId: string): UserShopsProductsActionType {
    return {
        type: UPDATE_USER_SHOP_PRODUCT,
        payload: {product: product, lastShopId: lastShopId, lastId: lastId}
    }
}