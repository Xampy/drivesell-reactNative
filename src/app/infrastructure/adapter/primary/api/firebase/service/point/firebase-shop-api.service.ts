import CreateShopFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/create-shop-firebase.request";
import { FirebaseShopApiServiceInterface } from "../../../../../../../domain/port/primary/api/firebase/service/point/firebase-shop-api-service.interface";

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import ShopEntity from "../../../../../../../domain/entity/shop.entity";
import CreateShopFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/create-shop-firebase.response";
import UpdateShopFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/update-shop-firebase.request";
import updateShopFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/update-shop-firebase.response";
import UpdateShopFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/update-shop-firebase.response";
import GetShopFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/get-shop-firebase.request";
import GetShopFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/get-shop-firebase.response";
import GetShopProductsFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/get-shop-products-firebase.request";
import GetShopProductsFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/get-shopProducts-firebase.response";
import ShopProductEntity from "../../../../../../../domain/entity/product.entity";
import GetShopsFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/get-shops-firebase.request";
import GetShopsFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/get-shops-firebase.response";

export default class FirebaseShopApiService implements FirebaseShopApiServiceInterface {


    public create(request: CreateShopFirebaseRequest) {
        console.log(request);

        return new Promise<CreateShopFirebaseResponse>(
            (resolve, reject) => {
                this.handleCreateShop(
                    request,
                    resolve, reject);
            }
        );
    }

    public update(request: UpdateShopFirebaseRequest) {
        return new Promise<updateShopFirebaseResponse>(
            (resolve, reject) => {
                this.handleUpdateShop(
                    request,
                    resolve, reject
                );
            }
        );
    };

    public findByDoc(request: GetShopFirebaseRequest) {
        return new Promise<GetShopFirebaseResponse>(
            (resolve, reject) => {
                this.handleFindByDoc(
                    request,
                    resolve, reject)
            }
        );
    }

    public findByLocation(request: GetShopsFirebaseRequest) {
        return new Promise<GetShopsFirebaseResponse>(
            (resolve, reject) => {
                this.handleFindByLocation(request, resolve, reject);
            }
        );
    }

    public getProducts(request: GetShopProductsFirebaseRequest) {
        return new Promise<GetShopProductsFirebaseResponse>(
            (resolve, reject) => {
                this.handleGetProducts(request, resolve, reject);
            }
        );
    }

