export default class CreateShopUseCaseRequest {
    private name: string;
    private description: string;
    private city: string;
    private provinceOrRegion: string;
    private country: string

    constructor(name: string, description: string, city: string,
        provinceOrRegion: string,
        country: string){

        this.name = name;
        this.description = description;
        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;
    }

    public getName = () => this.name;
    public getDescription = () => this.description;
    public getCity = () => this.city;
    public getProvinceOrRegion = () => this.provinceOrRegion;
    public getCountry = () => this.country;
}