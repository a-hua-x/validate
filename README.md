# validatejs

## Install

```javascript
npm install validatejs --save-dev
```

## Usage

```javascript
import validate from 'validatejs';

const data = { name: '' };

/** rules：支持数组/对象写法 */
const rules = {
    name: 'name',
    rule: 'required' || ['required'] || () => 'required' || ['required'],
    message: '请输入您的姓名哦～' || ['请输入您的姓名哦～'] || () => '请输入您的姓名哦～' || ['请输入您的姓名哦～'],
    validator: [
        {
            message: 'validator：支持数组/对象写法',
            callBack: (value, method) => value || method.nullOrEmpty(value)
        }
    ]
};

try {
    validate(data， rules);
    validate(data， [rules]);

} catch({ message }) {
    console.log(message);
}
```

## Api

```javascript
function validate(data, rules): Promise<void | Error>;
```

### validate.data

| data       |  Object  |
| :----:     | :------  |
| data.key   |  string  |
| data.value | string / number / string[] / number[] |

### validate.rules

|       rules        | Object / Object[] |
|    :--------:      | :---------------- |
|    rules.name      | string            |
|    rules.rule      | [Rule === string] Rule / Rule[] / (() => Rule / Rule[]) |
|        Rule        | required：必填； / mobile：手机号； / email：邮箱； / carNo：车牌号； / idCard：身份证； / amount：金额； / number：数字； / chinese：中文； / notChinese：非中文； / english：英文； / enAndNo：英文和数字； / enOrNo：英文或数字； / special：特殊字符； / emoji：表情符； / date：日期； / url：地址； / same：与某个字段相同； / range：在某个范围内； / minLength：最小长度； / maxLength：最大长度； / keyword：关键字； / enAndNoANSpecial：是否两种或以上的数字/小写字母/大写字母/其他特殊符号的组合； |
|  rules.message     |      string / string[] / (() => string / string[])      |
|  rules.validator   |            Validator ===  Object / Object[]             |
| Validator.message  |      string / string[] / (() => string / string[])      |
| Validator.callBack |               (value, method) => boolean                |

#### Validator.callBack.param.method

|          method         |               Object              |
| :---------------------: | :-------------------------------- |
|       method.url        | (value: string) => boolean 是否url |
|       method.same       | (value1: unknown, value2: unknown) => boolean 是否与某个字段相同 |
|       method.date       | (value: string) => boolean 是否日期 |
|       method.email      | (value: unknown) => boolean 是否邮箱 |
|       method.carNo      | (value: string) => boolean 是否车牌号 |
|       method.emoji      | (value: string) => boolean 是否表情符 |
|       method.range      | (value: unknown, range1: unknown, range2: unknown) => boolean 是否在某个范围内 |
|      method.enOrNo      | (value: unknown, [boolean: boolean = true]是否包含特殊字符) => boolean 是否英文或数字 |
|      method.amount      | (value: string / number) => boolean 是否金额 |
|      method.number      | (value: string / number) => boolean 是否数字 |
|      method.idCard      | (value: string / number) => boolean 是否身份证 |
|      method.mobile      | (value: string / number) => boolean 是否手机号 |
|      method.keyword     | (value: string, keywords: string) => boolean 是否关键字 |
|      method.enAndNo     | (value: string) => boolean 是否 6~32 位数字和字母组合 |
|      method.chinese     | (value: string) => boolean 是否中文 |
|      method.english     | (value: string) => boolean 是否英文 |
|      method.special     | (value: string) => boolean 是否特殊字符 |
|     method.minLength    | (value: (string / number)[], min: string / number) => boolean 是否最小长度 |
|     method.maxLength    | (value: (string / number)[], max: string / number) => boolean 是否最大长度 |
|    method.notChinese    | (value: string) => boolean 是否不包含中文，可以有特殊字符 |
|    method.nullOrEmpty   | (value: unknown) => boolean 是否为空 |
| method.enAndNoANSpecial | (value: string) => boolean 是否两种或以上的数字/小写字母/大写字母/其他特殊符号的组合 |

## example

```javascript
const rules = {
    name: 'name',
    rule: () => 'required',
    rule: () => ['required'],
    message: () => '请输入您的姓名哦～',
    message: () => ['请输入您的姓名哦～'],
};

const rules1 = {
    name: 'name',
    rule: 'required',
    message: '请输入您的姓名哦～',
};

const rules2 = {
    name: 'name',
    rule: 'chinese',
    message: '姓名只支持中文哦～',
};

const rules1An2 = {
    name: 'name',
    rule: ['required', 'chinese'],
    message: ['请输入您的姓名哦～', '姓名只支持中文哦～'],
};

const rules3 = {
    name: 'name',
    rule: 'required',
    message: '请输入您的姓名哦～',
    validator: {
        message: '姓名只支持中文哦～',
        message: ['姓名只支持中文哦～'],
        message: () => '姓名只支持中文哦～',
        message: () => ['姓名只支持中文哦～'],
        callBack: function(value, method) {
            return value
            return !method.nullOrEmpty(value)
        }
    }
};

const rules3 = {
    name: 'name',
    rule: 'required',
    message: '请输入您的姓名哦～',
    validator: [
        {
            message: '姓名只支持中文哦～',
            callBack: function(value, method) {
                return value
                return !method.nullOrEmpty(value)
            }
        }, {
            message: '姓名应在 2~6 个字符之间哦～'
            callBack: value => value?.length >= 2 && value?.length <= 6
        }
    ]
};
```
