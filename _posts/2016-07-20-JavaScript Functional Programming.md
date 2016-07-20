---
layout: post
title: "JavaScript Functional Programming(I)"
date: 2016-07-20 17:26:20 +0800
author: Yongming
tags:
    - JavaScript
    - functional programming
    
---

##JavaScript 函数式编程(functional programming)


函数式编程诞生已有50年了, 最开始函数式编程仅仅用在学术界, 最古老的函数事语言Lisp。

随着技术的发展, 函数式编程的魅力越来越吸引这开发者。新的函数式语言也曾出不穷,像Erlang, clojure, Scala等等。目前很火的Python、Ruby、Javascript对函数式编程有很强对支持。就连Java,C++这样对语言在Java 8 和C++11 之后也开始假如函数式编程大军中。

也许继"面向对象编程"之后,"函数式编程"会成为下一个编程对主流范式(paradigm)。

这里我不涉及高深的数学知识和高级特性,仅仅就我的了解简单聊聊"函数式"编程。

###定义

简单说，"函数式编程"是一种["编程范式"](https://en.wikipedia.org/wiki/Programming_paradigm)（programming paradigm），也就是如何编写程序的方法论。

举个简(yu)单(chun)的例子。下面程序是一个种群程序,一个种群比如说狍子(一个很傻很天真的动物),狍子群合并则成了各大的狍子群,生小狍子就增加了该种群的数量。
note:这个程序并不是面向对象的良好实践,它只是强调变量赋值方式的一些弊端。

```
var Flock = function(n) {
    this.reoDeer = n;
};

Flock.prototype.conjoin = function(other){
    this.reoDeer += other.reoDeer;
    return this;
}

Flock.prototype.breed = function(other) {
    this.reoDeer = this.reoDeer * other.reoDeer;
    return this;
}

var flock_a = new Flock(4);
var flock_b = new Flock(2);
var flock_c = new Flock(0);

var result = flock_a.conjoin(flock_c).breed(flock_b).conjoin(flock_a.breed(flock_b)).reoDeer;

//=>32

```

我相信没人会写这样糟糕透顶的程序。代码的内部可变状态非常难以追踪，而且，最终的答案还是错的！正确答案是``16``，但是因为``flock_a``在运算过程中永久地改变了，所以得出了错误的结果。这是 IT 部门混乱的表现，非常粗暴的计算方式。
如果你看不懂这个程序，没关系，我也看不懂。重点是状态和可变值非常难以追踪，即便是在这么小的一个程序中也不例外。
我们试试另一种更函数式的写法：

```
var conjoin = function(flock_x, flock_y) { return flock_x + flock_y };
var breed = function(flock_x, flock_y) { return flock_x * flock_y };

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;

var result = conjoin(breed(flock_b, conjoin(flock_a, flock_c)), breed(flock_a, flock_b));
//=>18

```

这次我们得到了正确的答案,而且少写了很多代码。不过嵌套函数让人费解。 这种写法更优雅,不过代码肯定越直白越好,所以我么深入挖掘,看看这段代码究竟做了什么。我们发现,它不过是简单的加``conjoin``和乘``breed``而已。

代码中的两个函数除了函数名有些特殊，其他没有任何难以理解的地方。我们把它们重命名一下，看看它们的真面目。

```
var add = function(x,y) {

    return x+y;
};

var multiply = function(x,y) {

    return x * y;
};

var flock_a = 4;
var flock_b = 2;
var flock_c = 0;
 
var result = add(multiply(flock_b,add(flock_a,flock_c)),multiply(flock_a,flock_b));
```

这么一来，你会发现我们不过是在运用古人早已获得的知识：

```
//结合律(assosiative)
add(add(x,y),z) === add(x,add(y,z))

//同一律(identity)
add(x,0) === x

//交换律(commutative)
add(x,y) === add(y,x)


//分配律(distributive)
multiply(x,add(y,z)) === add(multiply(x,y),xultiply(x,z))


```

是的，这些经典的数学定律迟早会派上用场。我们来看看能否运用这些定律简化这个小程序。

```
var result = add(multiply(flock_b,add(flock_a,flock_c)),multiply(flock_a,flock_b));

// 应用同一律，去掉多余的加法操作（add(flock_a, flock_c) == flock_a）

add(multiply(flock_b, flock_a), multiply(flock_a, flock_b));

//在应用分配律
multiply(flock_b,add(flock_a,flock_a));


```


漂亮！除了调用的函数，一点多余的代码都不需要写。当然这里我们定义``add``和``multiply``是为了代码完整性，实际上并不必要——在调用之前它们肯定已经在某个类库里定义好了。


###函数是一等公民
所谓一等公民,指的是函数与其他数据类型一样,处于平等地位,可以赋值给其他变量,也可以作为参数传入另一个函数,或者作为别的函数的返回值。

举个栗子,下面的print函数是变量,可以作为另一函数的参数:

```
var print = function(i){console.log(i)};

[1,2,3].forEach(print);

```

再或者

```
var hi = function(name) {

    return 'Hi' + name;
}

var greeting = function(name) {

    return hi(name);

}

```

上面的例子就是把函数``hi``当作参数作为``greeting``函数的返回值;

不过,这里``greeting``指向的哪个把``hi``包了一层的包裹函数完全是多余的。为什么呢? 因为JavaScript的函数是可调用的,当``hi``后面紧跟``()``当时候就会运行并返回一个值;如果没有``()``,``hi``就简单地返回存到这个变量里的函数

我们试一下

```
hi;
//function(name){
//
//  return 'Hi' + name;
//
//}


hi("Yongming");

//"Hi Yongming"

```


``greeting``只不过是转个身然后以相同的参数调用了``hi``函数而已,因此可以这么写:

```

var greeting = hi;

greeting("yogming");

```


换句话说, ``hi``已经是个接受一个参数的函数了，为何要再定义一个额外的包裹函数，而它仅仅是用这个相同的参数调用 ``hi``？完全没有道理。这就像在大夏天里穿上你最厚的大衣，只是为了跟热空气过不去，然后吃上个冰棍。真是脱裤子放屁多此一举。
用一个函数把另一个函数包起来，目的仅仅是延迟执行，真的是非常糟糕的编程习惯。（稍后我将告诉你原因，跟可维护性密切相关。）

再看个例子。下面代码都来自``npm``上的模块包

```
//脱裤子放屁嘛
var getServerStuff = function(callback){

    return ajaxCall(function(json){
        return callback(json);
    });
};


//这样才对嘛
var getServerStuff = ajaxCall;

```


世界上到处都充斥着这样的垃圾 ajax 代码。以下是上述两种写法等价的原因：


```
//look here
return ajaxCall(function(json){
    return callback(json);
});

//等价于
return ajaxCall(callback);


//重构 getServerStuff

var getServerStuff = function(callback){
    
    return ajaxCall(callback);

};

//那就等价于
var getServerStuff = ajaxCall;

```


各位，以上才是写函数的正确方式。一会儿再告诉你为何我对此如此执着。


```
    var BlogController = (fucntion(){
        var index = function(posts){
            return Views.index(posts);
        };
        var show = function(post) {
            return Views.show(post);
        };
    
        var create = function(attrs) {
            return Db.create(attrs);
        };
    
        var update = function(post, attrs) {
            return Db.update(post, attrs);
        };
    
        var destroy = function(post) {
            return Db.destroy(post);
        };        
        
        return {index: index, show: show, create: create, update: update, destroy: destroy};
         
    })();
    
    
```


这个控制器(Controller)绝大多数代码是没用的。我们可以重写成这样:


```
    var BlogController = {index:Views.index,show:Views.show,create:Db.create,update:Db.update,destroy:Db.destroy};
```


更为粗暴的干脆完全删掉,因为它的作用就是吧Views和Db打包在一起而已,并没有什么卵用。


> 前面两个例子,虽说添加一些没有实际用处的间接层实现起来容易,但这样做除了徒增代码量,提高维护和检索代码的成本外,并没有什么好处。
另外,如果一个函数被不必要的包裹起来,而且发生改动,那么包裹它 到那个函数也要做相应的变更。


```
httpGet('/post/id',function(json){

    return renderPost(json);

});

```


如果``httpGet``要该成一个可以抛除``error``异常的函数,那么我们还有回头吧``renderPost``改掉


```
//像这样

httpGet('/post/id',function(json,err){

    return renderPost(json,err);

});

```


但是写成一等公民函数的形式, 要做的改动就少很多:


```
httpGet('/post/id',renderPost);//renderPost在httpGet中调用,想要多少参数都行
```


除了删除不必要的函数，正确地为参数命名也必不可少。当然命名不是什么大问题，但还是有可能存在一些不当的命名，尤其随着代码量的增长以及需求的变更，这种可能性也会增加。
项目中常见的一种造成混淆的原因是，针对同一个概念使用不同的命名。还有通用代码的问题。比如，下面这两个函数做的事情一模一样，但后一个就显得更加通用，可重用性也更高：


```
// 只针对当前的博客
var validArticles = function(articles) {
  return articles.filter(function(article){
    return article !== null && article !== undefined;
  });
};

// 对未来的项目友好太多
var compact = function(xs) {
  return xs.filter(function(x) {
    return x !== null && x !== undefined;
  });
};
```

在命名的时候，我们特别容易把自己限定在特定的数据上（本例中是``articles``）。这种现象很常见，也是重复造轮子的一大原因。