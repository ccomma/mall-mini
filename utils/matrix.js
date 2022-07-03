
class Matrix {

    /**
     * 转置矩阵
     * 
     * @param {[[]]} matrix 矩阵，二维数组
     * @returns {[[]]} 转置后的矩阵
     */
    static transpose(matrix) {
        let rowNum = matrix.length;
        let columnNum = matrix[0].length;

        let result = [];
        for (let j = 0; j < columnNum; j++) {
            result[j] = [];
            for (let i = 0; i < rowNum; i++) {
                result[j][i] = matrix[i][j];
            }
        }

        return result;
    }

}

export {
    Matrix
}