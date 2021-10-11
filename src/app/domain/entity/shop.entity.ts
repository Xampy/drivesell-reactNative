
export interface ShopEntityInterface {
    name: string,
    description: string,
    country: string,
    provinceOrRegion: string
    city: string,
    id?: string;
}

export default class ShopEntity {
    private name: string;
    private description: string;
    private id: string;
    private country: string;
    private provinceOrRegion: string;
    private city: string;

    constructor(name: string, description: string, city: string,
        provinceOrRegion: string,
        country: string){

        this.name = name;
        this.description = description;
        this.country = country;
        this.provinceOrRegion = provinceOrRegion;
        this.city = city;

        this.id = "";
    }

    public getId(){return this.id;}
    public getName(){return this.name;}
    public getDescription(){return this.description;}
    public getCity(){return this.city;}
    public getProvinceOrRegion(){return this.provinceOrRegion;}
    public getCountry(){return this.country;}

    public setId(id: string){this.id = "" + id;}
    public setName(name: string){
        this.name = name
    }
    public setDescription(desc: string){this.description = "" + desc;}
    public setCity(city: string){this.city = "" + city;}
    public setProvinceOrRegion(por: string){this.provinceOrRegion = "" + por;}
    public setCountry(country: string){this.country = "" + country;}
}