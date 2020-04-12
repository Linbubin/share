1.  为什么B能访问到A上的静态方法
```js
class A{
  static getName(){
    return 'static getName'
  }
}
class B extends A{
}
// 为什么B可以访问到A上的静态函数
B.getName()


// 因为getName被挂到A上， A.getName
// B继承A， B.__proto__ = A
// 所以B可以通过原型访问到A上的变量
```

2. 对类的constructor加上protected就不能被实例化，只能被继承，相当于创建一个基类
```js
class A{
  protected constructor(){}
}
```