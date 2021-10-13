import CreateShopProductFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/product/create-shop-product-firebase.request";
import CreateShopProductFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/product/create-shop-product-firebase.response";
import { FirebaseShopProductApiServiceInterface } from "../../../../../../../domain/port/primary/api/firebase/service/point/firebase-shop-product-api-service.interface";


import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import ShopProductEntity from "../../../../../../../domain/entity/product.entity";
import UpdateShopProductFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/product/update-shop-product-firebase.request";
import UpdateShopProductFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/product/update-shop-product-firebase.response";

export default class FirebaseShopProductApiService implements FirebaseShopProductApiServiceInterface {

    public create(request: CreateShopProductFirebaseRequest) {
        console.log(request);

        return new Promise<CreateShopProductFirebaseResponse>(
            (resolve, reject) => {
                this.handleCreateShopProduct(
                    request,
                    resolve, reject);
            }
        );
    }

    public update(request: UpdateShopProductFirebaseRequest) {
        console.log("\n\nIn firebase update shop product");
        console.log(request);

        return new Promise<UpdateShopProductFirebaseResponse>(
            (resolve, reject) => {
                this.handleUpdateShopProduct(
                    request,
                    resolve, reject);
            }
        );
    }


    private handleUpdateShopProduct(request: UpdateShopProductFirebaseRequest,
        resolve: Function, reject: Function) {

        let response: UpdateShopProductFirebaseResponse;

        const path: string = "" + request.getShop().getCountry() + "_" +
            request.getShop().getProvinceOrRegion() + "_" +
            request.getShop().getCity() + "_shops";

        console.log("Firebase update shop Product request\n", request);


        if (request.getLastShopId() == request.getShop().getId()) {
            firestore().collection(path).doc(request.getShop().getId())
                .collection("products").doc(request.getProduct().getId()).update(
                    {
                        name: request.getProduct().getName(),
                        price: request.getProduct().getPrice(),
                        reduction: request.getProduct().getReduction(),
                        description: request.getProduct().getDescription(),

                        details: request.getProduct().getDetails(),
                        shippings: request.getProduct().getShippings(),

                        mainImage: request.getProduct().getMainImage(),
                        subOneImage: request.getProduct().getSubOneImage(),
                        subTwoImage: request.getProduct().getSubTwoImage(),
                        subThreeImage: request.getProduct().getSubThreeImage(),

                        shopId: request.getProduct().getShopId()
                    }
                ).then(
                    (value) => {
                        console.log("\n Shop Product updated");

                        response = new UpdateShopProductFirebaseResponse(request.getProduct(), null);
                        resolve(response);
                    }
                ).catch(
                    (error) => {
                        reject(error);
                    }
                )
        }else {
            //The product was assigned to a new shop

            //TODO move the product to another place
        }
    }


    private handleCreateShopProduct(request: CreateShopProductFirebaseRequest,
        resolve: Function, reject: Function) {

        let response: CreateShopProductFirebaseResponse;

        const path: string = "" + request.getShop().getCountry() + "_" +
            request.getShop().getProvinceOrRegion() + "_" +
            request.getShop().getCity() + "_shops";

        console.log("Firebase create dhop Product request\n", request);

        firestore().collection(path).doc(request.getShop().getId())
            .collection("products").add(
                {
                    name: request.getProduct().getName(),
                    price: request.getProduct().getPrice(),
                    reduction: request.getProduct().getReduction(),
                    description: request.getProduct().getDescription(),

                    details: request.getProduct().getDetails(),
                    shippings: request.getProduct().getShippings(),

                    mainImage: request.getProduct().getMainImage(),
                    subOneImage: request.getProduct().getSubOneImage(),
                    subTwoImage: request.getProduct().getSubTwoImage(),
                    subThreeImage: request.getProduct().getSubThreeImage(),

                    shopId: request.getProduct().getShopId()
                }
            ).then(
                (value) => {
                    console.log("\n", value.id);

                    let shopProduct = new ShopProductEntity(
                        request.getProduct().getName(),
                        request.getProduct().getPrice(),
                        request.getProduct().getReduction(),
                        request.getProduct().getDescription()
                    );

                    shopProduct.setId(value.id);
                    shopProduct.setShopId(request.getShop().getId());

                    response = new CreateShopProductFirebaseResponse(shopProduct, null);
                    resolve(response);
                }
            ).catch(
                (error) => {
                    reject(error);
                }
            )
    }
}