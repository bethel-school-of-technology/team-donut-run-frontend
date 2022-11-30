export class DonutShop {
    donutShopId?: string;
    donutShopName?: string;
    donutShopAddress?: string;
    donutShopWebsite?: string;
    donutShopImage?: string;

    constructor(donutShopId?: string, donutShopName?: string, donutShopAddress?: string, donutShopWebsite?: string, donutShopImage?: string) {
        this.donutShopId = donutShopId;
        this.donutShopName = donutShopName;
        this.donutShopAddress = donutShopAddress;
        this.donutShopWebsite = donutShopWebsite;
        this.donutShopImage = donutShopImage;
    }
}