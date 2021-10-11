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
export type UserShopsProductsActionType = AddUserShopProductType; 