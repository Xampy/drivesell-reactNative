
export default class DeleteShopProductFirebaseResponse {
    private error: Error | null;

    constructor(error: Error|null){
        this.error = error;
    }

    public getError(){return this.error;}
}