hasOwnProperty
delete obj.z

obj111 = Object.create(obj); // obj111的原型指向obj

for in遍历时，会将原型链上的属性也拿到，而且顺序不固定  所以可以用 hasOwnProperty进行二次筛选

获取属性标签权限
Object.getOwnPropertyDescriptor(a, 'x'); // {value: 1, writable: true, enumerable: true, configurable: true}

Object.defineProperty(obj, 'x',{value: 123}); // 如果不声明，则writable  enumerable  configurable 都会为false

configurable 来 delete  get/set方法
writable 来 修改属性的值

in 操作符来判断是否有这个属性或方法， 原型链上也会被查到

// 判断name属性是否可以被枚举
obj.propertyIsEnumerable('name');


```js
// 定义对象属性的get set
Object.defineProperty(obj, "name", {
    get: function(){
        console.log('get');
        return name;
    },
    set: function(newVal){
        console.log('set');
        name = newVal;
    }
})

// 定义对象属性的value enumerable 等属性, 不写出来则为false
Object.defineProperty(obj, "age", {
    value: 23,
    writable: true
})
```

// 父函数中的属性如果有get set方法，函数实例如果没有用defineProperty来重新定义该属性，则会导致赋值失败

```js
// obj的extensible标签
// 不会影响原型链上数据
var obj = {x:1, y:1};
Object.isExtensible(obj); // true   是否可以添加属性
Object.preventExtensions(obj); // 阻止添加属性, 但是原有属性的configruable,writable等属性不变
Object.isExtensible(obj); // false  

Object.seal(obj); // 在 extensible的基础上,讲原有属性的 configurable设置为false
Object.isSealed(obj); // true

Object.freeze(obj); // 在 extensible的基础上,讲原有属性的 configurable和writable设置为false
Object.isFrozen(obj); // true
```

```js
// 自定义序列化
// 某个属性 toJSON方法
var obj = {x:1};
JSON.stringify(obj); // '{"x": 1}'
var obj = {
    x:1,
    y: {
        value: 333,
        toJSON: function(){
            return 1111
        }
    }
}
JSON.stringify(obj); // '{"x":1,"y":1111}'
```



# array
```js
// in 操作符可以用来判断值索引对应的值是否存在
var arr = [1];
'0' in arr; // true
0 in arr; // true
arr[0]; // 1
arr["0"]; // 1
```

for in 可以循环出 index, 但是在拿完自身属性后,还会去原型上拿
arr[arr.length] = 111; // 等价于arr.push

every some reduce reduceRight
// 属性
splice
slice

# function
// 函数声明
function xx(){}

// 函数表达式
var xx = function(){}