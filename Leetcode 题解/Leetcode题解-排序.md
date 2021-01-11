- [冒泡排序](#冒泡排序)
- [快速排序](#快速排序)
- [堆](#堆)
  - [1. 数组中的第K个最大元素](#1-数组中的第K个最大元素)



## 冒泡排序

两层循环，内层每次循环一次就能把一个最大值扔到数组最后面，外层控制内层需要循环的数组长度。

**一轮中如果没有产生交换数据，则证明已经不需要排序了。**

```js
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let mark = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        mark = false
      }
    }
    if (mark) break;
  }
  return arr
}
```





## 快速排序

用于求解 **Kth Element** 问题，也就是第 K 个元素的问题。

可以使用快速排序的 partition() 进行实现。需要先打乱数组，否则最坏情况下时间复杂度为 O(N2)。

## 堆

用于求解 **TopK Elements** 问题，也就是 K 个最小元素的问题。使用最小堆来实现 TopK 问题，最小堆使用大顶堆来实现，大顶堆的堆顶元素为当前堆的最大元素。实现过程：不断地往大顶堆中插入新元素，当堆中元素的数量大于 k 时，移除堆顶元素，也就是当前堆中最大的元素，剩下的元素都为当前添加过的元素中最小的 K 个元素。插入和移除堆顶元素的时间复杂度都为 log2N。

堆也可以用于求解 Kth Element 问题，得到了大小为 K 的最小堆之后，因为使用了大顶堆来实现，因此堆顶元素就是第 K 大的元素。

快速选择也可以求解 TopK Elements 问题，因为找到 Kth Element 之后，再遍历一次数组，所有小于等于 Kth Element 的元素都是 TopK Elements。

可以看到，快速选择和堆排序都可以求解 Kth Element 和 TopK Elements 问题

### 1. 数组中的第K个最大元素

[215. 数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

**题目：**

在未排序的数组中找到第 **k** 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

**说明:**

你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。

**示例 1:**

```
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```

**示例 2:**

```
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

**题解：**

1. sort()

   ```js
   /**
    * @param {number[]} nums
    * @param {number} k
    * @return {number}
    */
   var findKthLargest = function(nums, k) {
     return nums.sort((a,b)=>a-b)[nums.length-k]
   };
   ```

2. 快速排序

   