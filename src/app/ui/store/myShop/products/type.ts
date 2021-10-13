import ShopProductEntity from "../../../../domain/entity/product.entity";
import ShopEntity from "../../../../domain/entity/shop.entity";


export interface UserShopsProductsStateInterface {
    shopsProducts: ShopProductEntity[]
}

export const ADD_USER_SHOP_PRODUCT = "ADD_USER_SHOP_PRODUCT";
interface AddUserShopProductType {
    type: typeof ADD_USER_SHOP_PRODUCT,
    payload: ShopProductEntity
}

export const UPDATE_USER_SHOP_PRODUCT = "UPDATE_USER_SHOP_PRODUCT";
interface UpdateUserShopProductType {
    type: typeof UPDATE_USER_SHOP_PRODUCT,
    payload: {product: ShopProductEntity, lastShopId: string, lastId: string}
}

export const DELETE_USER_SHOP_PRODUCT = "DELETE_USER_SHOP_PRODUCT";
interface DeleteUserShopProductType {
    type: typeof DELETE_USER_SHOP_PRODUCT,
    payload: ShopProductEntity
}
export type UserShopsProductsActionType = AddUserShopProductType | UpdateUserShopProductType | DeleteUserShopProductType; 