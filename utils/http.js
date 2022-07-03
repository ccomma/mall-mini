import { config } from "../config/config";
import { promisic } from "./util";

class Http {

    /**
     * 发起 http 请求
     * 
     * @param {{string, object, string}} param 
     * @returns 数据
     */
    static async request({ url, data = undefined, method = 'GET' }) {
        let result = await promisic(wx.request)({
            url: `${config.baseUrl}/${url}`,
            method,
            data,
            header: {
                'Content-Type': 'application/json',
            }
        });

        if (!result.data || !result.data.success) {
            // TODO: 异常处理
        }

        return result.data.data;
    }

}

export {
    Http
}