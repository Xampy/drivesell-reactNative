import ShopProductEntity from "../../../../../entity/product.entity";
import ShopEntity from "../../../../../entity/shop.entity";

export default class CreateOrderProductFirebaseRequest {
    private shop: ShopEntity;
    private product: ShopProductEntity;
    private userId: string;
    private ordererCoords: { latitude: string, longitude: string };

    constructor(shop: ShopEntity, product: ShopProductEntity, userId: string,
        coords: { latitude: string, longitude: string }) {

        this.shop = shop;
        this.product = product;
        this.userId = userId;
        this.ordererCoords = coords;
    }

    public getShop() { return this.shop; }
    public getProduct() { return this.product; }
    public getUserId() { return this.userId; }
    public getOrdererCoords() { return this.ordererCoords; }
}