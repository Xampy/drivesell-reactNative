import ProductOrderEntity from "../../../../../entity/product-order.entity";

export default class CreateOrderProductFirebaseResponse {
    private error: Error | null;
    private order: ProductOrderEntity | null;

    constructor(order: ProductOrderEntity | null, error: Error | null){
        this.error = error;
        this.order = null;
    }

    public getOrder(){return this.order}
    public getError(){return this.error;}
}