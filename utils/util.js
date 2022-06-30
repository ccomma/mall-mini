
const promisic = function (func) {
    // 对 func 进行包装
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            // 包装参数
            let args = Object.assign(params, {
                success: res => {
                    resolve(res);
                },
                fail: error => {
                    reject(error);
                }
            });
            func(args);
        });
    };
};

export {
    promisic
}