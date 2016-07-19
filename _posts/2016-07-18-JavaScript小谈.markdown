---
layout: post
title "《作用域与闭包：this，var，（function（）｛｝）》"
date: 2016-07-19 14:28:20 +0800
---

#《作用域与闭包：this，var，（function(){}）》
@(JavaScript)[block|作用域|this|var]

--------
###知识点
- 理解js中var的作用域
- 了解闭包的概念
- 理解this的指向 

-------
###内容

```
var parent = function(){
	var name = "HelloWorld";
	var age = 25;
	var child = function(){
		var name = "Qianqian";
		var childAge = 2;
		console.log(name,age,childAge);
	};
	child();
	
	
	console.log(name,age,childAge);
	//will throw error: childAge is not defined
};
parent();
```
直觉地，内部函数可以访问外部函数的变量，外部函数不能访问内部函数的变量。上面的例子中内部函数child可以访问变量age，而外部函数不能访问child中childAge，因此会抛出定义变量的异常。

**but，importantly** 如果没有关键字`` var ``,那么变量就被声明为全局变量了。

```
function foo(){
	value = "hello";
}
foo();
console.log(value);// hello
console.log(global.value);// hello
```
这个例子可以很正常输出``hello`` ,  是因为　``value``变量在定义是没有使用关键字``` var ```，所以被定义成了全局变量。在NodeJS中，全局变量会被定义在``global``对象下，在浏览器中全局变量会被定义在``window``对象下。

如果你确实要定义一个全局变量的话，请显示地定义``global`` or ``window``对象下。

这类不小心定义全局变量的问题可以被jshint检测出来，如果你用用sublime或这VSCode编辑器话，记得装上相应的插件。

JavaScript中，变量的局部作用域是函数级别的。不同域C语言，在C语言中，作用域是块级别的。JavaScript中没有块级作用域。

JavaScript，函数中声明的变量在整个函数中都有定义。比如如下代码段，变量 i 和 value 虽然是在 for 循环代码块中被定义，但在代码块外仍可以访问 i 和 value。

```
function foo(){
	for(var i = 0; i < 10; i++){
		var value = "helloWorld";
	}
	console.log(i); //输出10
	console.log(value);//输出hello world
}
foo();
```
所以有种说法：应该提前声明函数中需要的变量，
即，在函数体的顶部声明可能用到的变量，这样可以避免出现一些奇奇怪怪的bug。

---
###闭包

闭包这个概念，在函数式编程里很常见，简单说，就是使用内部函数可以访问定义在外部函数中的变量。
假如我们要实现一些列函数，add10，add20，它们的定义是 ``int add10(int n)`` 。

为此为我们构造里一个名为``adder``的构造器，如下：
```
var adder = function(x){
	var base = x;
	return function(n){
		return n + base;
	}
}

var add10 = adder(10);
console.log(add10(5));//15
var add20 = adder(20);
console.log(add20(5));//25
```
每次调用adder时，adder都会返回一个函数给我们。我们传给adder的值，会保存一个名为``base``的变量中。由于返回的函数在其中引用里base的值，于是base的引用计数被＋1。当返回函数不被垃圾回收，则base也会一直存在。

如果想深入理解这块，可以看看这篇 http://coolshell.cn/articles/6731.html

- 闭包的一个坑
```
for(var i = 0; i < 5; i++){
	setTimeout(function(){
		console.log(i);
	},5);
}//5 5 5 5 5
```
上面这个代码块会打印5个 ``5``,而我们预想的结果是``0 1 2 3 4 5``
之所以这样，是因为``setTimeout``中的``i``是对外层``i``的引用。当``setTimeout``的代码被解释时候，运行时只是记录里``i``的引用，而不是值。而当``setTimeout``被触发时，五个``setTime``中的``i``同时被取值，由于它们都指向了外层的同一个i，而那个为了得到我们预想的结果，我们可以把赋值成一个局部临时变量，从而摆脱外出迭代的影响。

```
for(var i = 0; i < 5; i++){
  (function(idx) {
    setTimeout(function(){
      console.log(idx);
    }, 5);
  })(i);
}
```

---
###this

在函数执行时，``this``总是指向调用该函数的对象。要判断``this``的指向，其实是判断``this``所在的函数属于谁。

this出现的场景分为四类，简单说就是：
- 有对象就指向调用对象
- 没有调用对象就指向全局对象
- 用new构造就指向新对象
- 通过apply或call或bind来改变this的指向

1）函数有所属对象时：指向所属对象
函数有所属对象时，通常通过``.``表达式调用。这时，``this``自然指向所属对象。比如下面这个例子：
```
var myObjcet = {value:100};
moObject.getValue = function(){
	console.log(this.value); //100
	console.log(this);// {value:100,getValue:[Function]}
	return this.value;
}

console.log(myObjcet.getValue()); //=>100
```
``getValue()``属于对象``myObject``, 并由``myObject``进行``.``,因此``this``指向对象``myObjcet``。

2）函数没有所属对象：指向全局对象
```
var myObject = {value: 100};
myObject.getValue = function(){
	var foo = function(){
		console.log(this.value);// undefined
		console.log(this); //global
	}
	foo();
	return this.value;
};

console.log(myObject.getValue()); //100
```
在上述代码中，``foo``函数虽然定义在``getValue``的函数体内，但实际既不属于``getValue``也不属于``myObject``。``foo``并没有被绑定在任何对象上，所以当调用时，它的``this``指针指向了全局对象``global``。

> 据说这个是设计的错误

3）构造器中的``this``:指向新的对象
js中，我们通过``new``关键字来调用构造函数，此时``this``会帮顶在该新对象上。
```
var SomeClass = function(){
	this.value = 100;
}
var myCreate = new SomeClass();

console.log(myCreate.value);
```

> **By the way** 
> 在js中，构造函数，普通函数，对象方法，闭包，这四这没有明确的界限。
> 界限在你我心中。

4）apply和call调用以及bind绑定：指向绑定的对象
- `apply()` 方法接受两个参数
	-  第一个是函数运行时的作用域
	-  第二个是一个参数数组（arguments）
- `call()`方法
	- 第一参数的意义与`apply()`方法相同
	- 其他参数一一列举

简单说，``call``的方式更接近平时使用的函数，而``apply``需要我们传递``Array``形式的数组给它。它们可以相互转换的。
```
var myObject = {value:100};
var foo = function(){
	console.log(this);
}

foo();//global
foo.apply(myObject); //{value:100}
foo.call(myObject); //{value:100}
var newFoo = foo.bind(myObject);
newFoo();  //{value:100}

```	 
	 
	 
---