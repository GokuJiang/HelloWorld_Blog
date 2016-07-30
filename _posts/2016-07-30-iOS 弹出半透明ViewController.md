---
layout: post 
title: iOS 弹出半透明ViewController
author: Yongmming
date: 2016-07-30 14:54 +0800
tags: 
    - iOS
    - swift
    - ViewController
    - alpha
      
---

今天写项目,遇到个问题就是需要弹出个半透明的视图窗,首先想到就这样的:

```
let vc = ViewController()
vc.view.alpha = 0.5
self.presentViewController(vc, animated: true, completion: nil)
```

然后发现毛用都没有,闪烁了一下就黑掉了。MDZZ,于是博主google了一下,发现基本上都是用storyboard初始化的,像这样

```
let viewController=storyboard.instantiateViewControllerWithIdentifier("对应要启动的ViewController名字") as 对应要启动的ViewController名字
viewController.view.backgroundColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
self.presentViewController(vPersonalizedSettingsViewController, animated: 动不动画随便你, completion: nil)
```

在加上一句这个

```
self.modalPresentationStyle = .Custom
```

但是博主并不喜欢用sb,一直保持手写代码的好习惯。然后我尝试这么做

```
let vc = ViewController()
vc.view.alpha = 0.5
self.modalPresentationStyle = .Custom
self.presentViewController(vc, animated: true, completion: nil)

```


木有用,木有用。。。天啊。。整个人都不好了。。。。

原来，这个只是IOS7之前的写法，在IOS8及以后的版本中，apple为了配合自己的alertController,将这个方法从rootViewController中移到了展示的controller中，所以正确的写法现在变成了这样：

```
let vc = ViewController()
vc.view.backgroundColor = UIColor(red: 0, green: 0, blue: 0, alpha: 0.5)
vc.modalPresentationStyle = .OverCurrentContext //重点在这句代码, modalPresentationStyle一定是 .OverCurrentContext
vc.modalTransitionStyle = .CoverVertical
self.presentViewController(vc, animated: true, completion: nil)

```

注意到一个小小的不同了么？是的，不要直接设定view的alpha值，这样会导致所有的subview都变得透明，而应该是backgroundColor的alpha值，这样subview便不会受到影响。
至于怎么返回上一个VC，其实只要使用dismissViewControllerAnimated这个方法就可以，加个tap手势或者加个按钮事件都可以


