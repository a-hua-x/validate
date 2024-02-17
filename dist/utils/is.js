
/** 是否 */
const IS = {
    /**
     * @description 是否空数组
     * @param { unknown } value
     */
    emptyArray: function (value) {
        return Array.isArray(value) && value.length <= 0
    }
}

export default IS