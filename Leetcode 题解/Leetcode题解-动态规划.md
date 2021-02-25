- [斐波那契数列](#斐波那契数列)

  - [70. 爬楼梯](#70-爬楼梯)
  - [198. 打家劫舍](#198-打家劫舍)
  - [213. 打家劫舍 II](#213-打家劫舍-II)
  - [信封错排⭐](#信封错排)
  
- [矩阵路径](#矩阵路径)

  - [64. 最小路径和](#64-最小路径和)
  - [62. 不同路径](#62-不同路径)

- [数组区间](#数组区间)

  - [303. 区域和检索 - 数组不可变](#303-区域和检索---数组不可变)
  - [413. 等差数列划分](#413-等差数列划分)
  
- [分割整数](#分割整数)

  - [343. 整数拆分](#343-整数拆分)
  - [279. 完全平方数⭐](#279-完全平方数)
  - [91. 解码方法](#91-解码方法)

- [最长递增子序列](#最长递增子序列)

  - [300. 最长递增子序列](#300-最长递增子序列)
  - [646. 最长数对链](#646-最长数对链)
  - [376. 摆动序列⭐](#376-摆动序列)

- [其他](#其他)

  - [53. 最大子序和](#53-最大子序和)
  
  
  
  

# 斐波那契数列

[Wiki Link](https://zh.wikipedia.org/wiki/%E6%96%90%E6%B3%A2%E9%82%A3%E5%A5%91%E6%95%B0%E5%88%97)

**斐波那契数列**（[意大利语](https://zh.wikipedia.org/wiki/意大利语)：Successione di Fibonacci），又译为**菲波拿契数列**、**菲波那西数列**、**斐氏数列**、**黄金分割数列**。

在[数学](https://zh.wikipedia.org/wiki/數學)上，**斐波那契数列**是以[递归](https://zh.wikipedia.org/wiki/递归)的方法来定义：

- F<sub>0</sub> = 0
- F<sub>1</sub> = 0
- F<sub>n</sub> = F<sub>n-1</sub> + F<sub>n-2</sub> (n≧2）

用文字来说，就是斐波那契数列由0和1开始，之后的斐波那契数就是由之前的两数相加而得出。首几个斐波那契数是：

[0](https://zh.wikipedia.org/wiki/0), [1](https://zh.wikipedia.org/wiki/1), [1](https://zh.wikipedia.org/wiki/1), [2](https://zh.wikipedia.org/wiki/2), [3](https://zh.wikipedia.org/wiki/3), [5](https://zh.wikipedia.org/wiki/5), [8](https://zh.wikipedia.org/wiki/8), [13](https://zh.wikipedia.org/wiki/13), [21](https://zh.wikipedia.org/wiki/21), [34](https://zh.wikipedia.org/wiki/34), [55](https://zh.wikipedia.org/wiki/55), [89](https://zh.wikipedia.org/wiki/89), [144](https://zh.wikipedia.org/wiki/144), [233](https://zh.wikipedia.org/wiki/233)……（[OEIS](https://zh.wikipedia.org/wiki/整數數列線上大全)中的数列[A000045](https://oeis.org/A000045)）

**特别指出**：[0](https://zh.wikipedia.org/wiki/0)不是第一项，而是第零项。

## [70. 爬楼梯](https://leetcode-cn.com/problems/climbing-stairs/)

假设你正在爬楼梯。需要 *n* 阶你才能到达楼顶。

每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

**注意：** 给定 *n* 是一个正整数。

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

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈** ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警** 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **在不触动警报装置的情况下** ，能够偷窃到的最高金额。

 

**示例 1：**

```
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

**示例 2：**

```
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 3：**

```
输入：nums = [0]
输出：0
```

## [213. 打家劫舍 II](https://leetcode-cn.com/problems/house-robber-ii/)

你是一个专业的小偷，计划偷窃沿街的房屋，每间房内都藏有一定的现金。这个地方所有的房屋都 **围成一圈** ，这意味着第一个房屋和最后一个房屋是紧挨着的。同时，相邻的房屋装有相互连通的防盗系统，**如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警** 。

给定一个代表每个房屋存放金额的非负整数数组，计算你 **在不触动警报装置的情况下** ，能够偷窃到的最高金额。

 

**示例 1：**

```
输入：nums = [2,3,2]
输出：3
解释：你不能先偷窃 1 号房屋（金额 = 2），然后偷窃 3 号房屋（金额 = 2）, 因为他们是相邻的。
```

**示例 2：**

```
输入：nums = [1,2,3,1]
输出：4
解释：你可以先偷窃 1 号房屋（金额 = 1），然后偷窃 3 号房屋（金额 = 3）。
     偷窃到的最高金额 = 1 + 3 = 4 。
```

**示例 3：**

```
输入：nums = [0]
输出：0
```

**题解：**

分别掐头去尾两次 dp

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {

  // 处理 空 len==1 ||2
  if (nums.length === 0) return 0
  if (nums.length === 1 || nums.length === 2) return Math.max(...nums)

  function check(arr) {
    let dp = []
    dp[0] = arr[0]
    dp[1] = Math.max(dp[0], arr[1])
    for (let i = 2; i <= arr.length - 1; i++) {
      dp[i] = Math.max(dp[i - 1], dp[i - 2] + arr[i])
    }
    return dp[dp.length - 1]
  }
  // 掐头去尾
  const arr1 = nums.slice()
  const arr2 = nums.slice()
  arr1.pop()
  arr2.shift()

  return Math.max(check(arr1), check(arr2))
};
```

## [信封错排⭐](https://www.cnblogs.com/buptleida/p/13229545.html)

假设有5封信放入5个信箱，问：有多少种方案是5个信封全部没有放入对应的信箱中
如：[1,2,3] 有两种方案：[2,3,1] [3,1,2]

**题解：**

首先要知道 dp[x] 的意思是：有x封信，**每个信都有一个自己不能放进去的信箱**的情况下的错排情况！

1. 假设 **信 i** 放进了**信封 j**，信 j 放进了**信封 k**
2. 首先 **信 i** 除了**信封 i** 不能放，其他都可以，有 **(i-1)** 种放法
3. 假如 **k == i** ，那么 **信 j** 就是放进了 **信封 i**，剩下 **(n-2)** 封信有 **dp[i-2]** 种放的方式【**因为这 n-2 封信都有一个对应不能放的信箱，符合一开始我们说的概念**】
4. 假如 **k !== i**，那么此时 **信 k** 可以把**信箱 i** 看作是自己的对应的不能放的信箱，那么此时就是有 **(n-1)** 封信满足条件，所以此时是 **dp[i-1]**

最后抽出的公式：

![image](https://gitee.com/rodrick278/img/raw/master/img/20200703mail4.png)

```js
var findDerangement = function (n) {
  // 0的时候我们设置为1，方便后面2的求解
  // D(n) = (n-1) [D(n-2) + D(n-1)]
  let dp = [0, 0, 1] //特殊记忆一下
  for (let i = 3; i <= n; i++) {
    dp[i] = (i - 1) * (dp[i - 2] + dp[i - 1])
  }
  return dp[n]
};
console.log(findDerangement(3))
```

# 矩阵路径

## [64. 最小路径和](https://leetcode-cn.com/problems/minimum-path-sum/)

给定一个包含非负整数的 `m x n` 网格 `grid` ，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。

**说明：** 每次只能向下或者向右移动一步。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/11/05/minpath.jpg)

```
输入：grid = [[1,3,1],[1,5,1],[4,2,1]]
输出：7
解释：因为路径 1→3→1→1→1 的总和最小。
```

**示例 2：**

```
输入：grid = [[1,2,3],[4,5,6]]
输出：12
```

 

**提示：**

- `m == grid.length`
- `n == grid[i].length`
- `1 <= m, n <= 200`
- `0 <= grid[i][j] <= 100`

**题解：**

到每个格子，都只能从上面或者左面进来

但是第一行和第一列特殊，他们一个只能从左边进一个只能从上面进

为了避免越界等情况，我们可以先把第一行和第一列的全部先算出来，然后再遍历其他值，grid 的每个格子的值都变成到当前格子的最短路径长度

```js
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  // m 列 n 行
  let m = grid[0].length, n = grid.length
  // “到”每个格子，都只能从上面或者左面进来
  // 但是第一行和第一列特殊，他们一个只能从左边进一个只能从上面进
  // 计算第一行
  for (let i = 1; i < m; i++) {
    grid[0][i] += grid[0][i - 1] 
  }
  // 计算第一列
  for (let i = 1; i < n; i++) {
    grid[i][0] += grid[i - 1][0] 
  }
  // 现在开始循环其他的值
  for (let x = 1; x < n; x++) {
    for (let y = 1; y < m; y++) {
      grid[x][y] += Math.min(grid[x - 1][y], grid[x][y - 1])
    }
  }
  return grid[n - 1][m - 1]
};
```

## [62. 不同路径](https://leetcode-cn.com/problems/unique-paths/)

一个机器人位于一个 `m x n` 网格的左上角 （起始点在下图中标记为 “Start” ）。

机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。

问总共有多少条不同的路径？

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

```
输入：m = 3, n = 7
输出：28
```

**题解：**

```js
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  let dp = Array.from({ length: n }, () => new Array(m))
  dp[0][0] = 1
  for (let i = 1; i < m; i++) {
    dp[0][i] = 1
  }

  for (let i = 1; i < n; i++) {
    dp[i][0] = 1
  }

  for (let x = 1; x < n; x++) {
    for (let y = 1; y < m; y++) {
      dp[x][y] = dp[x][y - 1] + dp[x - 1][y]
    }
  }

  return dp[n - 1][m - 1]
};
```

# 数组区间

## [303. 区域和检索 - 数组不可变](https://leetcode-cn.com/problems/range-sum-query-immutable/)

给定一个整数数组  `nums`，求出数组从索引 `i` 到 `j`*（*`i ≤ j`）范围内元素的总和，包含 `i`、`j `两点。

实现 `NumArray` 类：

- `NumArray(int[] nums)` 使用数组 `nums` 初始化对象
- `int sumRange(int i, int j)` 返回数组 `nums` 从索引 `i` 到 `j`*（*`i ≤ j`）范围内元素的总和，包含 `i`、`j `两点（也就是 `sum(nums[i], nums[i + 1], ... , nums[j])`）

 

**示例：**

```
输入：
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
输出：
[null, 1, -1, -3]

解释：
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return 1 ((-2) + 0 + 3)
numArray.sumRange(2, 5); // return -1 (3 + (-5) + 2 + (-1)) 
numArray.sumRange(0, 5); // return -3 ((-2) + 0 + 3 + (-5) + 2 + (-1))
```

**题解：**

1. dp 在构造函数中做，这样不用每次调用 `sumRange` 都处理
2. 假设 `nums:[1,2,3,4]` ，那么 `dp:[1,2,6,10]` ，求区间就是个差值 `this.dp[j] - this.dp[i - 1])`，注意一下 下标 0 就行

```js
/**
 * @param {number[]} nums
 */
var NumArray = function (nums) {
  const dp = []
  dp[0] = nums[0]

  for (let i = 1; i <= nums.length - 1; i++) {
    dp[i] = dp[i - 1] + nums[i]
  }
  this.dp = dp
};

/** 
 * @param {number} i 
 * @param {number} j
 * @return {number}
 */
NumArray.prototype.sumRange = function (i, j) {
  return this.dp[j] - (i == 0 ? 0 : this.dp[i - 1])
};

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(i,j)
 */
```

## [413. 等差数列划分](https://leetcode-cn.com/problems/arithmetic-slices/)

如果一个数列至少有三个元素，并且任意两个相邻元素之差相同，则称该数列为等差数列。

例如，以下数列为等差数列:

```
1, 3, 5, 7, 9
7, 7, 7, 7
3, -1, -5, -9
```

以下数列不是等差数列。

```
1, 1, 2, 5, 7
```

 

数组 A 包含 N 个数，且索引从0开始。数组 A 的一个子数组划分为数组 (P, Q)，P 与 Q 是整数且满足 0<=P<Q<N 。

如果满足以下条件，则称子数组(P, Q)为等差数组：

元素 A[P], A[p + 1], ..., A[Q - 1], A[Q] 是等差的。并且 P + 1 < Q 。

函数要返回数组 A 中所有为等差数组的子数组个数。

**题解：**

dp 存到每个位置为止的等差数列数量，更像是找规律题

可以用常数优化

**DP**

```js
/**
 * @param {number[]} A
 * @return {number}
 */
var numberOfArithmeticSlices = function (A) {
  if(!A.length) return 0
  const dp = []
  dp[0] = dp[1] = 0
  for (let i = 2; i < A.length; i++) {
    let count = dp[i - 1]
    let j = i
    while (A[j] - A[j - 1] === A[j - 1] - A[j - 2]) {
      count++
      j--
    }
    dp[i] = count
  }
  return dp[A.length - 1]
};
```

**优化为常数**

```js
var numberOfArithmeticSlices = function (A) {
  let ans = 0
  for (let i = 2; i < A.length; i++) {
    let j = i
    while (A[j] - A[j - 1] === A[j - 1] - A[j - 2]) {
      ans++
      j--
    }
  }
  return ans
};
```

# 分割整数

`dp` 的每一位都是存那一位数的答案值。注意当前数和 `dp` 中的数的关系。

## [343. 整数拆分](https://leetcode-cn.com/problems/integer-break/)

给定一个正整数 *n*，将其拆分为**至少**两个正整数的和，并使这些整数的乘积最大化。 返回你可以获得的最大乘积。

**示例 1:**

```
输入: 2
输出: 1
解释: 2 = 1 + 1, 1 × 1 = 1。
```

**示例 2:**

```
输入: 10
输出: 36
解释: 10 = 3 + 3 + 4, 3 × 3 × 4 = 36。
```

**题解：**

`dp` 用来存储每一个数的结果最大值，初始值给 0 ，我们每次只把他拆分成两部分，一个是逐渐增加的整数 j，还有一个是根据选择，如果不拆分，也就是两个数相乘，那就直接乘积，否则是 `j*dp[i-j]` ，获取剩下的数的最大乘积。然后相乘。

```js
/**
 * @param {number} n
 * @return {number}
 */
var integerBreak = function (n) {
  const dp = []
  dp[2] = 1

  for (let i = 3; i <= n; i++) {
    dp[i]=0
    for (let j = 1; j <= i - j; j++) {
      dp[i] = Math.max(j * (i - j), j * dp[i - j], dp[i])
    }
  }
  return dp[n]
};
```

## [279. 完全平方数⭐](https://leetcode-cn.com/problems/perfect-squares/)

给定正整数 *n*，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 *n*。你需要让组成和的完全平方数的个数最少。

给你一个整数 `n` ，返回和为 `n` 的完全平方数的 **最少数量** 。

**完全平方数** 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，`1`、`4`、`9` 和 `16` 都是完全平方数，而 `3` 和 `11` 不是。

 **示例 1：**

```
输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
```

**题解：**

```js
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  // dp 存储每位数最多拆出的平方数个数
  let dp = [0]
  for (let i = 1; i <= n; i++) {
    // 最坏的情况是全部拆成1+1+1...
    dp[i] = i
    for (let j = 1; i - j ** 2 >= 0; j++) {
      /**
       * 假设现在是 i=8
       * 拆出 一个1(1*1)，剩下7，那么这次就总共拆成 1+dp[7]个
       * 拆出 一个4(2*2)，剩下4，那么这次就总共拆成 1+dp[4]个
       * 依次类推，拆出 9(3*3)，超过8了，退出
       * 注意上面的 1+dp[x] 的这个1，指的是你拆出了 “1”个平方数，是“个数”
       */
      dp[i] = Math.min(1 + dp[i - j ** 2], dp[i])
    }
  }
  return dp[n]
};
```

这题在 BFS 中也做到过，回顾一下：

```js
var numSquares = function (n) {
  let level = 0
  let queue = [n] // 存放待处理值
  let visited = new Set([n]) // 存放已经计算过的值

  while (queue.length !== 0) {
    level++
    let len = queue.length
    while (len--) {
      let now = queue.shift()
      /**
       * 这里的思路：
       * 每一层用当前值循环减去从1开始的平方数
       * 减下来的值 temp 如果是 0 ，说明已经结束
       * 如果不为 0 ，说明还需要再减平方数，所以把这些 temp 塞进 queue
       * 但是注意，如果这个 temp 已经访问过，那么再遇到的时候就不要访问了，因为那时候肯定不是最短路径
       * 比如 13 ，在 13-1*1-2*2=8,这是第三层遇到了8，
       * 然后在 13-2*2-1*1=8 又遇到了8,
       * 这种重复值层数越高就可能越多，所以用 visited 去重
       * 
       * 为什么用 level 来决定结果？
       * 因为每减一次，不管你减多少，都肯定减去了一个平方数
       */
      for (let i = 1; i ** 2 <= now; i++) {
        let temp = now - i ** 2
        if (temp === 0) {
          return level
        }
        if (!visited.has(temp)) {
          visited.add(temp)
          queue.push(temp)
        }
      }
    }
  }
  return level
};
```

## [91. 解码方法](https://leetcode-cn.com/problems/decode-ways/)

一条包含字母 `A-Z` 的消息通过以下映射进行了 **编码** ：

```
'A' -> 1
'B' -> 2
...
'Z' -> 26
```

要 **解码** 已编码的消息，所有数字必须基于上述映射的方法，反向映射回字母（可能有多种方法）。例如，`"111"` 可以将 `"1"` 中的每个 `"1"` 映射为 `"A"` ，从而得到 `"AAA"` ，或者可以将 `"11"` 和 `"1"`（分别为 `"K"` 和 `"A"` ）映射为 `"KA"` 。注意，`"06"` 不能映射为 `"F"` ，因为 `"6"` 和 `"06"` 不同。

给你一个只含数字的 **非空** 字符串 `num` ，请计算并返回 **解码** 方法的 **总数** 。

题目数据保证答案肯定是一个 **32 位** 的整数。

 

**示例 1：**

```
输入：s = "12"
输出：2
解释：它可以解码为 "AB"（1 2）或者 "L"（12）。
```

**示例 2：**

```
输入：s = "0"
输出：0
解释：没有字符映射到以 0 开头的数字。含有 0 的有效映射是 'J' -> "10" 和 'T'-> "20" 。由于没有字符，因此没有有效的方法对此进行解码，因为所有数字都需要映射。
```

**题解：**

`dp` 用来记录到那一位数时的组合数，这就是**跳台阶问题**，假设我当前是 `i` 位，那么我有可能是从 `i-1` 位来的，也有可能是从 `i-2` 位来的，那么 `dp[i]` 就等于是 `dp[i-1]+dp[i-2]`

另外注意一下限制条件处理就好了。

```js
/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  // String.fromCharCode((65+0))
  //  开头0返回
  if (s.startsWith("0")) return 0

  let dp = new Array(s.length + 1).fill(0)
  dp[0] = 1
  dp[1] = 1

  for (let i = 2; i <= s.length; i++) {
    let a = +s.slice(i - 1, i), b = +s.slice(i - 2, i)
    if (a > 0) {
      dp[i] += dp[i - 1]
    }
    if (b >= 10 && b <= 26) {
      dp[i] += dp[i - 2]
    }
  }
  return dp[s.length]
};
```

# 最长递增子序列

## [300. 最长递增子序列](https://leetcode-cn.com/problems/longest-increasing-subsequence/)

给你一个整数数组 `nums` ，找到其中最长严格递增子序列的长度。

子序列是由数组派生而来的序列，删除（或不删除）数组中的元素而不改变其余元素的顺序。例如，`[3,6,2,7]` 是数组 `[0,3,1,6,2,2,7]` 的子序列。

 **示例 1：**

```
输入：nums = [10,9,2,5,3,7,101,18]
输出：4
解释：最长递增子序列是 [2,3,7,101]，因此长度为 4 。
```

**题解：**

数组：`[4,10,4,3,8,9]` 

`dp`：`[1,2,1,1,2,3]`

`dp` 存储**以这一位数作为子序列的结束**时候的最大子序列长度，每到一个数，开始从前面找，当当前数**大于**找到的数时候，对比当前的 `dp[i]` 和 `dp[j]+1` 哪个更大。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  let dp = new Array(nums.length).fill(1)
  
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)
};
```

## [646. 最长数对链](https://leetcode-cn.com/problems/maximum-length-of-pair-chain/)

给出 `n` 个数对。 在每一个数对中，第一个数字总是比第二个数字小。

现在，我们定义一种跟随关系，当且仅当 `b < c` 时，数对`(c, d)` 才可以跟在 `(a, b)` 后面。我们用这种形式来构造一个数对链。

给定一个数对集合，找出能够形成的最长数对链的长度。你不需要用到所有的数对，你可以以任何顺序选择其中的一些数对来构造。

**示例：**

```
输入：[[1,2], [2,3], [3,4]]
输出：2
解释：最长的数对链是 [1,2] -> [3,4]
```

**题解：**

方法一：动态规划

和上一题一样，本题中不是优解。思路一样，记得加上排序（用 `a[0]` 排 ）。

```js
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[0] - b[0])
  let dp = new Array(pairs.length).fill(1)

  for (let i = 1; i < pairs.length; i++) {
    for (let j = 0; j < i; j++) {
      if (pairs[i][0] > pairs[j][1]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }
  return Math.max(...dp)

};
```

方法二：贪心

需要记住目前最大的 `a[1]`，贪心是一个构筑链的过程，如果 `a[0]` 比 `max` 大才能加入链【因为比 `max` 大就代表比前面所有的都大(前提是 `a[1]` 是排序过的)】

```js
/**
 * @param {number[][]} pairs
 * @return {number}
 */
var findLongestChain = function (pairs) {
  pairs.sort((a, b) => a[1] - b[1])
  let ans = 1
  let max = pairs[0][1]
  for (let i = 1; i < pairs.length; i++) {
    if (pairs[i][0] > max) {
      max = pairs[i][1]
      ans++
    }
  }
  return ans
};
```

## [376. 摆动序列⭐](https://leetcode-cn.com/problems/wiggle-subsequence/)

如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为**摆动序列。**第一个差（如果存在的话）可能是正数或负数。少于两个元素的序列也是摆动序列。

例如， `[1,7,4,9,2,5]` 是一个摆动序列，因为差值 `(6,-3,5,-7,3)` 是正负交替出现的。相反, `[1,4,7,2,5]` 和 `[1,7,4,5,5]` 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。

给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，剩下的元素保持其原始顺序。

**示例 1:**

```
输入: [1,7,4,9,2,5]
输出: 6 
解释: 整个序列均为摆动序列。
```

**示例 2:**

```
输入: [1,17,5,10,13,15,10,5,16,8]
输出: 7
解释: 这个序列包含几个长度为 7 摆动序列，其中一个可为[1,17,10,13,10,16,8]。
```

**题解：**

方法一：贪心

有一个 `flag` ，0代表上一个没有值或者是上两个之间的关系是相等的，1代表上两个的关系是上升，2代表上两个关系是下降的。当 `nums[i] - nums[i - 1] > 0` 且上两个的关系不是上升的时候，`ans++` ，并且更新 `flag` ，反之亦然。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var wiggleMaxLength = function (nums) {
  if (nums.length < 2) return nums.length
  // 0 null 1 up 2 down
  let flag = 0
  let ans = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 0 && flag != 1) {
      ans++
      flag = 1
    }
    else if (nums[i] - nums[i - 1] < 0 && flag != 2) {
      ans++
      flag = 2
    }
  }
  return ans
};
```

方法二：动态规划

当前数大于前面数的时候，两种选择，一种是把down数组加上这个数变成up数组，一种是替换up数组的最后一个上升的值。反之同理

假设我们有

```
nums:[1,4,7,2,5]
up:[1]
down:1[1]
```

1. 4 > 1  ①down数组加上这个数变成up数组：[1,4] ②替换up数组的最后一个上升的值 [4]。我们选择前者。

```
up:[1,4]
down:[4]
```

2. 7 > 4 ①down数组加上这个数变成up数组：[4,7] ②替换up数组的最后一个上升的值 [1,7]。选谁都行。

```
up:[4,7]
down:[4]
```

3. 2 < 7 ①up数组加上这个数变成down数组：[4,7,2] ②替换down数组的最后一个下降的值 [2]。我们选择前者。

```
up:[4,7]
down:[4,7,2]
```

4. 5 > 2 ①down数组加上这个数变成up数组：[1,7,2,5] ②替换up数组的最后一个上升的值 [1,5]。我们选择前者。

```
up:[4,7,2,5]
down:[4,7,2]
```

其实变化的就是 up 和 down 的长度，我们可以用常数来做：

```js
var wiggleMaxLength = function (nums) {
  if (nums.length < 2) return nums.length

  let up = down = 1

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[i - 1] > 0) {
      up = Math.max(up, down + 1)
    } else if (nums[i] - nums[i - 1] < 0) {
      down = Math.max(down, up + 1)
    }
  }
  return Math.max(up,down)
};
```







# 其他

## [53. 最大子序和](https://leetcode-cn.com/problems/maximum-subarray/)

给定一个整数数组 `nums` ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

**示例 1：**

```
输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
```

**题解：**

`dp` 每一位是到当前位置的最大和，不是实际的最大和

只要上一位 `dp[i-1]` + 当前 `num[i]`  比 `num[i]` 大，就应该加上，如果反过来的话说明 `dp[i-1]` 一定是负数【因为正数加任何负数都比这个负数大】，只要是和为负数了就应该及时止损，用大的值替代。

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let dp = []
  dp[0] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 1], nums[i])
  }
  return Math.max(...dp)
};
```

对于这种每次只用到了前一位 `dp[i-1]` 的题目，可以考虑用常数替代

```js
var maxSubArray = function (nums) {
  let ans = nums[0]
  let max  = nums[0]
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(nums[i] + max, nums[i])
    // 每次及时更新 ans 的最大值
    ans=Math.max(ans,max)
  }
  return ans
};
```

