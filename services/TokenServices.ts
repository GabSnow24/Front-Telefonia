import MasterServices from "./MasterServices";

export default class TokenServices extends MasterServices {
    constructor() {
        super('verify-token');
    }
}
