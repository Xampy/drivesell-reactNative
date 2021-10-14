import ApiFactory from "../../infrastructure/adapter/primary/api/api.factory";
import StorageFactory from "../../infrastructure/adapter/secondary/storage/storage-factory.interface";
import ControllerFactory from "../factory/controller.factory";
import LoginContainer from "./login.container";

export default class AppContainer {
    public apiFactory: ApiFactory;
    public storageFactory: StorageFactory;
    public controllerFactory: ControllerFactory;

    public loginContainer: LoginContainer;

    constructor(){
        this.apiFactory = new ApiFactory();
        this.storageFactory = new StorageFactory();    
        this.loginContainer = new LoginContainer();

        this.controllerFactory = new ControllerFactory(this.storageFactory, this.apiFactory, this.loginContainer);
    }
}