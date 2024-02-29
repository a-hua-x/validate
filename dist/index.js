
import METHOD from './utils/method.js';

const method = { ...METHOD };
delete method.trueValidateCodeBy18IdCard;
delete method.validityBrithBy18IdCard;
delete method.validityBrithBy15IdCard;

/**
 * @description 验证 
 * @typedef Data { [key: string]: Value } 校验对象
 * @type { { [key: string]: Value } }
 * @typedef Value { string | number | (string | number)[] } 校验值
 * @type { string | number | (string | number)[] }
 * @typedef Rules {
 *  name: string 字段名;
 *  rule: Rule | Rule[] | (() => Rule | Rule[]) 校验规则;
 *  message: string | string[] | (() => string | string[]) 错误提示;
 *  validator?: Validator | Validator[] 自定义校验方法;
 * }
 * @type { { name: string, rule: Rule | Rule[] | (() => Rule | Rule[]), message: string | string[] | (() => string | string[]), validator?: Validator | Validator[] } }
 * @typedef Rule {
 *  url 地址;
 *  date 日期;
 *  email 邮箱;
 *  amount 金额;
 *  number数字;
 *  emoji表情符;
 *  carNo 车牌号;
 *  english 英文;
 *  chinese 中文;
 *  mobile 手机号;
 *  required 必填;
 *  idCard 身份证;
 *  keyword 关键字;
 *  special 特殊字符;
 *  enOrNo 英文或数字;
 *  notChinese 非中文;
 *  enAndNo 英文和数字;
 *  same 与某个字段相同;
 *  range 在某个范围内;
 *  minLength 最小长度;
 *  maxLength 最大长度;
 *  enAndNoANSpecial 是否两种或以上的数字/小写字母/大写字母/其他特殊符号的组合;
 * }
 * @type { 'required' | 'mobile' | 'email' | 'carNo' | 'idCard' | 'amount' | 'number' | 'chinese' | 'notChinese' | 'english' | 'enAndNo' | 'enOrNo' | 'special' | 'emoji' | 'date' | 'url' | 'same' | 'range' | 'minLength' | 'maxLength' | 'keyword' | 'enAndNoANSpecial' }
 * @typedef Validator {
 *  message: string 错误提示;
 *  callBack: (value, method) => boolean 自定义校验方法;
 *  method：{ 
 *   url: (value: string) => boolean 是否url;
 *   date: (value: string) => boolean 是否日期;
 *   email: (value: unknown) => boolean 是否邮箱;
 *   carNo: (value: string) => boolean 是否车牌号;
 *   emoji: (value: string) => boolean 是否表情符;
 *   chinese: (value: string) => boolean 是否中文;
 *   english: (value: string) => boolean 是否英文;
 *   special: (value: string) => boolean 是否特殊字符;
 *   nullOrEmpty: (value: unknown) => boolean 是否为空;
 *   amount: (value: string | number) => boolean 是否金额;
 *   number: (value: string | number) => boolean 是否数字;
 *   idCard: (value: string | number) => boolean 是否身份证;
 *   mobile: (value: string | number) => boolean 是否手机号;
 *   enAndNo: (value: string) => boolean 是否6~32位数字和字母组合;
 *   keyword: (value: string, keywords: string) => boolean 是否关键字;
 *   notChinese: (value: string) => boolean 是否不包含中文，可以有特殊字符;
 *   same: (value1: unknown, value2: unknown) => boolean 是否与某个字段相同;
 *   range: (value: unknown, range1: unknown, range2: unknown) => boolean 是否在某个范围内;
 *   minLength: (value: (string | number)[], min: string | number) => boolean 是否最小长度;
 *   maxLength: (value: (string | number)[], max: string | number) => boolean 是否最大长度;
 *   enOrNo: (value: unknown, [boolean: boolean = true]是否包含特殊字符) => boolean 是否英文或数字;
 *   enAndNoANSpecial: (value: string) => boolean 是否两种或以上的数字/小写字母/大写字母/其他特殊符号的组合;
 *  }
 * }
 * @type { { message: string, callBack: (value: string | number | [string | number][], method: METHOD) => boolean } }
 * @param { Data } data 校验对象
 * @param { Rules | Rules[] } rules 校验规则
 * @returns { Promise<void | Error> }
 */
