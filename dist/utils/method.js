
import TO from './to.js';
import IS from './is.js';
import REGEXP from './regExp.js';

/** 方法 */
const METHOD = {
	/**
	 * @description 是否空/假值
	 * @param { unknown } value
	 * @returns { boolean }
	 */
	nullOrEmpty: function (value) {
		return (value === null || value === '' || value === undefined || IS.emptyArray(value));
	},
	
	/**
	 * @description 是否手机号
	 * @param { string | number } value
	 * @returns { boolean }
	 */
	mobile: function (value) {
		return REGEXP.test(/^(?:13\d|14\d|15\d|16\d|17\d|18\d|19\d)\d{5}(\d{3}|\*{3})$/, value);
	},
    
	/**
	 * @description 是否邮箱
	 * @param { unknown } value
	 * @returns { boolean }
	 */
	email: function (value) {
		return REGEXP.test(/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, value);
	},
	
	/**
	 * @description 是否车牌
	 * @param { string } value
	 * @returns { boolean }
	 */
	carNo: function (value) {
		/** 新能源车牌 */
		const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
		
		/** 旧车牌 */
		const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
		
		return value.length === 7 ? REGEXP.test(creg, value) : value.length === 8 ? REGEXP.test(xreg, value) : false;
	},
	
	/**
	 * @description 是否身份证
	 * @param { string | number } value
	 * @returns { boolean }
	 */
	idCard: function (value) {
		const idCard = TO.string(value);
		if (idCard.length == 15) return this.validityBrithBy15IdCard(value);
		else if (idCard.length == 18) {
			const arrIdCard = idCard.split("");
			return this.validityBrithBy18IdCard(idCard) && this.trueValidateCodeBy18IdCard(arrIdCard);
		}
        
		return false
	},
	
	/**
	 * @description 是否18位身份证辅助函数
	 * @param { (string | number)[] } value
	 * @returns { boolean }
	 */
	trueValidateCodeBy18IdCard: function (value) {
		let sum = 0;
		const wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1];
		const valideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];
		
		if (TO.string(value[17]).toLowerCase() == 'x') value[17] = 10;
		for (let i = 0; i < 17; i++) sum += wi[i] * TO.number(value[i]);
		const valCodePosition = sum % 11;
		
		return value[17] == valideCode[valCodePosition];
	},
	
	/**
	 * @description 是否18位身份证辅助函数
	 * @param { string } value
	 * @returns { boolean }
	 */
	validityBrithBy18IdCard: function (value) {
		const year = TO.number(value.substring(6, 10));
		const month = value.substring(10, 12);
		const day = value.substring(12, 14);
		const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		return !(temp_date.getFullYear() != parseFloat(String(year)) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day));
	},
	
	/**
	 * @description 是否15位身份证
	 * @param { string } value
	 * @returns { boolean }
	 */
	validityBrithBy15IdCard: function (value) {
		const year = TO.number(value.substring(6, 8));
		const month = value.substring(8, 10);
		const day = value.substring(10, 12);
		const temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		return !(temp_date.getFullYear() != parseFloat(String(year)) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day));
	},
	
	/**
	 * @description 是否金额
	 * @param { string | number } value
	 * @returns { boolean }
	 */
	amount: function (value) {
		return REGEXP.test(/^([0-9]*[.]?[0-9])[0-9]{0,1}$/, value);
	},
	
	/**
	 * @description 是否数字
	 * @param { string | number } value
	 * @returns { boolean }
	 */
	number: function (value) {
		return REGEXP.test(/^[0-9]+$/, value);
	},
	
	/**
	 * @description 是否全部为中文
	 * @param { string } value
	 * @returns { boolean }
	 */
	chinese: function (value) {
		return value !== "" && REGEXP.test(/^[\u4e00-\u9fa5]+$/, value) && !this.special(value) && !this.emoji(value);
	},
	
	/**
	 * @description 是否不包含中文，可以有特殊字符
	 * @param { string } value
	 * @returns { boolean }
	 */
	notChinese: function (value) {
		return !REGEXP.test(/.*[\u4e00-\u9fa5]+.*$/, value);
	},
	
	/**
	 * @description 是否英文
	 * @param { string } value
	 * @returns { boolean }
	 */
	english: function (value) {
		return REGEXP.test(/^[a-zA-Z]*$/, value);
	},
	
	/**
	 * @description 是否6~32位数字和字母组合
	 * @param { string } value
	 * @returns { boolean }
	 */
	enAndNo: function (value) {
		return REGEXP.test(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,32}$/, value);
	},
	
	/**
	 * @description 是否英文或者数字
	 * @param { unknown } value
	 * @param { boolean } boolean 是否包含特殊字符
	 * @returns { boolean }
	 */
	enOrNo: function (value, boolean = true) {
		return !(REGEXP.test(/.*[\u4e00-\u9fa5]+.*$/, value) || (boolean && this.special(value)) || this.email(value));
	},
	
	/**
	 * @description 是否包含特殊字符
	 * @param { string } value
	 * @returns { boolean }
	 */
	special: function (value) {
		return (REGEXP.test(/[`~!@$%^&*()_+<>?:"{},.\/;'[\]]/im, value) || REGEXP.test(/[·！￥（——）：；“”‘、，|《。》？、【】[\]]/im, value));
	},
	
	/**
	 * @description 是否两种或以上的数字/小写字母/大写字母/其他特殊符号的组合
	 * @param { string } value
	 * @returns { boolean }
	 */
	enAndNoANSpecial: function (value) {
		return [REGEXP.test(/\d/, value), REGEXP.test(/[a-zA-Z]/, value), this.special(value)].filter(Boolean).length !== 2;
	},
	
	/**
	 * @description 是否包含表情
	 * @param { string } value
	 * @returns { boolean }
	 */
	emoji: function (value) {
		return REGEXP.test(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, value);
	},
	
	/**
	 * @description 是否时间格式/2019-10-12
	 * @param { string } value
	 * @returns { boolean }
	 */
	date: function (value) {
		return REGEXP.test(/^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/, value);
	},
	
	/**
	 * @description 是否地址
	 * @param { string } value
	 * @returns { boolean }
	 */
	url: function (value) {
		return REGEXP.test(/^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})(:[0-9]{1,5})?((\/?)|(\/[\\\w_!~*\\'()\\\.;?:@&=+$,%-]+)+\/?)$/, value);
	},
	
	/**
	 * @description 是否等于[全等]
	 * @param { unknown } value1
	 * @param { unknown } value2
	 * @returns { boolean }
	 */
	same: function (value1, value2) {
		return value1 === value2;
	},
	
	/**
	 * @description 检查传入的值是否合法
	 * @param { unknown } value 要检查的值
	 * @param { unknown } range1 传入的值1
	 * @param { unknown } range2 传入的值2
	 * @returns { boolean }
	 */
	range: function (value, range1, range2) {
		if ((!range1 && range1 != 0) && (!range2 && range2 != 0)) return true;
		else if (!range1 && range1 != 0) return value <= range2;
		else if (!range2 && range2 != 0) return value >= range1;
		else return value >= range1 && value <= range2;
	},
	
	/**
	 * @description 最小长度
	 * @param { (string | number)[] } value 要检查的值
	 * @param { string | number } min 检查值
	 * @returns { boolean }
	 */
	minLength: function (value, min) {
		return value.length >= TO.number(min);
	},
	
	/**
	 * @description 最大长度
	 * @param { (string | number)[] } value 要检查的值
	 * @param { string | number } max 检查值
	 * @returns { boolean }
	 */
	maxLength: function (value, max) {
		return value.length <= TO.number(max);
	},
	
	/**
	 * @description 是否包含关键词，敏感词，多个以英文逗号分隔，包含则为false,弹出提示语！
	 * @param { string } value 要检查的值
	 * @param { string } keywords 关键字
	 * @returns { boolean }
	 */
	keyword: function (value, keywords) {
		let result = true;
		if (!keywords) return result;
		const key = keywords.split(',');
		
		for (let i = 0, len = key.length; i < len; i++) {
			if (~value.indexOf(key[i])) {
				result = false;
				break;
			}
		}
		
		return result;
	}
};

export default METHOD;