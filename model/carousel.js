import { config } from "../config/config";

class carousel {
    static getCarousel(callback) {
        wx.request({
            url: `${config.baseUrl}/carousel/v1/get_carousel_list_by_show`,
            method: 'GET',
            // data: {
            //     names: 't1',
            // },
            header: {
                'Content-Type': 'application/json',
            },
            success: res => {
                if (res.data.success) {
                    callback(res.data.data);
                }
            },
        });
    }
}

export {
    carousel
}