function validate(data, rules) {
    return new Promise((resolve, reject) => {
        rules = Array.isArray(rules) ? rules : [rules];
        for (const item of rules) {
            let { name, rule, message, validator } = item;
            const validateValue = data[name];
            rule = typeof rule === 'function' ? rule() : rule;
            rule = Array.isArray(rule) ? rule : [rule];
            message = typeof message === 'function' ? message() : message;
            message = Array.isArray(message) ? message : [message];
            validator = Array.isArray(validator) ? validator : validator ? [validator] : [];
            validator = validator.filter(Boolean);
            if (!name) continue;

            for (let index = 0; index < rule.length; index++) {
                let ruleItem = rule[index];
                const _message = message[index];
                if (!_message || !ruleItem) continue;
                let value = '';

                if (ruleItem.includes(":")) {
                    const temp = ruleItem.split(":");
                    ruleItem = temp[0];
                    value = temp[1];
                }

                let error = false
                switch (ruleItem) {
                    case 'required': {
                        error = METHOD.nullOrEmpty(validateValue);
                        break;
                    }
                        
                    case 'mobile': {
                        error = !METHOD.mobile(validateValue);
                        break;
                    }
                        
                    case 'email': {
                        error = !METHOD.email(validateValue);
                        break;
                    }
                        
                    case 'carNo': {
                        error = !METHOD.carNo(validateValue);
                        break;
                    }
                        
                    case 'idCard': {
                        error = !METHOD.idCard(validateValue);
                        break;
                    }
                        
                    case 'amount': {
                        error = !METHOD.amount(validateValue);
                        break;
                    }
                        
                    case 'number': {
                        error = !METHOD.number(validateValue);
                        break;
                    }
                        
                    case 'chinese': {
                        error = !METHOD.chinese(validateValue);
                        break;
                    }
                        
                    case 'notChinese': {
                        error = !METHOD.notChinese(validateValue);
                        break;
                    }
                        
                    case 'english': {
                        error = !METHOD.english(validateValue);
                        break;
                    }
                        
                    case 'enAndNo': {
                        error = !METHOD.enAndNo(validateValue);
                        break;
                    }
                        
                    case 'enOrNo': {
                        error = !METHOD.enOrNo(validateValue);
                        break;
                    }
                        
                    case 'special': {
                        error = METHOD.special(validateValue);
                        break;
                    }
                        
                    case 'emoji': {
                        error = METHOD.emoji(validateValue);
                        break;
                    }
                        
                    case 'enAndNoANSpecial': {
                        error = METHOD.enAndNoANSpecial(validateValue);
                        break;
                    }
                        
                    case 'date': {
                        error = !METHOD.date(validateValue);
                        break;
                    }
                        
                    case 'url': {
                        error = !METHOD.url(validateValue);
                        break;
                    }
                        
                    case 'same': {
                        error = !METHOD.same(validateValue, data[value]);
                        break;
                    }
                        
                    case 'range': {
                        let range = null;
                        try {
                            range = JSON.parse(value);
                            if (range.length <= 1) reject(new Error("range值传入有误！"));

                        } catch (e) {
                            reject(new Error("range值传入有误！"));
                        }

                        error = !METHOD.range(validateValue, range[0], range[1]);
                        break;
                    }
                        
                    case 'minLength': {
                        error = !METHOD.minLength(validateValue, value);
                        break;
                    }
                        
                    case 'maxLength': {
                        error = !METHOD.maxLength(validateValue, value);
                        break;
                    }
                        
                    case 'keyword': {
                        error = !METHOD.keyword(validateValue, value);
                        break;
                    }
                        
                    default: {
                        break;
                    }
                }

                if (error) reject(new Error(_message));
            }
            
            for (const item of validator) {
                const { callBack } = item;
                let itemMessage = typeof item.message === 'function' ? item.message() : item.message;
                itemMessage = Array.isArray(itemMessage) ? itemMessage : [itemMessage];
                if (callBack && !callBack(validateValue, method)) reject(new Error(itemMessage));
            }
        };

        resolve();
    });
};

export default validate;