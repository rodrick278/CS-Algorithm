- [常用方法和变量](#常用方法和变量)
- [69. x 的平方根](#69-x-的平方根)
- [744. 寻找比目标字母大的最小字母⭐](#744-寻找比目标字母大的最小字母)
- [540. 有序数组中的单一元素](#540-有序数组中的单一元素)
- [278. 第一个错误的版本](#278-第一个错误的版本)

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

## [540. 有序数组中的单一元素](https://leetcode-cn.com/problems/single-element-in-a-sorted-array/)

给定一个只包含整数的有序数组，每个元素都会出现两次，唯有一个数只会出现一次，找出这个数。

**示例 1:**

```
输入: [1,1,2,3,3,4,4,8,8]
输出: 2
```

**示例 2:**

```
输入: [3,3,7,7,10,11,11]
输出: 10
```

**题解：**

思路：推一推示例中的值，会发现需要根据奇偶情况进行判断，剩下的套公式就行

```js
/*
* @lc app=leetcode.cn id=540 lang=javascript
*
* [540] 有序数组中的单一元素
*/

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNonDuplicate = function (nums) {
  let l = 0
  let r = nums.length - 1
  let mid
  while (l <= r) {
    mid = Math.floor(l + (r - l) / 2)

    if (nums[mid] === nums[mid + 1]) {
      if (mid % 2 == 1) {
        r = mid - 1
      } else {
        l = mid + 1
      }
    } else if (nums[mid] === nums[mid - 1]) {
      if (mid % 2 == 1) {
        l = mid + 1
      } else {
        r = mid - 1
      }
    } else {
      return nums[mid]
    }
  }
};
```

## [278. 第一个错误的版本](https://leetcode-cn.com/problems/first-bad-version/)

你是产品经理，目前正在带领一个团队开发新的产品。不幸的是，你的产品的最新版本没有通过质量检测。由于每个版本都是基于之前的版本开发的，所以错误的版本之后的所有版本都是错的。

假设你有 `n` 个版本 `[1, 2, ..., n]`，你想找出导致之后所有版本出错的第一个错误的版本。

你可以通过调用 `bool isBadVersion(version)` 接口来判断版本号 `version` 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。

**示例:**

```
给定 n = 5，并且 version = 4 是第一个错误的版本。

调用 isBadVersion(3) -> false
调用 isBadVersion(5) -> true
调用 isBadVersion(4) -> true

所以，4 是第一个错误的版本
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=278 lang=javascript
 *
 * [278] 第一个错误的版本
 */

// @lc code=start
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    if (isBadVersion(1)) return 1

    let l = 1
    let r = n
    let mid
    while (l <= r) {
      mid = Math.floor(l + (r - l) / 2)
      if (isBadVersion(mid)) {
        r = mid - 1
      } else {
        l = mid + 1
      }
    }
    return l

  };
};
```

