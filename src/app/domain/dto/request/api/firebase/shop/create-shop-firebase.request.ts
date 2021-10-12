export default class CreateShopFirebaseRequest {
    private name: string;
    private description: string;
    private city: string;
    private provinceOrRegion: string;
    private country: string
    private latitude: string;
    private longitude: string;

    constructor(name: string, description: string, city: string,
        provinceOrRegion: string,
        country: string,
        latitude: string,
        longitude: string) {

        this.name = name;
        this.description = description;
        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;

        this.latitude = latitude;
        this.longitude = longitude;
    }

    public getName(){return this.name;}
    public getDescription(){return this.description;}
    public getCity(){return this.city;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCountry(){return this.country;}
    public getLatitude(){return this.latitude;}
    public getLongitude(){return this.longitude;}
}