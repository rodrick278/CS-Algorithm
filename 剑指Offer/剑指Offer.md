**栈与队列**

- [09. 用两个栈实现队列](#09-用两个栈实现队列)

- [30. 包含min函数的栈](#30-包含min函数的栈)

**链表**

- [06. 从尾到头打印链表](#06-从尾到头打印链表)
- [24. 反转链表](#24-反转链表)
- [35. 复杂链表的复制](#35-复杂链表的复制)

**字符串**

- [05. 替换空格](#05-替换空格)
- [58. 左旋转字符串](#58-左旋转字符串)

**查找**

- [03. 数组中重复的数字](#03-数组中重复的数字)
- [53. 在排序数组中查找数字 I](#53-在排序数组中查找数字-I)
- [53. 0～n-1中缺失的数字](#53-0～n-1中缺失的数字)
- [04. 二维数组中的查找](#04-二维数组中的查找)
- [11. 旋转数组的最小数字](#11-旋转数组的最小数字)
- [50. 第一个只出现一次的字符](#50-第一个只出现一次的字符)

**搜索和回溯**

- [32. 从上到下打印二叉树1](#32-从上到下打印二叉树1)
- [32. 从上到下打印二叉树2](#32-从上到下打印二叉树2)
- [32. 从上到下打印二叉树3](#32-从上到下打印二叉树3)
- [26. 树的子结构](#26-树的子结构)
- [27. 反转二叉树](#27-反转二叉树)
- [28. 对称的二叉树](#28-对称的二叉树)



## [09. 用两个栈实现队列](https://leetcode-cn.com/problems/yong-liang-ge-zhan-shi-xian-dui-lie-lcof/)

用两个栈实现一个队列。队列的声明如下，请实现它的两个函数 `appendTail` 和 `deleteHead` ，分别完成在队列尾部插入整数和在队列头部删除整数的功能。(若队列中没有元素，`deleteHead` 操作返回 -1 )

 

**示例 1：**

```
输入：
["CQueue","appendTail","deleteHead","deleteHead"]
[[],[3],[],[]]
输出：[null,null,3,-1]
```

**示例 2：**

```
输入：
["CQueue","deleteHead","appendTail","appendTail","deleteHead","deleteHead"]
[[],[],[5],[2],[],[]]
输出：[null,-1,null,null,5,2]
```

**提示：**

- `1 <= values <= 10000`
- `最多会对 appendTail、deleteHead 进行 10000 次调用`

**题解:**

注意一下题目要求是栈 一个栈维护进入 一个维护删除用

```js
// @algorithm @lc id=100273 lang=javascript
// @title yong-liang-ge-zhan-shi-xian-dui-lie-lcof
var CQueue = function () {
  // 用两个栈 那么只可以用pushpop
  this.stackA = [];
  this.stackB = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  this.stackA.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  if(this.stackB.length !== 0){
    return this.stackB.pop()
  }else{
    while(this.stackA.length){
      this.stackB.push(this.stackA.pop())
    }

    if(this.stackB.length){
      return this.stackB.pop()
    }else{
      return -1
    }
  }
};

/**
 * Your CQueue object will be instantiated and called as such:
 * var obj = new CQueue()
 * obj.appendTail(value)
 * var param_2 = obj.deleteHead()
 */
```

## [30. 包含min函数的栈](https://leetcode-cn.com/problems/bao-han-minhan-shu-de-zhan-lcof/)

定义栈的数据结构，请在该类型中实现一个能够得到栈的最小元素的 min 函数在该栈中，调用 min、push 及 pop 的时间复杂度都是 O(1)。

 

**示例:**

```
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.min();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.min();   --> 返回 -2.
```

 

**提示：**

1. 各函数的调用总次数不超过 20000 次



**题解：**

注意一下 `push(0)` 的情况 用 `this.minNum === null` 判断  因为要O(1) 所以维护一个常量  也有维护一个最小值栈的方式 差不多 也没必要

```js
// @algorithm @lc id=100302 lang=javascript
// @title bao-han-minhan-shu-de-zhan-lcof
/**
 * initialize your data structure here.
 */
var MinStack = function () {
  this.stack = [];
  this.minNum = null;
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (this.minNum === null) {
    this.minNum = x;
  } else {
    this.minNum = Math.min(this.minNum, x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const res = this.stack.pop();
  if(res === this.minNum){
    this.minNum = Math.min(...this.stack)
  }
};

/**
 * 返回栈尾
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minNum;
};

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
```

## [06. 从尾到头打印链表](https://leetcode-cn.com/problems/cong-wei-dao-tou-da-yin-lian-biao-lcof/)

输入一个链表的头节点，从尾到头反过来返回每个节点的值（用数组返回）。

 

**示例 1：**

```
输入：head = [1,3,2]
输出：[2,3,1]
```

 

**限制：**

```
0 <= 链表长度 <= 10000
```

**题解：**

没啥好说的 正常写或者递归

```js
// @algorithm @lc id=100282 lang=javascript 
// @title cong-wei-dao-tou-da-yin-lian-biao-lcof
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {number[]}
 */
var reversePrint = function(head) {
  const res = []
  while(!!head){
    res.splice(0,0,head.val)
    head = head.next
  }
  return res
};

var reversePrint1 = function(head,arr = []) {
  if(head!==null){
    if(head.next){
      reversePrint1(head.next,arr)
    }
    arr.push(head.val)
  }

  return arr
};
```

## [24. 反转链表](https://leetcode-cn.com/problems/fan-zhuan-lian-biao-lcof/)

定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

 

**示例:**

```
输入: 1->2->3->4->5->NULL
输出: 5->4->3->2->1->NULL
```

 

**限制：**

```
0 <= 节点个数 <= 5000
```

**题解：**

```js
// @algorithm @lc id=100298 lang=javascript 
// @title fan-zhuan-lian-biao-lcof
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
  // null - 1null - 21null - 321null ...
  let prev = null
  // 12345 - 2345 - 345...
  let curr = head
  while(curr){
    // 就是先让curr成为结果 再赋值给prev
    // 2345
    const next = curr.next
    // null
    curr.next = prev
    // 1null
    prev = curr 
    // 2345
    curr = next
  }
  return prev

};
```

## [35. 复杂链表的复制](https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof/)

请实现 `copyRandomList` 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 `next` 指针指向下一个节点，还有一个 `random` 指针指向链表中的任意节点或者 `null`。

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e1.png)

```
输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
```

**示例 2：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e2.png)

```
输入：head = [[1,1],[2,1]]
输出：[[1,1],[2,1]]
```

**示例 3：**

**![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2020/01/09/e3.png)**

```
输入：head = [[3,null],[3,0],[3,null]]
输出：[[3,null],[3,0],[3,null]]
```

**示例 4：**

```
输入：head = []
输出：[]
解释：给定的链表为空（空指针），因此返回 null。
```

 

**提示：**

- `-10000 <= Node.val <= 10000`
- `Node.random` 为空（null）或指向链表中的节点。
- 节点数目不超过 1000 。

**题解：**

难点在于理解题目，复制链表需要new node，且第一轮的时候，random会存在未创建的关系，所以用map先保存head和目标的关系，目标只存val值，在第二轮中再进行next和random的绑定，因为是复制，所以必须都是新的对象。链表结构的本质也就是一堆对象之间互相指向

```js
// @algorithm @lc id=100300 lang=javascript 
// @title fu-za-lian-biao-de-fu-zhi-lcof
/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
var copyRandomList = function(head) {
  if(!head) return null
  let map = new Map()
  let copyHead = head
  while(copyHead){
    // 先把val设上
    map.set(copyHead, new Node(copyHead.val))
    copyHead = copyHead.next
  }
  copyHead = head
  while(copyHead){
    const target = map.get(copyHead)
    target.next = map.get(copyHead.next) ?? null
    target.random = map.get(copyHead.random)

    copyHead = copyHead.next
  }

  return map.get(head)
};
```

## [05. 替换空格](https://leetcode-cn.com/problems/ti-huan-kong-ge-lcof/)

请实现一个函数，把字符串 `s` 中的每个空格替换成"%20"。

 

**示例 1：**

```
输入：s = "We are happy."
输出："We%20are%20happy."
```

 

**限制：**

```
0 <= s 的长度 <= 10000
```

**题解：**

```js
// @algorithm @lc id=100280 lang=javascript 
// @title ti-huan-kong-ge-lcof
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
  // return s.replaceAll(' ','%20')
  s = s.split("")
  for(let i in s){
    if(s[i] === ' '){
      s[i] = '%20'
    }
  }

  return s.join('')
};
```

## [58. 左旋转字符串](https://leetcode-cn.com/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/)

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

 

**示例 1：**

```
输入: s = "abcdefg", k = 2
输出: "cdefgab"
```

**示例 2：**

```
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
```

 

**限制：**

- `1 <= k < s.length <= 10000`

## [03. 数组中重复的数字](https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/)

找出数组中重复的数字。


在一个长度为 n 的数组 nums 里的所有数字都在 0～n-1 的范围内。数组中某些数字是重复的，但不知道有几个数字重复了，也不知道每个数字重复了几次。请找出数组中任意一个重复的数字。

**示例 1：**

```
输入：
[2, 3, 1, 0, 2, 5, 3]
输出：2 或 3 
```

 

**限制：**

```
2 <= n <= 100000
```

**题解：**

```js
// @algorithm @lc id=100275 lang=javascript 
// @title shu-zu-zhong-zhong-fu-de-shu-zi-lcof
/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function(nums) {
  const set = new Set()

  for(let num of nums){
    if(set.has(num)) return num
    set.add(num)
  }
};
```

## [53. 在排序数组中查找数字 I](https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/)

统计一个数字在排序数组中出现的次数。

 

**示例 1:**

```
输入: nums = [5,7,7,8,8,10], target = 8
输出: 2
```

**示例 2:**

```
输入: nums = [5,7,7,8,8,10], target = 6
输出: 0
```

 

**提示：**

- `0 <= nums.length <= 105`
- `-109 <= nums[i] <= 109`
- `nums` 是一个非递减数组
- `-109 <= target <= 109`

**题解：**

```js
// @algorithm @lc id=100329 lang=javascript 
// @title zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
  // 暴力
  // if(nums.length === 0) return 0
  // let res = 0
  // for (const num of nums) {
  //   if(num===target){
  //     res++
  //   }else if(num>target){
  //     return res
  //   }
  // }
  // return res

  // 二分
  let [l,r] = [0,nums.length]
  while(nums[l]<target) l++
  while(nums[r]>target) r--

  return l-r>=0?l-r+1:0

};
```

## [53. 0～n-1中缺失的数字](https://leetcode-cn.com/problems/que-shi-de-shu-zi-lcof/)

一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

 

**示例 1:**

```
输入: [0,1,3]
输出: 2
```

**示例 2:**

```
输入: [0,1,2,3,4,5,6,7,9]
输出: 8
```

 

**限制：**

```
1 <= 数组长度 <= 10000
```

**题解：**

排序数组的搜索问题使用二分方式

```js
// @algorithm @lc id=100331 lang=javascript
// @title que-shi-de-shu-zi-lcof
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function (nums) {
  let [l, r] = [0, nums.length - 1];
  // 二分 lr终归会指向同一个位置 
  // 那个位置的值是【第一个下标错误的值】例如[0,1,3]的数字3 又或者是[1,2]的数组1
  // 注意r可能一开始就是正确的值 比如[0,1,2] r一开始就是2 l最后会走到3
  // 这道题的 l<=r 跳出比较巧妙 用l<r就会处理比较麻烦
  while (l <= r) {
    const mid = Math.floor(l + (r - l) / 2);
    if (nums[mid] === mid) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return l;
};
```

## [04. 二维数组中的查找](https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof/)

在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

 

**示例:**

现有矩阵 matrix 如下：

```
[
  [1,   4,  7, 11, 15],
  [2,   5,  8, 12, 19],
  [3,   6,  9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30]
]
```

给定 target = `5`，返回 `true`。

给定 target = `20`，返回 `false`。

 

**限制：**

```
0 <= n <= 1000
0 <= m <= 1000
```

**题解：**

本题关键在于需要选择从右上或者左下开始查找更方便 如果从左上的话判断很多很麻烦：

<img src="https://pic.leetcode-cn.com/1642168596-vIVQKk-image.png" width=40% /><img src="https://pic.leetcode-cn.com/1642168631-oTxxgs-image.png" width=40% />



```js
// @algorithm @lc id=100276 lang=javascript
// @title er-wei-shu-zu-zhong-de-cha-zhao-lcof
/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  // 左上角开始计算
  // if (matrix.length === 0) return false;
  // let [r, c] = [0, 0];

  // while (r>=0 && r < matrix.length && c>=0 && c < matrix[0].length) {
  //   if (matrix[r][c] === target) return true;
  //   if (matrix[r][c] < target) {
  //     if (matrix[r][c + 1] <= target) {
  //       c++;
  //     } else {
  //       r++;
  //     }
  //   } else if (matrix[r][c] > target) {
  //     c--;
  //   }
  // }
  // return false;

  // 右上角开始计算
  if (matrix.length === 0) return false;
  let [r, c] = [0, matrix[0].length - 1];
  while(r<=matrix.length-1&&c>=0){
    if(matrix[r][c]===target) return true

    if(matrix[r][c]>target){
      c--
    }else{
      r++
    }
  }
  return false
}
```

## [11. 旋转数组的最小数字](https://leetcode-cn.com/problems/xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof/)

把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。

给你一个可能存在 **重复** 元素值的数组 `numbers` ，它原来是一个升序排列的数组，并按上述情形进行了一次旋转。请返回旋转数组的最小元素。例如，数组 `[3,4,5,1,2]` 为 `[1,2,3,4,5]` 的一次旋转，该数组的最小值为1。 

**示例 1：**

```
输入：[3,4,5,1,2]
输出：1
```

**示例 2：**

```
输入：[2,2,2,0,1]
输出：0
```

**题解：**

【难题】

本题的关键在于有重复元素的处理 遇到难以通过分辨m的时候 用暴力r--的方式找到合适的值 以及m可能是最小值的情况下不能够 r=m-1

```js
// @algorithm @lc id=100278 lang=javascript
// @title xuan-zhuan-shu-zu-de-zui-xiao-shu-zi-lcof
/**
 * @param {number[]} numbers
 * @return {number}
 */
var minArray = function (numbers) {
  let [l,r] = [0,numbers.length-1] 
  
  while(l<r){
    const m = ~~(l+(r-l)/2)

    if(numbers[m]<numbers[r]){
      // [9,1,2,3]
      // 中间值比右边小 说明m-r这段是顺序的
      // 不能用m<l判断
      // 为什么r=m而不是m-1？因为这个m可能是我们的目标值
      r=m
    }else if(numbers[m]>numbers[r]){
      // [3,4,5,1,2]
      // 这里是m+1 因为number[m]都比右边大了 那肯定不是最小值 所以可以排除
      l=m+1
    }else{
      // 重点处理 [10,1,10,10,10] || [10,10,10,1,10] 这种 让r变小一直到碰到l 或者碰到1
      r--
    }
  }

  return numbers[l]
};
```

## [50. 第一个只出现一次的字符](https://leetcode-cn.com/problems/di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof/)

在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

**示例 1:**

```
输入：s = "abaccdeff"
输出：'b'
```

**示例 2:**

```
输入：s = "" 
输出：' '
```

**题解**

```js
// @algorithm @lc id=100316 lang=javascript
// @title di-yi-ge-zhi-chu-xian-yi-ci-de-zi-fu-lcof
/**
 * @param {string} s
 * @return {character}
 */
var firstUniqChar = function (s) {
  const map = {};

  for (const char of s) {
    if (map[char]) {
      map[char] = map[char] + 1;
    } else {
      map[char] = 1;
    }
  }
  for (const char in map) {
    if (map[char] === 1) {
      return char;
    }
  }

  return " ";
};
```

## [32. 从上到下打印二叉树1](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-lcof/)

从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

 

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回：

```
[3,9,20,15,7]
```

**题解**

```js
// @algorithm @lc id=100311 lang=javascript
// @title cong-shang-dao-xia-da-yin-er-cha-shu-lcof
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const res = [];

  const list = [root];

  while (list.length) {
    let len = list.length;
    while (len--) {
      const node = list.shift();
      res.push(node.val);
      node.left && list.push(node.left);
      node.right && list.push(node.right);
    }
  }
  return res;
};
```

## [32. 从上到下打印二叉树2](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof/)

从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。

 

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [9,20],
  [15,7]
]
```

**题解**

```js
// @algorithm @lc id=100312 lang=javascript 
// @title cong-shang-dao-xia-da-yin-er-cha-shu-ii-lcof
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) return [];
  const res = [];

  const list = [root];

  while (list.length) {
    let len = list.length;
    const subarr = []
    while (len--) {
      const node = list.shift();
      subarr.push(node.val);
      node.left && list.push(node.left);
      node.right && list.push(node.right);
    }
    res.push(subarr)
  }
  return res;
};
```

## [32. 从上到下打印二叉树3](https://leetcode-cn.com/problems/cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof/)

请实现一个函数按照之字形顺序打印二叉树，即第一行按照从左到右的顺序打印，第二层按照从右到左的顺序打印，第三行再按照从左到右的顺序打印，其他行以此类推。

 

例如:
给定二叉树: `[3,9,20,null,null,15,7]`,

```
    3
   / \
  9  20
    /  \
   15   7
```

返回其层次遍历结果：

```
[
  [3],
  [20,9],
  [15,7]
]
```

 

**提示：**

1. `节点总数 <= 1000`

**题解**

```js
// @algorithm @lc id=100314 lang=javascript
// @title cong-shang-dao-xia-da-yin-er-cha-shu-iii-lcof
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return [];
  const res = [];
  let flag = true;
  const list = [root];

  while (list.length) {
    let len = list.length;
    const subarr = [];
    while (len--) {
      const node = list.shift();
      flag ? subarr.push(node.val) : subarr.unshift(node.val);
      node.left && list.push(node.left);
      node.right && list.push(node.right);
    }
    res.push(subarr);
    flag = !flag;
  }
  return res;
};
```

## [26. 树的子结构](https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof/)

输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)

B是A的子结构， 即 A中有出现和B相同的结构和节点值。

例如:
给定的树 A:

```
  3  
 / \  
 4  5 
/ \ 
1  2
```


给定的树 B：

```
  4
 /
 1
```


返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

**示例 1：**

```
输入：A = [1,2,3], B = [3,1]
输出：false
```

**示例 2：**

```
输入：A = [3,4,5,1,2], B = [4,1]
输出：true
```

**限制：**

```
0 <= 节点个数 <= 10000
```

**题解**

拆分的思想 sub函数用来找到头结点一致的子树才开始遍历B 否则B一直不被遍历

```js
// @algorithm @lc id=100287 lang=javascript
// @title shu-de-zi-jie-gou-lcof
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
  if (!A || !B) return false;

  // atree是否包含btree辅助函数
  const sub = (aTree, bTree) => {
    // 如果把B遍历完了 那说明前面都匹配
    if (!bTree) return true;

    /**
     * 错误情况：
     * 1. b还有 a没了【发生在a已经遍历到最后的节点还没找到和b一样的头val】
     * 2. ab val相同 但是后续的左子或者右子不一样
     */
    if (
      aTree &&
      aTree.val === bTree.val &&
      sub(aTree.left, bTree.left) &&
      sub(aTree.right, bTree.right)
    ) {
      return true;
    }

    return false;
  };

  // 先判断AB是不是val已经一样 如果不一样 递归A的子树 递归里面如果val还不一样还会继续走这里递归
  return sub(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
};
```

## [27. 反转二叉树](https://leetcode-cn.com/problems/er-cha-shu-de-jing-xiang-lcof/)

请完成一个函数，输入一个二叉树，该函数输出它的镜像。

例如输入：

`   4  /  \ 2   7 / \  / \1  3 6  9`
镜像输出：

```
   4  /  \ 7   2 / \  / \9  6 3  1
```

 

**示例 1：**

```
输入：root = [4,2,7,1,3,6,9]
输出：[4,7,2,9,6,3,1]
```

 

**限制：**

```
0 <= 节点个数 <= 1000
```

**题解**

```js
// @algorithm @lc id=100288 lang=javascript
// @title er-cha-shu-de-jing-xiang-lcof
/**
 * Definition for a binary tree root.
 * function Treeroot(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {Treeroot} root
 * @return {Treeroot}
 */
var mirrorTree = function (root) {
  if (!root) return root;

  [root.left, root.right] = [root.right, root.left];
  mirrorTree(root.left);
  mirrorTree(root.right);

  return root;
};

```

## [28. 对称的二叉树](https://leetcode-cn.com/problems/dui-cheng-de-er-cha-shu-lcof/)

请实现一个函数，用来判断一棵二叉树是不是对称的。如果一棵二叉树和它的镜像一样，那么它是对称的。

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

```
   1  
 /   \ 
 2    2 
/  \ /  \
3  4 4  3
```


但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

```
 1  
/ \ 
2  2  
 \  \  
  3   3
```



 

**示例 1：**

```
输入：root = [1,2,2,3,4,4,3]
输出：true
```

**示例 2：**

```
输入：root = [1,2,2,null,3,null,3]
输出：false
```

 

**限制：**

```
0 <= 节点个数 <= 1000
```

**题解**

```js
// @algorithm @lc id=100289 lang=javascript
// @title dui-cheng-de-er-cha-shu-lcof
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const isMirror = (a, b) => {
    if (!a && !b) return true;
    // a b 要么都有要么都没有
    if (
      a &&
      b &&
      a.val === b.val &&
      isMirror(a.left, b.right) &&
      isMirror(a.right, b.left)
    ) {
      return true;
    }
    return false;
  };
  // 空的也算对称
  if (!root) return true;

  return isMirror(root.left, root.right);
};
```

