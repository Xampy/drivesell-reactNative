export default class GetShopsFirebaseRequest {
    private country: string;
    private provinceOrRegion: string;
    private city: string;

    constructor(country: string, provinceOrRegion: string, city: string) {
        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;
    }

    public getCountry(){return this.country;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCity(){return this.city;}
}