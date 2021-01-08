* [1. 两数之和  输入有序数组](#1-两数之和-输入有序数组)

* [2. 平方数之和](#2-平方数之和)

* [3. 反转字符串中的元音字母](#3-反转字符串中的元音字母)

* [4. 回文字符串⭐](#4-回文字符串)

  

# 双指针 Two Pointers

指的是在遍历对象的过程中，不是普通的使用单个指针进行访问，而是使用两个相同方向（*快慢指针*）或者相反方向（*对撞指针*）的指针进行扫描，从而达到相应的目的。



##  1. 两数之和 输入有序数组

[167. 两数之和 II - 输入有序数组](https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/)

**题目：**

给定一个已按照_升序排列_ 的有序数组，找到两个数使得它们相加之和等于目标数。

函数应该返回这两个下标值 index1 和 index2，其中 index1 必须小于 index2。

**说明：**

- 返回的下标值（index1 和 index2）不是从零开始的。
- 你可以假设每个输入只对应唯一的答案，而且你不可以重复使用相同的元素。

**示例：**

```
输入: numbers = [2, 7, 11, 15], target = 9
输出: [1,2]
解释: 2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=167 lang=javascript
 *
 * [167] 两数之和 II - 输入有序数组
 */

// @lc code=start
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let len = numbers.length;
  if (len < 2) return []
  let left = 0
  let right = len - 1
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1]
    } else if (numbers[left] + numbers[right] < target) {
      left++
    } else {
      right--
    }
  }
  return []
};
```

## 2. 平方数之和

 [633. 平方数之和](https://leetcode-cn.com/problems/sum-of-square-numbers/)

**题目:**

给定一个非负整数 `c` ，你要判断是否存在两个整数 `a` 和 `b`，使得 `a2 + b2 = c` 。

**说明:**

无

**示例 1：**

```
输入：c = 5
输出：true
解释：1 * 1 + 2 * 2 = 5
```

**示例 2：**

```
输入：c = 3
输出：false
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=633 lang=javascript
 *
 * [633] 平方数之和
 */

// @lc code=start
/**
 * @param {number} c
 * @return {boolean}
 */
var judgeSquareSum = function(c) {
  let left=0
  let right = Math.floor(Math.sqrt(c))
  while(left<=right){
    if(left**2+right**2===c){
      return true
    }else if(left**2+right**2<c){
      left++
    }else{
      right--
    }
  }
  return false
};
```

## 3. 反转字符串中的元音字母

[345. 反转字符串中的元音字母](https://leetcode-cn.com/problems/reverse-vowels-of-a-string/)

**题目:**

编写一个函数，以字符串作为输入，反转该字符串中的元音字母。

**说明:**

- 元音字母不包含字母 "y" 。
- 题目没准确说明谁和谁转换，实际上应该是每次的最左和最右转换

**示例 1：**

```
输入："hello"
输出："holle"
```

**示例 2：**

```
输入："leetcode"
输出："leotcede"
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=345 lang=javascript
 *
 * [345] 反转字符串中的元音字母
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseVowels = function (s) {
  const arr = ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'];
  let str = s.split('')
  let left = 0
  let right = str.length - 1

  while (left < right) {
    if (arr.includes(str[left])) {
      if (arr.includes(str[right])) {
        // 左右都找到了，替换后左右分别++ --
        [str[left], str[right]] = [str[right], str[left]]
        left++
      }
      // 右边不管找没找到，都需要--，所以不用放在 else 里
      right--
    } else {
      // 左边没找到 ++
      left++
    }
  }
  return str.join('')
};
```

## 4. 回文字符串⭐

[680. 验证回文字符串 Ⅱ](https://leetcode-cn.com/problems/valid-palindrome-ii/)

**题目:**

给定一个非空字符串 `s`，**最多**删除一个字符。判断是否能成为回文字符串。

**说明:**

- 字符串只包含从 a-z 的小写字母。字符串的最大长度是50000。

**示例 1:**

```
输入: "aba"
输出: True
```

**示例 2:**

```
输入: "abca"
输出: True
解释: 你可以删除c字符。
```

**题解：**

```js
/*
 * @lc app=leetcode.cn id=680 lang=javascript
 *
 * [680] 验证回文字符串 Ⅱ
 */

// @lc code=start
/**
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function (s) {
  let left = 0
  let right = s.length - 1

  while (left < right) {
    if (s[left] === s[right]) {// 左右相等 分别向中间靠近一位
      left++
      right--
    } else {// 左右不等，删除左边是回文或者删除右边是回文即为 true 否则为 false
      return isHW(s, left + 1, right) || isHW(s, left, right - 1)
    }
  }
  return true
};

// 验证删除后的字符串是否回文，不回文则整个算法结束false，回文则结束ture
function isHW(s, left, right) {
  while (left < right) {
    if (s[left] === s[right]) {
      left++
      right--
    } else {
      return false
    }
  }
  return true
}
```

