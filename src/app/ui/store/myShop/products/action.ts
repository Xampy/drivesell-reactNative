import ShopProductEntity from "../../../../domain/entity/product.entity";
import ShopEntity from "../../../../domain/entity/shop.entity";
import { ADD_USER_SHOP_PRODUCT, UserShopsProductsActionType } from "./type";


export function addUserShopProduct(product: ShopProductEntity): UserShopsProductsActionType {
    return {
        type: ADD_USER_SHOP_PRODUCT,
        payload: product
    }
}