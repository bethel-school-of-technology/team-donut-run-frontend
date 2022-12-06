export class DonutShop {
    donutShopId?: string;
    donutShopName?: string;
    donutShopAddress?: string;
    donutShopWebsite?: string;
    donutShopCityState?: string;
    donutShopPhotoURL?: string;

    constructor(donutShopId?: string, donutShopName?: string, donutShopAddress?: string, donutShopWebsite?: string, donutShopCityState?: string, donutShopPhotoURL?: string) {
        this.donutShopId = donutShopId;
        this.donutShopName = donutShopName;
        this.donutShopAddress = donutShopAddress;
        this.donutShopWebsite = donutShopWebsite;
        this.donutShopCityState = donutShopCityState;
        this.donutShopPhotoURL = donutShopPhotoURL;
    }
}