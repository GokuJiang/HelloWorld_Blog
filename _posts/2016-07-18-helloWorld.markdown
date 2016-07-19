---
layout:     post
title:      "Welcome to Yongming Blog"
subtitle:   " \"Hello World, Hello Blog\""
date:       2016-07-18 12:00:00
author:     "Yongming"
header-img: "img/post-bg-2015.jpg"
tags:
    - 生活
---

> “Yeah It's on. ”


##前言

Yongming 的 Blog 就这么开通了。

[跳过废话，直接看技术实现 ](#build)



作为一个程序员， Blog 这种轮子要是挂在大众博客程序上就太没意思了。一是觉得大部分 Blog 服务都太丑，二是觉得不能随便定制不好玩。之前因为太懒没有折腾，结果就一直连个写 Blog 的地儿都没有。

再者,也是学习太忙也没弄。最近闲着也就花了一天时间一不做二不休做一个吧。


<p id = "build"></p>
---

##正文

接下来说说搭建这个博客的技术细节。  

 [GitHub Pages](https://pages.github.com/) + [Jekyll](http://jekyllrb.com/) 快速 Building Blog 的技术方案，非常轻松时尚。

其优点非常明显：

* **Markdown** 带来的优雅写作体验
* 非常熟悉的 Git workflow ，**Git Commit 即 Blog Post**
* 利用 GitHub Pages 的域名和免费无限空间，不用自己折腾主机
* 如果需要自定义域名，也只需要简单改改 DNS 加个 CNAME 就好了(我的域名买了好久, 这是懒得去和体制内那帮人打交道, 也就扔那了, 索性直接用github的吧)
* Jekyll 的自定制非常容易，基本就是个模版引擎


> 所以速度方面稍微欠佳,但也还好,以后都会陆续优化的。


---

配置的过程中也没遇到什么坑，基本就是 Git 的流程，相当顺手

大的 Jekyll 主题上直接 fork 了 Hux Blog

本地调试环境需要 `gem install jekyll`，结果 rubygem 的源居然被墙了……后来手动改成了我大淘宝的镜像源才成功

Theme 的 CSS 是基于 Bootstrap 定制的，看得不爽的地方直接在 Less 里改就好了（平时更习惯 SCSS 些），**不过其实我一直觉得 Bootstrap 在移动端的体验做得相当一般**所以为了体验，也补了不少 CSS 进去

最后就进入了耗时反而最长的**做图、写字**阶段，也算是进入了**写博客**的正轨，因为是类似 Hack Day 的方式去搭这个站的，所以折腾折腾着大半夜就过去了。



## 后记

回顾这个博客的诞生，纯粹是出于个人兴趣。我决定把这个博客主题当作一个小小的开源项目来维护。

凡事都是第一次, 我是个写iOS的, 对于前端并非那么熟悉, 也是刚刚接手写了写东西, 这个blog也会一点一点完善。希望大家可以喜欢

—— Yongming 后记于 2016.07
