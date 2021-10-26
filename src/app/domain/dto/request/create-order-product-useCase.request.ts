import ShopProductEntity from "../../entity/product.entity";
import ShopEntity from "../../entity/shop.entity";

export default class CreateOrderProductUseCaseRequest {
    private shop: ShopEntity;
    private product: ShopProductEntity;

    private latitude: string = "";
    private longitude: string = "";

    private userId: string = "";

    constructor(shop: ShopEntity, product: ShopProductEntity,
        coords: {latitude: string, longitude: string}, userId: string){
        this.shop = shop;
        this.product = product;
        
        this.latitude = coords.latitude;
        this.longitude = coords.longitude;

        this.userId = userId;
    }

    public getShop(){return this.shop;}
    public getProduct(){return this.product;}
    public getCoords(){ return {latitude: this.latitude, longitude: this.longitude};}
    public getUserId(){return this.userId;}
}