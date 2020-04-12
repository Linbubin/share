# reduce
```js
Array.prototype.myreduce = function(fn, init){
    const isInitHave = typeof init !== 'undefined'
    let result = isInitHave ? init : this[0]

    for(let i= isInitHave ? 0 : 1;i<this.length;i++){
        result = fn(result, this[i])
    }
    return result
}
```