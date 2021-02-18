- [斐波那契数列](#斐波那契数列)

  - [70. 爬楼梯](#70-爬楼梯)
  - [198. 打家劫舍](#198-打家劫舍)

  

# 斐波那契数列

[Wiki Link](https://zh.wikipedia.org/wiki/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97)

**斐波那契数列**（[意大利语](https://zh.wikipedia.org/wiki/意大利语)：Successione di Fibonacci），又译为**菲波拿契数列**、**菲波那西数列**、**斐氏数列**、**黄金分割数列**。

在[数学](https://zh.wikipedia.org/wiki/數學)上，**斐波那契数列**是以[递归](https://zh.wikipedia.org/wiki/递归)的方法来定义：

- F~0~ = 0
- F~1~ = 0
- F~n~ = F~n-1~ + F~n-2~ (n≧2）

用文字来说，就是斐波那契数列由0和1开始，之后的斐波那契数就是由之前的两数相加而得出。首几个斐波那契数是：

[0](https://zh.wikipedia.org/wiki/0), [1](https://zh.wikipedia.org/wiki/1), [1](https://zh.wikipedia.org/wiki/1), [2](https://zh.wikipedia.org/wiki/2), [3](https://zh.wikipedia.org/wiki/3), [5](https://zh.wikipedia.org/wiki/5), [8](https://zh.wikipedia.org/wiki/8), [13](https://zh.wikipedia.org/wiki/13), [21](https://zh.wikipedia.org/wiki/21), [34](https://zh.wikipedia.org/wiki/34), [55](https://zh.wikipedia.org/wiki/55), [89](https://zh.wikipedia.org/wiki/89), [144](https://zh.wikipedia.org/wiki/144), [233](https://zh.wikipedia.org/wiki/233)……（[OEIS](https://zh.wikipedia.org/wiki/整數數列線上大全)中的数列[A000045](https://oeis.org/A000045)）

**特别指出**：[0](https://zh.wikipedia.org/wiki/0)不是第一项，而是第零项。

## [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：**给定 *n* 是一个正整数。

**示例 1：**

```
输入： 2
输出： 2
解释： 有两种方法可以爬到楼顶。
1.  1 阶 + 1 阶
2.  2 阶
```

**题解：**

```js
/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  // 存储爬到每层楼梯的方式数，下标0代表第一层
  const dp = []
  dp[0] = 1// 第一层有一种方式 1
  dp[1] = 2// 第二层有两种方式 11 & 2
  for (let i = 2; i < n; i++) {
    // 后面的每层，都是等于前两层的数相加
    // 因为假设现在第三层，那么如果是从第一层过来，只有一种方式（到达第一层的方式数+2步）
    // 如果是从第二层过来，只有两种方式（到达第二层的方式数+2步）
    dp[i] = dp[i - 2] + dp[i - 1]
  }
  return dp[n - 1]
};
```

**常量优化算法：**

```js
var climbStairs = function (n) {
  const dp = []
  let dptwo = 1
  let dpone = 2
  // 注意ans初始为n，因为 n<=2 的时候不会进循环
  let ans = n
  for (let i = 2; i < n; i++) {
    ans = dpone + dptwo
    dptwo = dpone
    dpone = ans
  }
  return ans
};
```

## [198. 打家劫舍](https://leetcode-cn.com/problems/house-robber/)

你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警**。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **不触动警报装置的情况下** ，一夜之内能够偷窃到的最高金额。

 

**示例 1：**

```
输入：[1,2,3,1]
输出：4
解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
     偷窃到的最高金额 = 1 + 3 = 4 
```

**题解：**

 `dp` 内每一位存放走到当前这步能盗取的最大值

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // 空返回 [0]
  if (nums.length === 0) return 0
  // dp 内每一位存放走到当前这步能盗取的最大值
  let dp = []
  dp[0] = nums[0]
  // 第二位取前两位最大值
  dp[1] = Math.max(dp[0], nums[1])
  for (let i = 2; i < nums.length; i++) {
    // 偷的话取dp[i - 2] + nums[i],不偷的话取dp[i-1]
    dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
  }
  return dp[nums.length - 1]
};
```

