- [常用方法和变量](#常用方法和变量)
- [69. x 的平方根](#69-x-的平方根)
- [744. 寻找比目标字母大的最小字母⭐](#744-寻找比目标字母大的最小字母)

# 二分查找

## 常用方法和变量

- 二分值：`l+(r-l)/2` 
- 二分直接取整： `~~(l+(r-l)/2)`    5.5 => 5   -5.5=>-5
- 二分向下取证：`x >> 1`  相当于 `Math.floor(x/2)`

**常用套路模板：**

```js
let left = start
let right = end
let mid
while(left <= right){
  mid = Math.floor(left+(right-left)/2)
  if(arr[mid] == target){
    return 目标值
  }
  if(arr[mid] < target){
    left = mid + 1
  }else{
    right = mid -1
  }
}
```

## [69. x 的平方根](https://leetcode-cn.com/problems/sqrtx/)

实现 `int sqrt(int x)` 函数。

计算并返回 *x* 的平方根，其中 *x* 是非负整数。

由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。

**示例 1:**

```
输入: 4
输出: 2
```

**示例 2:**

```
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x < 2) return x
  let l = 1
  let r = ~~(x / 2)

  while (l <= r) {
    let mid = l + ((r - l) >> 1)
    if (mid ** 2 > x) {
      r = mid - 1
    } else if (mid ** 2 < x) {
      l = mid + 1
    } else {
      return mid
    }
  }
  return r
};
```

## [744. 寻找比目标字母大的最小字母⭐](https://leetcode-cn.com/problems/find-smallest-letter-greater-than-target/)

给你一个排序后的字符列表 `letters` ，列表中只包含小写英文字母。另给出一个目标字母 `target`，请你寻找在这一有序列表里比目标字母大的最小字母。

在比较时，字母是依序循环出现的。举个例子：

- 如果目标字母 `target = 'z'` 并且字符列表为 `letters = ['a', 'b']`，则答案返回 `'a'`

**示例：**

```
输入:
letters = ["c", "f", "j"]
target = "a"
输出: "c"

输入:
letters = ["c", "f", "j"]
target = "c"
输出: "f"
```

**题解：**

思路：① 去重防止相等时下一位还是 `target` ② 如果 `target` 比任何字母都大，那么 l 会越界到 r 后面，因为 r 一直在结尾没动。

```js
/*
 * @lc app=leetcode.cn id=744 lang=javascript
 *
 * [744] 寻找比目标字母大的最小字母
 */

// @lc code=start
/**
 * @param {character[]} letters
 * @param {character} target
 * @return {character}
 */
var nextGreatestLetter = function (letters, target) {
  letters = [...new Set(letters)]

  let l = 0
  let r = letters.length - 1
  let mid

  while (l <= r) {
    mid = Math.floor(l + (r - l) / 2)
    // 相同的时候，如果下一位有值就取下一位，因为去重了所以一定比target大，如果没有拿[0]
    if (letters[mid] === target) return letters[mid + 1] ? letters[mid + 1] : letters[0]

    if (letters[mid] < target) {
      l = mid + 1
    } else {
      r = mid - 1
    }
  }
  // 如果letters[mid]一直比target小，那么l会大过最后一位【因为r一直在最后一位没动】，l越界就拿[0]
  return letters[l] ? letters[l] : letters[0]
};
```

