import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";
import ShopEntity from "../../entity/shop.entity";

export default class CreateShopUseCaseResponse {
    private error: Error | null;
    private shop: null | ShopEntity;

    constructor(shop: ShopEntity|null, error: Error|null){
        this.shop = shop
        this.error = error;
    }

    public getError = () => this.error;
    public getShop = () => this.shop;
}