export default class CreateShopUseCaseRequest {
    private name: string;
    private description: string;
    private city: string;
    private provinceOrRegion: string;
    private country: string;
    private latitude: string;
    private longitude: string;

    private userId: string;

    constructor(name: string, description: string, city: string,
        provinceOrRegion: string,
        country: string,
        latitude: string,
        longitude: string,
        
        userId: string) {

        this.name = name;
        this.description = description;
        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;

        this.latitude = latitude;
        this.longitude = longitude;

        this.userId = userId;
    }

    public getName(){return this.name;}
    public getUserId(){return this.userId;}
    public getDescription(){return this.description;}
    public getCity(){return this.city;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCountry(){return this.country;}
    public getLatitude(){return this.latitude;}
    public getLongitude(){return this.longitude;}
}