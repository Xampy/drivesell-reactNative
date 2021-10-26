import ProductOrderEntity from "../../entity/product-order.entity";

export default class CreateOrderProductUseCaseResponse {
    private error: Error | null;
    private order: null | ProductOrderEntity;

    constructor(order: ProductOrderEntity | null, error: Error|null){
        this.order = order
        this.error = error;
    }

    public getError(){return this.error;}
    public getOrder(){return this.order}
}