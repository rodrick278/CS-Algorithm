- [冒泡排序](#冒泡排序)
- [选择排序](#选择排序)
- [插入排序](#插入排序)
- [希尔排序](#希尔排序)
- [归并排序](#归并排序)
- [快速排序](#快速排序)
- [堆排序](#堆排序)
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

## 选择排序

每次获取最小值放到最左边，然后向右缩小需要搜索的数组范围。

```js
function selectSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
      }
    }
    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]
  }
  return arr
}
```

## 插入排序

从 index = 1 开始，先保存当前 arr[i] 的值，然后比较前面一位和当前的大小，如果前面的大，把前面这个值往后移一位，覆盖掉后面，直到没有比 arr[i] 大的了，然后把 arr[i] 塞到那个位置

```js
function insertSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let pre = i - 1
    let cur = arr[i] // 这个值在这里就要取出来，因为后面 arr[i] 的值会变
    while (pre >= 0 && arr[pre] > cur) {
      arr[pre + 1] = arr[pre]
      pre--
    }
    arr[pre + 1] = cur
  }
  return arr
}
```

## 希尔排序

通过某个增量 gap，将整个序列分给若干组，从后往前进行组内成员的比较和交换，随后逐步缩小增量至 1。希尔排序类似于插入排序，只是一开始向前移动的步数从 1 变成了 gap。

```js
function shellSort(arr) {
  let len = arr.length;
  // 初始步数
  let gap = parseInt(len / 2);
  // 逐渐缩小步数
  while (gap) {
    // 从第gap个元素开始遍历
    for (let i = gap; i < len; i++) {
      // 逐步其和前面其他的组成员进行比较和交换
      for (let j = i - gap; j >= 0; j -= gap) {
        if (arr[j] > arr[j + gap]) {
          [arr[j], arr[j + gap]] = [arr[j + gap], arr[j]];
        } else {
          break;
        }
      }
    }
    gap = parseInt(gap / 2);
  }
  return arr
}
```

## 归并排序⭐

归并排序（Merge sort）是建立在归并操作上的一种有效的排序算法。该算法是采用**分治法**（Divide and Conquer）的一个非常典型的应用。

将数组反复递归切分，切分到有一边一个元素，然后从最小组开始比对，最小组排序后对第二大组排，如图所示：

![img](https://www.runoob.com/wp-content/uploads/2019/03/mergeSort.gif)

```js
function mergeSort(arr) {
  debugger
  if (arr.length < 2) {
    return arr
  }
  let mid = Math.floor(arr.length / 2)
  let left = arr.slice(0, mid)
  let right = arr.slice(mid)

  return merge(mergeSort(left), mergeSort(right))
}

function merge(left, right) {
  let result = []
  while (left.length && right.length) {
    if (left[0] <= right[0]) {
      result.push(left.shift())
    } else {
      result.push(right.shift())
    }
  }
  while (left.length) {
    result.push(left.shift())
  }

  while (right.length) {
    result.push(right.shift())
  }
  return result
}
```



## 快速排序⭐⭐

用于求解 **Kth Element** 问题，也就是第 K 个元素的问题。

可以使用快速排序的 partition() 进行实现。需要先打乱数组，否则最坏情况下时间复杂度为 O(N2)。

## 堆排序⭐⭐

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

   