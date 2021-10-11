import ApiFactory from "../../infrastructure/adapter/primary/api/api.factory";
import StorageFactory from "../../infrastructure/adapter/secondary/storage/storage-factory.interface";
import ControllerFactory from "../factory/controller.factory";

export default class AppContainer {
    public apiFactory: ApiFactory;
    public storageFactory: StorageFactory;
    public controllerFactory: ControllerFactory;

    constructor(){
        this.apiFactory = new ApiFactory();
        this.storageFactory = new StorageFactory();

        this.controllerFactory = new ControllerFactory(this.storageFactory, this.apiFactory);
    }
}