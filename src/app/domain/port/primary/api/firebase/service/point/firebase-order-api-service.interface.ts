import CreateOrderProductFirebaseRequest from "../../../../../../dto/request/api/firebase/order/create-order-product-firebase.request"
import CreateOrderProductFirebaseResponse from "../../../../../../dto/response/api/firebase/order/create-order-product-firebase.response"

export default interface FirebasProductOrderApiServiceInterface {
    create: (request: CreateOrderProductFirebaseRequest) => Promise<CreateOrderProductFirebaseResponse>
}