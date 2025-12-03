export class User {
    id: number|undefined;
    name: string|undefined;
    email: string|undefined;
    

    constructor();
    constructor(uid: number, uname: string, uemail: string );

    constructor(uid?: number, uname?: string, uemail?: string ){
        this.email = uemail;
        this.name = uname;
        this.id = uid;
     
    }
}
