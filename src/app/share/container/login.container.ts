import { DEFAULT_USER_FIREBASE_DOC_ID } from "../../infrastructure/adapter/primary/api/firebase/service/point/firebase-user-api.service";



export default class LoginContainer {
    public userId: string;
    public currentCity: string = "";
    public currentProvinceOrRegion: string = "";
    public currentCountry: string = "";

    constructor(){
        this.userId = DEFAULT_USER_FIREBASE_DOC_ID;
    }
}