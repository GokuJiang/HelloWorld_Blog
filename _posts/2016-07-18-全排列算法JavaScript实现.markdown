---
layout: post
title: "全排列算法JavaScript实现"
date: 2016-07-19 20:18:20 +0800
author: Yongming
tags: 
    - JavaScript
    - 算法
---

#全排列算法JavaScript实现


---------
>本文可随意转载，但请注明出处

---------


**Issue Description:** In this kata you have to create all permutations of an input string and remove duplicates, if present. This means, you have to shuffle all letters from the input in all possible orders.

**Example** 	

```
permutations('a'); // ['a']
permutations('ab'); // ['ab', 'ba']
permutations('aabb'); // ['aabb', 'abab', 'abba', 'baab', 'baba', 'bbaa']

```
The order of the permutations doesn't matter.

> 看到这道题第一个印象就是高中数学排列组合

对于这种问题，都是采用插空的方法。所以基本思路也就这样了，每次选一个字符，在剩余字符串中进行插空

> 例如，有字符串``"abc"``,现在将它们排成一排。排列详细步骤如下：
> - 取出a，剩余``"bc"``,并形成三个间隔``_b_c_``，共两种方案
> - 将``a``插入到3个空中，有三种方案
> - 所以有总的方案有6种。

按照这个思路，先统计了字符串中每个字符出现的个数，然后试图通过“插空法”求出排列方案总数，

废话少说先上代码

```
function permutations(string) {
   var result=[];
    if(string.length==1){
        return [string]    
    }else{
        var preResult=permutations(string.slice(1));
        for (var j = 0; j < preResult.length; j++) {
            for (var k = 0; k < preResult[j].length+1; k++) {
                 var temp = preResult[j].slice(0,k)+string[0]+preResult[j].slice(k);
                    result.push(temp);         
                }
            }
        return unique(result);
 
    }  
}

function unique(arr) {
  var ret = []
 
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    if (ret.indexOf(item) === -1) {
      ret.push(item)
    }
  }
 
  return ret
}
```
>下面实现过程参考了<a src="http://www.cnblogs.com/kindofblue/p/4947748.html">约翰的迷宫的Blog</a>

###实现过程
首先明确函数的输入和输出，输入是一个字符串，输出是各种排列组合形成的字符串组成的数组，所以函数的大体框架应该是这样的：

```
function permutate(string){
	var result = [];

	return result;
}
```

然后，确定是用递归方法来解决问题的。
类似于数学归纳法，首先，给出初始条件，初始条件满足；然后拓展假设n的情况也成立；最好证明n＋1也成立。
第一步初始条件满足相较递归算法应该是要给出一个结束的条件：

```
function permutate(string){
	var result = [];
	if(string.length === 1){
		return [string];
	}
	else {
		//code
		return result;
	}
}
```

接着，假设我们知道了n－1的输出，要有这个输出得到n的输出，在这问题对于，n－1的输入，对应着``string.length - 1``长度的``string``。也就是知道了“abc”的全排列输出，再给一个“d”，要怎么样得到新的全排列？

很简单，只把d插入到任意相邻的字母之间（即每个空当中，也包含头尾），就可以得到新的排列，上面说的插空思想。

这里，对于没给输入的``stirng``，我们把它分成两部分，第一部分为字符串的第一个字符即``string[0]``，第二部分为剩余的字符串即``string.slice(1)``。根据假设，我姑且可以把``permutate(string.slice(1))``作为一个已知量。

> noet：ES5之前不能直接用下标访问，需要调用``codeAt()``方法

```
function permutate(string){
	var result = [];
	if(string.length === 1){
		return [string];
	}
	else {
		var perResult = permutate(string.slice(1));
		...
		return result;
	}
}

```

接着对``perResult``里的每一个排列进行处理，将``string[0]``,每得到一个排列，便将它push到``result``里。

```
for(var j = 0; j < preResult.length; j++){
	for(var k = 0; k < preResult[j].length + 1; k++){
		var temp = preResult[j].slice(0,k) + string[0] + preResult[j].slice(k);
		result.push(temp);
	}
}
```

在读懂上述代码时，时刻不要忘了preResult是个什么样的数组,当递归到最后一个字符时，preResult为[ 'c' ]，再上一层的为[ 'bc', 'cb' ]。

上述代码比较难理解的是：

```
var temp = preResult[j].slice(0,k) + string[0] + preResult[j].slice(k);
```

> 这里是将str[0]插入到上一次的某个排列方案结果中，采用的是字符串拼接的方案，返回一个新字符串给temp,注意这里不能直接在preResult[j]上操作，否则会修改preResult[j]的长度导致内层的循环永远不接结束。

另外需要注意的是代码中的``preResult[j].length+1``这里必须加上1，考虑到``slice()``方法的截取范围是“左闭右开”区间，这样当k取值为``preResult[j].length``时才能将``str[0]``添加到字符串尾部。

通过上面的方法，我的就得到了关于下标的所有排列组合的情况。然而实际上，我们对于`"aab"`得到的结果`["aab", "aab", "aba", "aba", "baa", "baa"]`这样的重复，对于两个`a`区分对待的情况是无法接受的。所以我们还需要一个去重操作

```
function unique(arr) {
  var ret = []
 
  for (var i = 0; i < arr.length; i++) {
    var item = arr[i]
    if (ret.indexOf(item) === -1) {
      ret.push(item)
    }
  }
  return ret
}
```

到这里，这道题就结束了，在codewars上完美AC了（小小激动下）

然而看到大神的代码，深深感叹

```
function permutations(string) {
  return (string.length == 1) ? [string] : string.split('').map(
     (e, i) => permutations(string.slice(0,i) + string.slice(i+1)).map((e2) => e+e2)
  ).reduce((r,e) => r.concat(e)).sort().filter((e,i,a) => (i==0) || a[i-1] != e);
}
```

没错，一句话搞定了，不由得感叹函数式编程的伟大

>下面看到的一个介绍了全排列的6种实现方式
> <a src="http://mengliao.blog.51cto.com/876134/824079">BlackAlpha 的BLOG</a>
> 有兴趣的朋友可以去看看，写的挺不错的