    private handleGetProducts(request: GetShopProductsFirebaseRequest,
        resolve: Function, reject: Function) {
        let response: GetShopProductsFirebaseResponse;

        const path: string = request.getShop().getCountry() + "_" +
            request.getShop().getProvinceOrRegion() + "_" +
            request.getShop().getCity() + "_shops";


        firestore().collection(path).doc(request.getShop().getId())
            .collection("products").get()
            .then(
                (query) => {
                    console.log(query);

                    const res = query.docs.map(
                        (doc) => {
                            const data = doc.data()
                            const p = new ShopProductEntity(
                                data.name, data.price, data.reduction,
                                data.description
                            );

                            p.setId(doc.id);
                            p.setDetails(data.details);
                            p.setShippings(data.shipping);
                            p.setMainImage(data.MainImage);
                            p.setSubOneImage(data.subOneImage);
                            p.setSubTwoImage(data.subTwoImage);
                            p.setSubThreeImage(data.subThreeImage);

                            p.setShopId(data.shopId);

                            return p;
                        }
                    );

                    response = new GetShopProductsFirebaseResponse(res, null);
                    resolve(response);
                }
            ).catch(
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
    }


    private handleFindByDoc(request: GetShopFirebaseRequest,
        resolve: Function, reject: Function) {
        let response: GetShopFirebaseResponse;

        const path: string = request.getCountry() + "_" +
            request.getProvinceOrRegion() + "_" +
            request.getCity() + "_shops";


        firestore().collection(path).doc(request.getShopDocId())
            .get().then(
                (doc) => {
                    console.log(doc);
                    const data = doc.data();
                    if (data != undefined) {
                        const d = new ShopEntity(
                            data.name, data.description,
                            data.city, data.provinceOrRegion, data.country
                        );

                        d.setId(doc.id);
                        d.setLongitude(data.longitude);
                        d.setLatitude(data.latitude);
                        d.setImageUrl(data.imageUrl);

                        console.log("In firebase shop service get shop by id");
                        console.log(d);


                        response = new GetShopFirebaseResponse(d, null);

                        resolve(response);
                    }
                    else resolve(new GetShopFirebaseResponse(null, null));
                }
            ).catch(
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
    }

    private handleFindByLocation(request: GetShopsFirebaseRequest,
        resolve: Function, reject: Function) {
        let response: GetShopsFirebaseResponse;

        const path: string = request.getCountry() + "_" +
            request.getProvinceOrRegion() + "_" +
            request.getCity() + "_shops";

        console.log(path);


        firestore().collection(path).get().then(
            (querySnapshot) => {
                console.log(querySnapshot);

                const shops: ShopEntity[] = [];

                querySnapshot.forEach(
                    (doc) => {
                        const data = doc.data();
                        if (data != undefined) {
                            const d = new ShopEntity(
                                data.name, data.description,
                                request.getCity(), request.getProvinceOrRegion(), request.getCountry()
                            );

                            d.setId(doc.id);
                            d.setLongitude(data.longitude);
                            d.setLatitude(data.latitude);
                            d.setImageUrl(data.imageUrl);

                            console.log("In firebase shop service get shops");
                            console.log(d);
                            shops.push(d);                           
                        }
                    }
                );

                response = new GetShopsFirebaseResponse(shops, null);
                resolve(response);
            }
        ).catch(
            (error) => {
                console.log(error);
                reject(error);
            }
        );
    }



    private handleUpdateShop = (request: UpdateShopFirebaseRequest,
        resolve: Function, reject: Function) => {

        let response: UpdateShopFirebaseResponse;

        const path: string = request.getShop().getCountry() + "_" +
            request.getShop().getProvinceOrRegion() + "_" +
            request.getShop().getCity() + "_shops";

        //TODO handle when location changed is true

        if (request.getLocationChanged() == false) {
            firestore().collection(path).doc(request.getShop().getId()).update(
                {
                    name: request.getShop().getName(),
                    description: request.getShop().getDescription(),
                    latitude: request.getShop().getLatitude(),
                    longitude: request.getShop().getLongitude(),
                    imageUrl: request.getShop().getImageUrl()
                }
            ).then(
                () => {
                    console.log("\n Update success on firebase",);

                    response = new UpdateShopFirebaseResponse(request.getShop(), null);
                    resolve(response);
                }
            ).catch(
                (error) => {
                    reject(error);
                }
            )
        }


    }

    private handleCreateShop = (request: CreateShopFirebaseRequest,
        resolve: Function, reject: Function) => {

        let response: CreateShopFirebaseResponse;

        const path: string = `${request.getCountry()}_${request.getProvinceOrRegion()}_${request.getCity()}_shops`;
        firestore().collection(path).add(
            {
                name: request.getName(),
                description: request.getDescription(),
                latitude: request.getLatitude(),
                longitude: request.getLongitude(),
                imageUrl: ""
            }
        ).then(
            (value) => {
                console.log("\n", value.id);

                let shop = new ShopEntity(
                    request.getName(),
                    request.getDescription(),
                    request.getCity(),
                    request.getProvinceOrRegion(),
                    request.getCountry()

                )

                shop.setLatitude(request.getLatitude());
                shop.setLongitude(request.getLongitude());

                shop.setId(value.id);

                response = new CreateShopFirebaseResponse(shop, null);
                resolve(response);
            }
        ).catch(
            (error) => {
                reject(error);
            }
        )
    }

}