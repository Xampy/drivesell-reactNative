export default class GetShopFirebaseRequest {
    private shopDocId: string;
    private country: string;
    private provinceOrRegion: string;
    private city: string;

    constructor(shopDocId: string, country: string, provinceOrRegion: string, city: string) {
        this.shopDocId = shopDocId;

        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;
    }

    public getShopDocId() { return this.shopDocId; }
    public getCountry(){return this.country;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCity(){return this.city;}
}