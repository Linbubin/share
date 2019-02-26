# visibility 和 display的区别
visibility: hidden 虽然用户看不到,但是位置还是会被占用<br>
display: none 用户看不到,而且不占用位置<br>
但是不管是哪个css,react中依然会执行DidMount等生命周期函数,所以如果为了节约性能,在react中应该直接不加载组件,而不是用 display或visibility来将其隐藏.