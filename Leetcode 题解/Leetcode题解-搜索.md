- [BFS](#BFS)
  - [1091. 二进制矩阵中的最短路径](#1091-二进制矩阵中的最短路径)

# BFS

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
  let res = 0
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
    // 放在下面的while前面，①第一次进入的时候 0=>1 ② 最后一次进入的时候里面会直接返回res
    res++
    // 这个while必须用len来判断，因为list的内容在不断插入，而我们一轮只需要遍历开始插入前的那几个位置就行
    while (len--) {
      let [x, y] = list.shift()
      // 如果到达了终点 返回
      if (x == k && y == k) return res
      for (let item of findArrs) {
        loopX = x + item[0]
        loopY = y + item[1]
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

