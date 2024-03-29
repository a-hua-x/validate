
import _validate from '../dist/index.js';

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
 * @typedef ShowToastOptions {
 *  title?: string 提示的内容，长度与 icon 取值有关;
    image?: string 自定义图标的本地路径（app端暂不支持gif）;
    mask?: boolean 是否显示透明蒙层，防止触摸穿透，默认：false;
    duration?: number 提示的延迟时间，单位毫秒，默认：1500;
    fail?: () => void 接口调用失败的回调函数;
    success?: () => void 接口调用成功的回调函数;
    complete?: () => void 接口调用结束的回调函数（调用成功、失败都会执行）;
    position?: 'top' | 'center' | 'bottom' 纯文本轻提示显示位置，填写有效值后只有 title 属性生效，且不支持通过 uni.hideToast 隐藏。有效值详见下方说明;
    icon?: 'success' | 'error' | 'fail' | 'exception' | 'loading' | 'none' 图标，有效值详见下方说明，默认：success;
 * }
 * @param { Data } data 校验对象
 * @param { Rules | Rules[] } rules 校验规则
 * @param { [ShowToastOptions] } showToastOptions uniapp文档https://uniapp.dcloud.net.cn/api/ui/prompt.html#showtoast
 * @returns { Promise<void | Error> }
 */
export default async function validate(data, rules, showToastOptions = {}) {
    try {
        await _validate(data, rules);

    } catch (error) {
        uni.showToast({ title: error.message, icon: 'none', ...showToastOptions });
        return Promise.reject(error);
    }
};