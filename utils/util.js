
/**
 * 对返回值非 Promise 的函数包装 Promise
 * 
 * @param {Function} func 返回值非 Promise 的函数
 * @returns {Function} 包装 Promise 后的函数
 */
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