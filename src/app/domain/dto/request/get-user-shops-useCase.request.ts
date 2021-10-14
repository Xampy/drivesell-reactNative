export default class GetUserShopsUseCaseRequest {
    private userId: string;
    private country: string;
    private provinceOrRegion: string;
    private city: string;

    constructor(userId: string, country: string, provinceOrRegion: string, city: string) {

        this.userId = userId;
        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;
    }

    public getUserId(){return this.userId;}
    public getCountry(){return this.country;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCity(){return this.city;}
}