
export default class DeleteShopProductUseCaseResponse {
    private error: Error | null;

    constructor(error: Error|null){
        this.error = error;
    }

    public getError(){return this.error;}
}