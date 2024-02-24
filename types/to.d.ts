
/** 转换 */
type TO = {
    /**
         * @description 转换为字符串
         * @param { unknown } value
         * @return { string }
         */
    string: (value: unknown) => string;

    /**
     * @description 转换为数字
     * @param { unknown } value
     * @return { number }
     */
    number: (value: unknown) => number;
};

export = TO;