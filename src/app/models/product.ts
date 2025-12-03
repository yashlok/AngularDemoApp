export class Product {

    product_id: number|undefined;
    name: string|undefined;
    brand: string|undefined;
    price: number|undefined;
    active: boolean = false;

    constructor();
    constructor(pid: number, pcode: string, pname: string, price: number);

    constructor(pid?: number, pcode?: string, pname?: string, price?: number){
        this.price = price;
        this.brand = pcode;
        this.product_id = pid;
        this.name = pname;
    }



    // productId: number|undefined;
    // productName: string|undefined;
    // productCode: string|undefined;
    // price: number|undefined;
    // active: boolean = false;

    // constructor();
    // constructor(pid: number, pcode: string, pname: string, price: number);

    // constructor(pid?: number, pcode?: string, pname?: string, price?: number){
    //     this.price = price;
    //     this.productCode = pcode;
    //     this.productId = pid;
    //     this.productName = pname;
    // }
}
