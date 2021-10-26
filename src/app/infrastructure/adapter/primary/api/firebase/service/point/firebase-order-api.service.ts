import CreateOrderProductFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/order/create-order-product-firebase.request";
import CreateOrderProductFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/order/create-order-product-firebase.response";
import FirebasProductOrderApiServiceInterface from "../../../../../../../domain/port/primary/api/firebase/service/point/firebase-order-api-service.interface";
import '@react-native-firebase/app';
import firebase from "@react-native-firebase/app";
import firestore from '@react-native-firebase/firestore';
import ProductOrderEntity from "../../../../../../../domain/entity/product-order.entity";


export default class FirebaseProductOrderApiService implements FirebasProductOrderApiServiceInterface {


    public create(request: CreateOrderProductFirebaseRequest) {
        console.log(request);

        return new Promise<CreateOrderProductFirebaseResponse>(
            (resolve, reject) => {
                this.handleCreateOrder(
                    request,
                    resolve, reject);
            }
        );
    }


    private handleCreateOrder(request: CreateOrderProductFirebaseRequest,
        resolve: Function, reject: Function) {

        let response: CreateOrderProductFirebaseResponse;

        const path: string = "" + request.getShop().getCountry() + "_" +
            request.getShop().getProvinceOrRegion() + "_" +
            request.getShop().getCity() + "_shops";

        console.log("Firebase create order on a shop Product request\n", request);


        firestore().collection(path).doc(request.getShop().getId())
            .collection("orders").add(
                {
                    productId: request.getProduct().getId(),
                    latitude: request.getOrdererCoords().latitude,
                    longitude: request.getOrdererCoords().longitude,
                    userId: request.getUserId(),
                    completed: false,
                    created: firebase.firestore.Timestamp.now()
                }
            )
            .then(
                (doc) => {
                    console.log("\n\n Shop Product order created");

                    let order = new  ProductOrderEntity();
                    order.setId(doc.id);
                    order.setCompleted(false);
                    order.setShopId(request.getShop().getId());
                    order.setUserId(request.getUserId());
                    order.setProductId(request.getProduct().getId());
                    order.setCity(request.getShop().getCity());
                    order.setProvinceOrRegion(request.getShop().getProvinceOrRegion());
                    order.setCountry(request.getShop().getCountry());
                    order.setLatitude(request.getOrdererCoords().latitude);
                    order.setLongitude(request.getOrdererCoords().longitude);
                    
                    response = new CreateOrderProductFirebaseResponse(
                        order, null
                    );
                    resolve(response);
                }
            ).catch(
                (error) => {
                    reject(error);
                }
            )
    }
}