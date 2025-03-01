---
title: Substring with Concatenation of All Words
---

### 描述

You are given a string, `S`, and a list of words, `L`, that are all of the same length. Find all starting indices of substring(s) in `S` that is a concatenation of each word in `L` exactly once and without any intervening characters.

For example, given:

```
S: "barfoothefoobarman"
L: ["foo", "bar"]
```

You should return the indices: `[0,9]`.(order does not matter).

### 分析

无

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
// Substring with Concatenation of All Words
// 时间复杂度O(n*m)，空间复杂度O(m)
public class Solution {
    public List<Integer> findSubstring(String s, String[] words) {
        final int wordLength = words[0].length();
        final int catLength = wordLength * words.length;
        List<Integer> result = new ArrayList<>();

        if (s.length() < catLength) return result;

        HashMap<String, Integer> wordCount = new HashMap<>();

        for (String word : words)
            wordCount.put(word, wordCount.getOrDefault(word, 0) + 1);

        for (int i = 0; i <= s.length() - catLength; ++i) {
            HashMap<String, Integer> unused = new HashMap<>(wordCount);

            for (int j = i; j < i + catLength; j += wordLength) {
                final String key = s.substring(j, j + wordLength);
                final int pos = unused.getOrDefault(key, -1);

                if (pos == -1 || pos == 0) break;

                unused.put(key, pos - 1);
                if (pos - 1 == 0) unused.remove(key);
            }

            if (unused.size() == 0) result.add(i);
        }

        return result;
    }
}
```

</TabItem>
<TabItem value="cpp">

```cpp
// LeetCode, Substring with Concatenation of All Words
// 时间复杂度O(n*m)，空间复杂度O(m)
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& dict) {
        size_t wordLength = dict.front().length();
        size_t catLength = wordLength * dict.size();
        vector<int> result;

        if (s.length() < catLength) return result;

        unordered_map<string, int> wordCount;

        for (auto const& word : dict) ++wordCount[word];

        for (auto i = begin(s); i <= prev(end(s), catLength); ++i) {
            unordered_map<string, int> unused(wordCount);

            for (auto j = i; j != next(i, catLength); j += wordLength) {
                auto pos = unused.find(string(j, next(j, wordLength)));

                if (pos == unused.end() || pos->second == 0) break;

                if (--pos->second == 0) unused.erase(pos);
            }

            if (unused.size() == 0) result.push_back(distance(begin(s), i));
        }

        return result;
    }
};
```

</TabItem>

<TabItem value="python">

```python
# Substring with Concatenation of All Words
# 时间复杂度O(n*m)，空间复杂度O(m)
def findSubstring(s: str, words: list[str]) -> list[int]:
    word_length = len(words[0])
    cat_length = word_length * len(words)
    result = []

    if len(s) < cat_length:
        return result

    word_count = {}
    for word in words:
        word_count[word] = word_count.get(word, 0) + 1

    for i in range(len(s) - cat_length + 1):
        unused = word_count.copy()

        for j in range(i, i + cat_length, word_length):
            key = s[j:j + word_length]
            pos = unused.get(key, -1)

            if pos == -1 or pos == 0:
                break

            unused[key] = pos - 1
            if pos - 1 == 0:
                del unused[key]

        if len(unused) == 0:
            result.append(i)

    return result
```

</TabItem>
</Tabs>
