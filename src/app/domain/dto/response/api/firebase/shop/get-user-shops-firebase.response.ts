
export default class GetUserShopsFirebaseResponse {
    private error: Error | null;
    private shops: null | string[];

    constructor(shops: string[]|null, error: Error|null){
        this.shops = shops
        this.error = error;
    }

    public getError(){return this.error;}
    public getUserShops(){return this.shops;}

}