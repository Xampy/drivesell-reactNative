import ShopProductEntity from "../../../domain/entity/product.entity";
import ShopEntity from "../../../domain/entity/shop.entity";

export interface UserShopStateInterface {
    shops: ShopEntity[]
}
export const ADD_USER_SHOP = "ADD_USER_SHOP";
interface AddUserShopType {
    type: typeof ADD_USER_SHOP,
    payload: ShopEntity
}

export const UPDATE_USER_SHOP = "UPDATE_USER_SHOP";
interface UpdateUserShopType {
    type: typeof UPDATE_USER_SHOP,
    payload: ShopEntity
}

export type UserShopActionType = AddUserShopType | UpdateUserShopType; 