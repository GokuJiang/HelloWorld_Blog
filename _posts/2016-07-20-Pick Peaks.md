---
layout: post
title: "Pick Peaks"
date: 2016-07-20 17:26:20 +0800
author: Yongming
tags:
    - JavaScript
    - Algorithms
    - Array
---

###Description:
In this kata, you will create an object that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.

For example, the array arr = [ 0 , 1 , 2 , 5 , 1 , 0 ] has a peak in position 3 with a value of 5 (arr[3] = 5)

The output will be returned as an object with two properties: pos and peaks. Both of these properties should be arrays. If there is no peak in the given array, then the output should be {pos: [], peaks: []}.

###Example:
pickPeaks([3,2,3,6,4,1,2,3,2,1,2,3]) returns {pos:[3,7],peaks:[6,3]}

All input arrays will be valid numeric arrays (although it could still be empty), so you won't need to validate the input.

The first and last elements of the array will not be considered as peaks (in the context of a mathematical function, we don't know what is after and before and therefore, we don't know if it is a peak or not).

Also, beware of plateaus !!! [1,2,2,2,1] has a peak while [1, 2, 2, 2, 3] does not. In case of a plateau-peak, please only return the position and value of the beginning of the plateau. For example: pickPeaks([1,2,2,2,1]) returns {pos:[1],peaks:[2]}

have fun!

###Soultion:

按照题目要求首尾不算,所以``arr.length``必须大于2


```
if(arr.length > 2) {

   ///some code

}
```

定一个"指针"``pos``初始值为-1, 来遍历数组,出现``arr[i]>arr[i-1]``,更新``pos``

出现``arr[i]<arr[i-1]``意味着可能出现峰值(peak);
这时检查``pos``是否为-1, 如果为-1,说明在这个第i个位置之前没有出现比``arr[i]``小的值,所以它不是峰值(peak)。

```
function pickPeaks(arr) {
    var result = {
        pos:[],
        peaks:[]
    };

    if (arr.length > 2){
        var pos = -1;
        for (var i = 1; i<arr.length; i++){
            if (arr[i]>arr[i-1]){
                pos = i;
            }
            else if(arr[i] < arr[i-1] && pos != -1){
                console.log(pos);
                result.pos.push(pos);
                result.peaks.push(arr[pos]);
                pos = -1;
            }
        }
    }
    return result;
}
```

