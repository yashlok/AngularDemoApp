export class Category {
    categoryId: number|undefined;
    categoryName: string|undefined;
    categoryCode: string|undefined;
    

    constructor();
    constructor(cid: number, ccode: string, cname: string );

    constructor(cid?: number, ccode?: string, cname?: string ){
        this.categoryName = cname;
        this.categoryCode = ccode;
        this.categoryId = cid;
     
    }
}
