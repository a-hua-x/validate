
import _Method from '../dist/utils/method';

export type Method = _Method;
export type Value = string | number | (string | number)[];
export type Rule = 'required' | 'mobile' | 'email' | 'carNo' | 'idCard' | 'amount' | 'number' | 'chinese' | 'notChinese' | 'english' | 'enAndNo' | 'enOrNo' | 'special' | 'emoji' | 'date' | 'url' | 'same' | 'range' | 'minLength' | 'maxLength' | 'keyword' | 'enAndNoANSpecial';
export type Data = { [key: string]: Value };
export type Validator = { message: string, callBack: (value: Value, method: Method) => boolean };
export type Rules = {
    name: string;
    rule: Rule | Rule[] | (() => Rule | Rule[])
    message: string | string[] | (() => string | string[])
    validator?: Validator | Validator[]
};