
export default class GetLocalShopsProductsUseCaseRequest {
    private city: string;
    private provinceOrRegion: string;
    private country: string;
    
    private latitude: string;
    private longitude: string;

    constructor(city: string, provinceOrRegion: string, country: string,
        latitude: string, longitude: string,) {

        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;

        this.latitude = latitude;
        this.longitude = longitude;

    }

    
    public getCity(){return this.city;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCountry(){return this.country;}

    public getLatitude(){return this.latitude;}
    public getLongitude(){return this.longitude;}
}