- [02. 两数相加](#02-两数相加)



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

