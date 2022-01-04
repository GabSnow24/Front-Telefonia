import axios from 'axios'
import {Method} from 'axios'
import {serverConnectionConfigProduction} from '../config/server-connection.config'

export default class ApiServices {
    private telefonia_api_url:string
    constructor() {
        this.telefonia_api_url = serverConnectionConfigProduction.api_url
    }
    public RequestData = (HTTPMethod: Method , endpoint: string, data:any = '',payload: any = '', token:any = false) => {
        let url = `${this.telefonia_api_url}/${endpoint}`;
        if(payload !== '') url = `${url}/${payload}`;
        return new Promise((resolve, reject) =>
            axios({
                method: HTTPMethod,
                headers: {
                    authorization: `Bearer ${token}`
                },
                url,
                data
            }).then((response) => resolve(response.data)).catch((err: any) => reject(err?.response?.data))
        )
    }
}
