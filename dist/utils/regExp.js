
/** 正则 */
const REGEXP = {
    /**
     * @description 正则[test]方法
     * @param { RegExp } regExp
     * @param { unknown } value
     */
    test: function (regExp, value) {
        value = TO.string(value)
        return regExp.test(value)
    }
};

export default REGEXP;