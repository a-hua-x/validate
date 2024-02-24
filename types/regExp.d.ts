
/** 正则 */
type REGEXP = {
    /**
     * @description 正则[test]方法
     * @param { RegExp } regExp
     * @param { unknown } value
     * @return { boolean }
     */
    test: (regExp: RegExp, value: unknown) => boolean;
};

export = REGEXP;