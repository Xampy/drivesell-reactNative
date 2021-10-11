import  CreateShopFirebaseRequest from "../../../../../../../domain/dto/request/api/firebase/shop/create-shop-firebase.request";
import { FirebaseShopApiServiceInterface } from "../../../../../../../domain/port/primary/api/firebase/service/point/firebase-shop-api-service.interface";

import '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import CreateShopUseCaseResponse from "../../../../../../../domain/dto/response/create-shop-useCase.response";
import ShopEntity from "../../../../../../../domain/entity/shop.entity";
import CreateShopFirebaseResponse from "../../../../../../../domain/dto/response/api/firebase/shop/create-shop-firebase.response";

export default class FirebaseShopApiService implements FirebaseShopApiServiceInterface  {
    
    public create(request: CreateShopFirebaseRequest){
        console.log(request);

        return new Promise<CreateShopFirebaseResponse>(
            (resolve, reject) => {
                this.handleCreateShop(
                    request,
                    resolve, reject);
            }
        );        
    }

    private handleCreateShop = (request: CreateShopFirebaseRequest, 
        resolve: Function, reject: Function) => {
        
        let response: CreateShopFirebaseResponse;
        
        const path: string = `${request.getCountry()}_${request.getProvinceOrRegion()}_${request.getCity()}_shops`;
        firestore().collection(path).add(
            {
                name: request.getName(),
                description: request.getDescription()
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