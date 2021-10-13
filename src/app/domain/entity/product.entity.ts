
export interface ShopProductEntityInterface {
    id: string | undefined,
    name: string | undefined,
    price: number | undefined,
    reduction: number | undefined,
    description: string | undefined,

    details: string[] | undefined,
    shippings: string[] | undefined,

    mainImage: string | null | undefined,
    subOneImage: string | null  | undefined,
    subTwoImage: string | null | undefined,
    subThreeImage: string | null | undefined,

    shopId: string | undefined

}

export default class ShopProductEntity {
    private name: string;
    private price: number;
    private reduction: number;
    private description: string;
    private details: string[];
    private shippings: string[];
    private mainImage: string | null;
    private subOneImage: string | null;
    private subTwoImage: string | null;
    private subThreeImage: string | null;

    private id: string;
    private shopId: string;

    constructor(name: string, price: number, reduction: number, description: string) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.reduction = reduction;

        this.id = "";
        this.shopId = "";

        this.details = [];
        this.shippings = [];
        this.mainImage = null;
        this.subOneImage = null;
        this.subTwoImage = null;
        this.subThreeImage = null;

    }

    public getId() { return this.id; }
    public getShopId() { return this.shopId; }
    public getName() { return this.name; }
    public getPrice() { return this.price; }
    public getReduction() { return this.reduction; }
    public getDescription() { return this.description; }
    public getDetails() { return this.details; }
    public getShippings() { return this.shippings; }
    public getMainImage() { return this.mainImage; }
    public getSubOneImage() { return this.subOneImage; }
    public getSubTwoImage() { return this.subTwoImage; }
    public getSubThreeImage() { return this.subThreeImage; }

    public setId(value: string) { this.id = value; }
    public setShopId(value: string) { this.shopId = value; }
    public setName(value: string) { this.name = value; }
    public setPrice(price: number) { this.price = price; }
    public setReduction(reduction: number) { this.reduction = reduction; }
    public setDescription(desc: string) { this.description = desc; }
    public setDetails(values: string[]) { this.details = values; }
    public setShippings(values: string[]) { this.shippings = values; }
    public setMainImage(url: string) { this.mainImage = url; }
    public setSubOneImage(url: string) { this.subOneImage = url; }
    public setSubTwoImage(url: string) { this.subTwoImage = url; }
    public setSubThreeImage(url: string) { this.subThreeImage = url; }

}