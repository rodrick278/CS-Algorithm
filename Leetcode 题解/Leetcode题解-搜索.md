- [BFS⭐](#BFS)
  - [1091. 二进制矩阵中的最短路径](#1091-二进制矩阵中的最短路径)
  - [279. 完全平方数](#279-完全平方数)

# BFS⭐

**广度优先搜索** 一层一层地进行遍历，每层遍历都是以上一层遍历的结果作为起点，遍历一个距离能访问到的所有节点。需要注意的是，遍历过的节点不能再次被遍历。

下面第一题的解题思路基本是模板：

## [1091. 二进制矩阵中的最短路径](https://leetcode-cn.com/problems/shortest-path-in-binary-matrix/)

在一个 N × N 的方形网格中，每个单元格有两种状态：空（0）或者阻塞（1）。

一条从左上角到右下角、长度为 `k` 的畅通路径，由满足下述条件的单元格 `C_1, C_2, ..., C_k` 组成：

- 相邻单元格 `C_i` 和 `C_{i+1}` 在八个方向之一上连通（此时，`C_i` 和 `C_{i+1}` 不同且共享边或角）
- `C_1` 位于 `(0, 0)`（即，值为 `grid[0][0]`）
- `C_k` 位于 `(N-1, N-1)`（即，值为 `grid[N-1][N-1]`）
- 如果 `C_i` 位于 `(r, c)`，则 `grid[r][c]` 为空（即，`grid[r][c] == 0`）

返回这条从左上角到右下角的最短畅通路径的长度。如果不存在这样的路径，返回 -1 。

 

**示例 1：**

输入：[[0,1],[1,0]]

输出：2

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/06/16/example1_1.png" width=30%><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/06/16/example1_2.png" width=30%>



**示例 2：**

输入：[[0,0,0],[1,1,0],[1,1,0]]

输出：4

<img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/06/16/example2_1.png" width=30%><img src="https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2019/06/16/example2_2.png" width=30%>

 

**提示：**

1. `1 <= grid.length == grid[0].length <= 100`
2. `grid[i][j]` 为 `0` 或 `1`

**题解：**

1. 排除特殊阻塞情况
2. 把初始值压入队列 list
3. 找出和搜索值距离相等的八个方向 `findArrs` 
4. 三层循环：
   1. 判断 list 是否空了，空了还没 return 说明没结果
   2. 当前需要搜索的几个目标是否搜索完了，因为 list 在后面会被反复添加，所以在开始处用 i 记录一下长度作为循环依据
   3. 循环八个方向

5. pass 掉越界&已经标记过的&不符合要求的
6. 标记这个位置为已遍历
7. 塞入队列，作为下次循环需要循环的值

因为这八个方向不管有多少个为 0 的位置，他们都只能取一个，也就是 `res++` 

```js
/*
 * @lc app=leetcode.cn id=1091 lang=javascript
 *
 * [1091] 二进制矩阵中的最短路径
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {
  let res = 1
  let k = grid.length - 1
  // 开头结尾阻塞情况
  if (grid[0][0] == 1 || grid[k][k] == 1) return -1
  // 长度为1情况
  if (grid.length == 1) return 1

  let list = [[0, 0]]// 存储遍历值，初始值为第一个
  let findArrs = [[-1, -1], [0, -1], [1, -1], [-1, 0], [1, 0], [-1, 1], [0, 1], [1, 1]]
  let loopX, loopY
  // 记得把初始值标记
  grid[0][0] = 1

  // 判断队列里是否还有待循环的
  while (list.length != 0) {
    let len = list.length
    // 放在下面的while前面，一定会有一个下一层的值，先加上
    res++
    // 这个while必须用len来判断，因为list的内容在不断插入，而我们一轮只需要遍历开始插入前的那几个位置就行
    while (len--) {
      let [x, y] = list.shift()
      for (let item of findArrs) {
        loopX = x + item[0]
        loopY = y + item[1]
        // 如果到达了终点 返回res【前面res已经加过了】
      	if (x == k && y == k) return res
        // 判断越界或者为1
        if (loopX > k || loopY > k || loopX < 0 || loopY < 0 || grid[loopX][loopY] == 1) continue;
        // 把这个位置标记为已遍历
        grid[loopX][loopY] = 1
        // 塞进队列
        list.push([loopX, loopY])
      }
    }
  }
  return -1
};
```

## [279. 完全平方数](https://leetcode-cn.com/problems/perfect-squares/)

给定正整数 *n*，找到若干个完全平方数（比如 `1, 4, 9, 16, ...`）使得它们的和等于 *n*。你需要让组成和的完全平方数的个数最少。

给你一个整数 `n` ，返回和为 `n` 的完全平方数的 **最少数量** 。

**完全平方数** 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，`1`、`4`、`9` 和 `16` 都是完全平方数，而 `3` 和 `11` 不是。

**示例 1：**

```
输入：n = 12
输出：3 
解释：12 = 4 + 4 + 4
```

**示例 2：**

```
输入：n = 13
输出：2
解释：13 = 4 + 9
```

**题解：**

这里的思路：

1. 每一层用当前值循环减去从1开始的平方数，减下来的值 temp 如果是 0 ，说明已经结束
2. 如果不为 0 ，说明还需要再减平方数，所以把这些 temp 塞进 queue
3. 但是注意，如果这个 temp 已经访问过，那么再遇到的时候就不要访问了，因为那时候肯定不是最短路径

> 比如 13 ，在 13-1\*1-2\*2=8,这是第三层遇到了8，然后在 13-2\*2-1\*1=8 又遇到了8,这种重复值层数越高就可能越多，所以用 visited 去重。
>
> 也有可能是你在第三层碰到的值，我在第二层已经扔进过 queue 处理过了。

**为什么用 level 来决定结果？**

因为每减一次，不管你减多少，都肯定减去了一个平方数，**level 就是减了几次平方数的次数**。

下图每两个 step 中间就相当于我们的 level，step2 的 3 是 `7-1` ，图上画错了

<img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9waWMubGVldGNvZGUtY24uY29tL0ZpZ3VyZXMvMjc5LzI3OV9ncmVlZHlfYmZzLnBuZw?x-oss-process=image/format,png" width=80%>

```js
/*
 * @lc app=leetcode.cn id=279 lang=javascript
 *
 * [279] 完全平方数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  let level = 0
  let queue = [n] // 存放待处理值
  let visited = new Set([n]) // 存放已经计算过的值

  while (queue.length !== 0) {
    level++
    let len = queue.length
    while (len--) {
      let now = queue.shift()
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

