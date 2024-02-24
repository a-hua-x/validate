
/** 转换 */
const TO = {
    /**
         * @description 转换为字符串
         * @param { unknown } value
         */
    string: function (value) {
        return String(value)
    },

    /**
     * @description 转换为数字
     * @param { unknown } value
     */
    number: function (value) {
        return Number(value)
    },
};

export default TO;