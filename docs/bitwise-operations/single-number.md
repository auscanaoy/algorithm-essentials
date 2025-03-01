---
title: Single Number
---

### 描述

Given an array of integers, every element appears twice except for one. Find that single one.

Note:
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

### 分析

异或，不仅能处理两次的情况，只要出现偶数次，都可以清零。

### 代码

import Tabs from "@theme/Tabs";
import TabItem from "@theme/TabItem";

<Tabs
defaultValue="python"
values={[
{ label: 'Python', value: 'python', },
{ label: 'Java', value: 'java', },
{ label: 'C++', value: 'cpp', },
]
}>
<TabItem value="java">

```java
// Single Number
// 时间复杂度O(n)，空间复杂度O(1)
public class Solution {
    public int singleNumber(int[] nums) {
        int x = 0;
        for (int i : nums) {
            x ^= i;
        }
        return x;
    }
};
```

</TabItem>
<TabItem value="cpp">

```cpp
// Single Number
// 时间复杂度O(n)，空间复杂度O(1)
class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int x = 0;
        for (int i : nums) {
            x ^= i;
        }
        return x;
    }
};
```

</TabItem>

<TabItem value="python">

```python
# Single Number
# 时间复杂度O(n)，空间复杂度O(1)
class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        x = 0
        for i in nums:
            x ^= i
        return x
```

</TabItem>
</Tabs>

### 相关题目

- [Single Number II](single-number-ii.md)
