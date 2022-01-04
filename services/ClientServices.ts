import AuthServices from "./AuthServices";

export default class ClientServices extends AuthServices {
    constructor() {
        super('client');
    }
}
