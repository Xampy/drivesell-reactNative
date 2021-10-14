import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncStorageInterface from "../../../../domain/port/secondary/storage/async-storage.interface";
import { StorageShop, StorageShopProduct, STORAGE_SHOPS_KEY, STORAGE_SHOPS_PRODUCTS_KEY } from "../../../../domain/port/secondary/storage/storage.interface";

export const STORAGE_LATEST_LOCATION_KEY = "STORAGE_LATEST_LOCATION_KEY";

export default class LocalAsyncStorageInterface implements AsyncStorageInterface {

    public storage: { shops: StorageShop[], shopsProducts: StorageShopProduct[] };

    constructor(){

        this.storage = {shops: [], shopsProducts: []};
    }

    public async init() {
        let values;
        try {
            values = await AsyncStorage.multiGet([STORAGE_SHOPS_KEY, STORAGE_SHOPS_PRODUCTS_KEY])
            console.log("[LOCAL STORAGE INIT] sucess");
            console.log(values);

            const shopsData = values.find((item) => item[0] == STORAGE_SHOPS_KEY );
            if(shopsData != undefined && shopsData[1] != null){
                const d = JSON.parse(shopsData[1]) as StorageShop[];
                this.storage.shops.push(...d);
            }

            const shopsProductsData = values.find((item) => item[0] == STORAGE_SHOPS_PRODUCTS_KEY );
            if(shopsProductsData != undefined && shopsProductsData [1] != null){
                const d = JSON.parse(shopsProductsData [1]) as StorageShopProduct[];
                this.storage.shopsProducts.push(...d);
            }//handle other keys

        } catch (error) {
            console.error("[LOCAL STORAGE INIT]" + error)
        }
    }

    public async storeValue(key: string, value: any){
        try {
            await AsyncStorage.setItem(key, value);
            console.log("[LOCAL STORAGE ADD] sucess");
        } catch (error) {
            console.error("[LOCAL STORAGE ADD]" + error)
        }
    }
    public async storeObject(key: string, value: any){
        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            console.log("[LOCAL STORAGE ADD] sucess");
        } catch (error) {
            console.error("[LOCAL STORAGE ADD]" + error)
        }
    }
    public async getValue(key: string){
        try {
            const res = await AsyncStorage.getItem(key);
            console.log("[LOCAL STORAGE GET] sucess");

            return res;
          } catch(error) {
            console.error("[LOCAL STORAGE GET]" + error);
          }
    }
    public async getObject(key: string){
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            console.log("[LOCAL STORAGE GET OBJECT] sucess");

            return jsonValue != null ? JSON.parse(jsonValue) : null;
          } catch(error) {
            console.error("[LOCAL STORAGE GET OBJECT]" + error);
          }
    }
    

    
}