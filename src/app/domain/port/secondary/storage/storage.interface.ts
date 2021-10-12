import { ShopProductEntityInterface } from "../../../entity/product.entity";


export interface StorageShop {
    name: string|undefined,
    description: string|undefined,
    city: string|undefined,
    country: string|undefined,
    provinceOrRegion: string|undefined,
    id: string | undefined
}

export interface StorageShopProduct extends ShopProductEntityInterface {
}


export const STORAGE_SHOPS_KEY = "shops";
export const STORAGE_SHOPS_PRODUCTS_KEY = "shops_products";

export default interface StorageInterface {
    storage: {shops: StorageShop[], shopsProducts: StorageShopProduct []}
}