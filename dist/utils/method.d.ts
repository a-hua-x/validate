
/** 方法 */
type METHOD = {
	/**
	 * @description 是否空/假值
	 * @param { unknown } value
	 * @return { boolean }
	 */
	nullOrEmpty: (value: unknown) => boolean
	
	/**
	 * @description 是否手机号
	 * @param { string | number } value
	 * @return { boolean }
	 */
	mobile: (value: string | number) => boolean
    
	/**
	 * @description 是否邮箱
	 * @param { unknown } value
	 * @return { boolean }
	 */
	email: (value: unknown) => boolean
	
	/**
	 * @description 是否车牌
	 * @param { string } value
	 * @return { boolean }
	 */
	carNo: (value: string) => boolean
	
	/**
	 * @description 是否身份证
	 * @param { string | number } value
	 * @return { boolean }
	 */
	idCard: (value: string | number) => boolean
	
	/**
	 * @description 是否金额
	 * @param { string | number } value
	 * @return { boolean }
	 */
	amount: (value: string | number) => boolean
	
	/**
	 * @description 是否数字
	 * @param { string | number } value
	 * @return { boolean }
	 */
	number: (value: string | number) => boolean
	
	/**
	 * @description 是否全部为中文
	 * @param { string } value
	 * @return { boolean }
	 */
	chinese: (value: string) => boolean
	
	/**
	 * @description 是否不包含中文，可以有特殊字符
	 * @param { string } value
	 * @return { boolean }
	 */
	notChinese: (value: string) => boolean
	
	/**
	 * @description 是否英文
	 * @param { string } value
	 * @return { boolean }
	 */
	english: (value: string) => boolean
	
	/**
	 * @description 是否6~32位数字和字母组合
	 * @param { string } value
	 * @return { boolean }
	 */
	enAndNo: (value: string) => boolean
	
	/**
	 * @description 是否英文或者数字
	 * @param { unknown } value
	 * @param { boolean } boolean 是否包含特殊字符
	 * @return { boolean }
	 */
	enOrNo: (value: unknown, boolean?: boolean) => boolean
	
	/**
	 * @description 是否包含特殊字符
	 * @param { string } value
	 * @return { boolean }
	 */
	special: (value: string) => boolean
	
	/**
	 * @description 是否两种或以上的数字/小写字母/大写字母/其他特殊符号的组合
	 * @param { string } value
	 * @return { boolean }
	 */
	enAndNoANSpecial: (value: string) => boolean
	
	/**
	 * @description 是否包含表情
	 * @param { string } value
	 * @return { boolean }
	 */
	emoji: (value: string) => boolean
	
	/**
	 * @description 是否时间格式/2019-10-12
	 * @param { string } value
	 * @return { boolean }
	 */
	date: (value: string) => boolean
	
	/**
	 * @description 是否地址
	 * @param { string } value
	 * @return { boolean }
	 */
	url: (value: string) => boolean
	
	/**
	 * @description 是否等于[全等]
	 * @param { unknown } value1
	 * @param { unknown } value2
	 * @return { boolean }
	 */
	same: (value1: unknown, value2: unknown) => boolean
	
	/**
	 * @description 检查传入的值是否合法
	 * @param { unknown } value 要检查的值
	 * @param { unknown } range1 传入的值1
	 * @param { unknown } range2 传入的值2
	 * @return { boolean }
	 */
	range: (value: unknown, range1: unknown, range2: unknown) => boolean
	
	/**
	 * @description 最小长度
	 * @param { (string | number)[] } value 要检查的值
	 * @param { string | number } min 检查值
	 * @return { boolean }
	 */
	minLength: (value: (string | number)[], min: string | number) => boolean
	
	/**
	 * @description 最大长度
	 * @param { (string | number)[] } value 要检查的值
	 * @param { string | number } max 检查值
	 * @return { boolean }
	 */
	maxLength: (value: (string | number)[], max: string | number) => boolean
	
	/**
	 * @description 是否包含关键词，敏感词，多个以英文逗号分隔，包含则为false,弹出提示语！
	 * @param { string } value 要检查的值
	 * @param { string } keywords 关键字
	 * @return { boolean }
	 */
	keyword: (value: string, keywords: string) => boolean
};

export = METHOD;