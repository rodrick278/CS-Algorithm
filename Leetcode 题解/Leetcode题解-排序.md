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

内层循环每轮获取最小值放到最左边，然后向右缩小需要搜索的数组范围。

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

用于求解 **TopK Elements** 问题，也就是 K 个最小元素的问题。

堆排序的思路是：

1. 从最后一个非叶子节点 `arr[Math.floor(arr.length/2)-1]` 开始，从顶向下堆化

2. 堆化是分别判断每一个非叶子节点 `i` ，和它的左右子节点 `i*2+1` & `i*2+2` 进行大小比较，将这个“三角堆”中的最大或者最小值放到三角的顶端

3. 大顶堆：`arr[i]>=arr[i*2+1] && arr[i]>=arr[i*2+2]`

   小顶堆：`arr[i]<=arr[i*2+1] && arr[i]<=arr[i*2+2]`

4. 形成顶堆之后**只能保证最上面的是最大值或者最小值**，最终形成排序需要反复将堆顶和当前堆底互换再堆化：

   ```js
   // 循环n-1次，每次循环后交换堆顶元素和堆底元素并重新调整堆结构
   for (let i = nums.length - 1; i > 0; i--) {
     [nums[i], nums[0]] = [nums[0], nums[i]];
     this.heapify(nums, 0, i);// 参数：数组、堆顶index、需要堆化的size
     console.log(`${nums[i]}作为堆顶元素：`, nums);
   }
   ```

   

堆排序参考文章 ：

- https://www.cnblogs.com/chengxiao/p/6129630.html

- https://juejin.cn/post/6844904039566540808#heading-33

  

快速选择也可以求解 TopK Elements 问题，因为找到 Kth Element 之后，再遍历一次数组，所有小于等于 Kth Element 的元素都是 TopK Elements。

可以看到，快速选择和堆排序都可以求解 Kth Element 和 TopK Elements 问题

### 1. 数组中的第K个最大元素⭐

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

#### 1. 排序

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

#### 2. 堆排序

思路：取一个长度为 k 的数组，这个数组用来存前 k 个最大值，因为前 k 个最大值作出小顶堆之后，第一个值就是目标值。

1. 先将 nums 前 k 个数做成数组 arr，然后小顶堆化。

2. 从 nums[k] 开始向后遍历，如果值比 arr[0] 大，就说明 arr 里存的不是最大的 k 个值，

3. 执行 `arr[0]=nums[k]` ，然后再小顶堆化。

4. 结果产生

```js
/*
 * @lc app=leetcode.cn id=215 lang=javascript
 *
 * [215] 数组中的第K个最大元素
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
let findKthLargest = function (nums, k) {
  let arr = []
  // 先构建一个有 k 个数的数组
  arr.push(...nums.slice(0, k))
  // 为了取前k个数最小值，所以我们先要造小顶堆
  buildHeap(arr, k)

  for (let i = k; i < nums.length; i++) {
    if (nums[i] > arr[0]) {
      arr[0] = nums[i]
      heapify(arr, 0, arr.length)
    }
  }
  return arr[0]
};

/**
 * @description: 构建堆
 * @Author: rodrick
 * @Date: 2021-01-14 22:16:03
 * @param {*} arr 数组
 * @param {*} size 需要堆化的长度
 * @return {*}
 */
function buildHeap(arr, size) {
  // 从最后一个非叶子节点开始
  let start = Math.floor(size / 2) - 1
  for (let i = start; i >= 0; i--) {
    heapify(arr, i, size)
  }
}
/**
 * @description: 从上向下堆化
 * @Author: rodrick
 * @Date: 2021-01-14 22:14:58
 * @param {*} arr 数组
 * @param {*} index 堆顶index
 * @param {*} size 需要堆化的长度
 * @return {*}
 */
function heapify(arr, index, size) {
  while (true) {
    // 我们需要不断提取出最大值到堆三角的上面，所以需要 min
    let min = index
    let left = index * 2 + 1 // 左节点
    let right = index * 2 + 2 // 右节点
    // 先判断和 size 对比，因为目标 size 不一定等于 arr 长度，不是一直都整个数组需要堆化
    // 然后找到这个堆三角中的最大值，替换
    if (left < size && arr[left] < arr[min]) {
      min = left
    }
    if (right < size && arr[right] < arr[min]) {
      min = right
    }
    // 注意这里很重要！先把最大的值拿到三角堆顶，这次交换可能已经破坏了堆结构！
    // 所以把 index 放到 min 的位置【min 可能是三角底的某个角】
    // 然后我们再循环，确认当前 min 作为顶的三角是不是被破坏了，如果破坏了再堆化，再往下层确认，直到没有发生破坏为止
    if (min != index) {
      [arr[min], arr[index]] = [arr[index], arr[min]]
      index = min
    } else {
      break;
    }
  }
}
```



