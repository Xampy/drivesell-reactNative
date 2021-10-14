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
import GetUserShopsFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/get-user-shops-firebase.request";
import GetShopFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/get-shop-firebase.response";
import GetUserShopsFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/get-user-shops-firebase.response";

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


    
    private handleFindByDoc(request: GetShopFirebaseRequest,
        resolve: Function, reject: Function) {
        let response: GetShopFirebaseResponse;

        const path: string = request.getCountry() + "_" +
            request.getProvinceOrRegion() + "_" +
            request.getCity() + "_shops";


        firestore().collection(path).doc(request.getShopDocId())
            .get().then(
                (doc) => {
                    const data = doc.data();
                    if (data != undefined){
                        const d = data as ShopEntity;
                        response = new GetShopFirebaseResponse(d, null);

                        resolve(response);
                    }                        
                    else resolve( new GetShopFirebaseResponse(null, null));
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
                    longitude: request.getShop().getLongitude()
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
                longitude: request.getLongitude()
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