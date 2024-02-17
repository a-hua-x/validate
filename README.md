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
