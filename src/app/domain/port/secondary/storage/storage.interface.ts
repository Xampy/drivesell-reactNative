import { ShopProductEntityInterface } from "../../../entity/product.entity";


export interface StorageShop {
    name: string,
    description: string,
    city: string,
    country: string,
    provinceOrRegion: string,
    id: string | undefined
}

export interface StorageShopProduct extends ShopProductEntityInterface {
}


export const STORAGE_SHOPS_KEY = "shops";
export const STORAGE_SHOPS_PRODUCTS_KEY = "shops_products";

export default interface StorageInterface {
    storage: {shops: StorageShop[], shopsProducts: StorageShopProduct []}
}