import ShopEntity from "../../entity/shop.entity";


export default class GetUserShopsUseCaseResponse {
    private error: Error | null;
    private shops: null | ShopEntity[];

    constructor(shops: ShopEntity[]|null, error: Error|null){
        this.shops = shops
        this.error = error;
    }

    public getError(){return this.error;}
    public getShops(){return this.shops;}
}