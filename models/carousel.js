import { Http } from "../utils/http";

class Carousel {

    static carouselV1 = `carousel/v1`;

    /**
     * 获取轮播图列表
     * 
     * @returns 轮播图列表
     */
    static async getList() {
        return await Http.request({
            url: `${Carousel.carouselV1}/get_carousel_list_by_show`
        });
    }

}

export {
    Carousel
}