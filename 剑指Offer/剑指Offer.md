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



