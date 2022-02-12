- [02. 两数相加](#02-两数相加)
- [19. 删除链表的倒数第N个结点](#19-删除链表的倒数第N个结点)
- [206. 反转链表](#206-反转链表)



## [02. 两数相加](https://leetcode-cn.com/problems/add-two-numbers)

给你两个 **非空** 的链表，表示两个非负的整数。它们每位数字都是按照 **逆序** 的方式存储的，并且每个节点只能存储 **一位** 数字。

请你将两个数相加，并以相同形式返回一个表示和的链表。

你可以假设除了数字 0 之外，这两个数都不会以 0 开头。

 

**示例 1：**

![img](https://assets.leetcode-cn.com/aliyun-lc-upload/uploads/2021/01/02/addtwonumber1.jpg)

```
输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
```

**示例 2：**

```
输入：l1 = [0], l2 = [0]
输出：[0]
```

**示例 3：**

```
输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
```

 

**提示：**

- 每个链表中的节点数在范围 `[1, 100]` 内
- `0 <= Node.val <= 9`
- 题目数据保证列表表示的数字不含前导零

**题解**

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const res = new ListNode(0);
  // node 保留指向
  let node = res;
  let needAdd = 0;

  // 循环条件说明：l1l2可能长度不同 进位可能在l1l2循环结束后还有需要进位的 所以要加上判断
  while (l1 || l2 || needAdd) {
    // 可能l1l2长度不同
    const val1 = l1 ? l1.val : 0;
    const val2 = l2 ? l2.val : 0;
    // 加上需要进位的数一起求和
    const val = val1 + val2 + needAdd;
    node.next = new ListNode(val % 10);
    // 如果结果大于十还是需要进位 否则归零
    needAdd = val >= 10 ? 1 : 0;

    node = node.next;
    l1 = l1 ? l1.next : l1;
    l2 = l2 ? l2.next : l2;
  }
  return res.next;
};

```

## [19. 删除链表的倒数第N个结点](https://leetcode-cn.com/problems/remove-nth-node-from-end-of-list/)

给你一个链表，删除链表的倒数第 `n` 个结点，并且返回链表的头结点。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2020/10/03/remove_ex1.jpg)

```
输入：head = [1,2,3,4,5], n = 2
输出：[1,2,3,5]
```

**示例 2：**

```
输入：head = [1], n = 1
输出：[]
```

**示例 3：**

```
输入：head = [1,2], n = 1
输出：[1]
```

 

**提示：**

- 链表中结点的数目为 `sz`
- `1 <= sz <= 30`
- `0 <= Node.val <= 100`
- `1 <= n <= sz`

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  /**
   * 快慢指针
   * 1. 搞一个虚拟头节点 指向head（方便删除头结点的情况
   * 2. 快指针先走n+1步
   * 3. 此时如果已经为null 那么直接删除头（因为题目n必然有效）
   * 4. 指针同时一步步走 快指针为null时 慢指针的val就是要删除的
   */
  const dummyHead = new ListNode(0,head);

  let [slow, fast] = [dummyHead, dummyHead];

  // 快指针走n+1
  let step = n+1
  while(step--){
    if(!fast){
      // fast如果已经没了 直接去掉头结点
      return head.next
    }
    fast = fast.next
  }

  while(fast){
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummyHead.next
  
};
```

## [206. 反转链表](https://leetcode-cn.com/problems/reverse-linked-list/)

给你单链表的头节点 `head` ，请你反转链表，并返回反转后的链表。

 

**示例 1：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex1.jpg)

```
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
```

**示例 2：**

![img](https://assets.leetcode.com/uploads/2021/02/19/rev1ex2.jpg)

```
输入：head = [1,2]
输出：[2,1]
```

**示例 3：**

```
输入：head = []
输出：[]
```

 

**提示：**

- 链表中节点的数目范围是 `[0, 5000]`
- `-5000 <= Node.val <= 5000`

```js
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let prev = null

  while (head) {
    // 234
    const next = head.next
    // 1null
    head.next = prev
    prev = head

    head = next
  }

  return prev
};
```

