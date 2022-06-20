import { config } from "../config/config";
import { promisic } from "./util";

class Http {
    /**
     * http request
     * @param {*} param0 
     * @returns 
     */
    static async request({ url, data = undefined, method = 'GET' }) {
        const result = await promisic(wx.request)({
            url: `${config.baseUrl}/${url}`,
            method,
            data,
            header: {
                'Content-Type': 'application/json',
            }
        });

        return result.data;
    }
}

export {
    Http
}