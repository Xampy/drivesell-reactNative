
export interface ProductOrderEntityInterface {
    shopId: string,
    country: string,
    provinceOrRegion: string,
    city: string,

    productId: string,

    latitude: string,
    longitude: string,

    userId: string,

    id: string,
    completed: boolean
}

export default class ProductOrderEntity {

    private shopId: string = "";
    private country: string = "";
    private provinceOrRegion: string = "";
    private city: string = "";

    private productId: string = "";

    private latitude: string = "";
    private longitude: string = "";

    private userId: string  = "";

    private id: string = "";
    private completed: boolean = false;

    constructor(){
    }

    public getId() { return this.id; }
    public isCompleted(){return this.completed;}
    public getShopId() { return this.shopId; }
    public getProductId() { return this.productId; }
    public getUserId() { return this.userId; }
    public getCity(){return this.city;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCountry(){return this.country;}
    public getLatitude(){return this.latitude;}
    public getLongitude(){return this.longitude;}

    public setId(value: string) { this.id = value; }
    public setCompleted(value: boolean){this.completed = this.completed;}
    public setShopId(value: string) { this.shopId = value; }
    public setUserId(value: string) { this.userId = value; }
    public setProductId(value: string) { this.productId = value; }
    public setCity(city: string){this.city = "" + city;}
    public setProvinceOrRegion(por: string){this.provinceOrRegion = "" + por;}
    public setCountry(country: string){this.country = "" + country;}
    public setLatitude(lat: string){this.latitude = "" + lat;}
    public setLongitude(long: string){this.longitude = "" + long;}

}