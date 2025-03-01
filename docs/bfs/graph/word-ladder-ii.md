---
title: Word Ladder II
---

### 描述

Given two words (start and end), and a dictionary, find all shortest transformation sequence(s) from start to end, such that:

- Only one letter can be changed at a time
- Each intermediate word must exist in the dictionary

For example, Given:

```
start = "hit"
end = "cog"
dict = ["hot","dot","dog","lot","log"]
```

Return

```cpp
[
    ["hit","hot","dot","dog","cog"],
    ["hit","hot","lot","log","cog"]
]
```

Note:

- All words have the same length.
- All words contain only lowercase alphabetic characters.

### 分析

跟 Word Ladder 比，这题是求路径本身，不是路径长度，也是 BFS，略微麻烦点。

求一条路径和求所有路径有很大的不同，求一条路径，每个状态节点只需要记录一个前驱即可；求所有路径时，有的状态节点可能有多个父节点，即要记录多个前驱。

如果当前路径长度已经超过当前最短路径长度，可以中止对该路径的处理，因为我们要找的是最短路径。

### 单队列

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
// Word Ladder II
// 时间复杂度O(n)，空间复杂度O(n)
public class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord,
                                          Set<String> wordList) {
        Queue<String> q = new LinkedList<>();
        HashMap<String, Integer> visited = new HashMap<>(); // 判重
        HashMap<String, ArrayList<String>> father = new HashMap<>(); // DAG

        final Function<String, Boolean> stateIsValid = (String s) ->
                wordList.contains(s) || s.equals(endWord);
        final Function<String, Boolean> stateIsTarget = (String s) ->
                s.equals(endWord);

        final Function<String, HashSet<String> > stateExtend = (String s) -> {
            HashSet<String> result = new HashSet<>();

            char[] array = s.toCharArray();
            for (int i = 0; i < array.length; ++i) {
                final char old = array[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    // 防止同字母替换
                    if (c == array[i]) continue;

                    array[i] = c;
                    String newState = new String(array);
                    final int newDepth = visited.get(s) + 1;

                    if (stateIsValid.apply(newState)) {
                        if (visited.containsKey(newState)) {
                            final int depth = visited.get(newState);
                            if (depth < newDepth) {
                                // do nothing
                            } else if (depth == newDepth) {
                                result.add(newState);
                            } else {
                                throw new IllegalStateException("not possible to get here");
                            }

                        } else {
                            result.add(newState);
                        }
                    }
                    array[i] = old; // 恢复该单词
                }
            }

            return result;
        };

        List<List<String>> result = new ArrayList<>();
        q.offer(beginWord);
        visited.put(beginWord, 0);
        while (!q.isEmpty()) {
            String state = q.poll();

            // 如果当前路径长度已经超过当前最短路径长度，
            // 可以中止对该路径的处理，因为我们要找的是最短路径
            if (!result.isEmpty() && (visited.get(state) + 1) > result.get(0).size()) break;

            if (stateIsTarget.apply(state)) {
                ArrayList<String> path = new ArrayList<>();
                genPath(father, beginWord, state, path, result);
                continue;
            }
            // 必须挪到下面，比如同一层A和B两个节点均指向了目标节点，
            // 那么目标节点就会在q中出现两次，输出路径就会翻倍
            // visited.insert(state);

            // 扩展节点
            HashSet<String> newStates = stateExtend.apply(state);
            for (String newState : newStates) {
                if (!visited.containsKey(newState)) {
                    q.offer(newState);
                    visited.put(newState, visited.get(state)+1);
                }
                ArrayList<String> parents = father.getOrDefault(newState, new ArrayList<>());
                parents.add(state);
                father.put(newState, parents);
            }
        }
        return result;
    }
    private static void genPath(HashMap<String, ArrayList<String>> father,
                                String start, String state, List<String> path,
                                List<List<String>> result) {
        path.add(state);
        if (state.equals(start)) {
            if (!result.isEmpty()) {
                if (path.size() < result.get(0).size()) {
                    result.clear();
                } else if (path.size() == result.get(0).size()) {
                    // do nothing
                } else {
                    throw new IllegalStateException("not possible to get here");
                }
            }
            ArrayList<String> tmp = new ArrayList<>(path);
            Collections.reverse(tmp);
            result.add(tmp);
        } else {
            for (String f : father.get(state)) {
                genPath(father, start, f, path, result);
            }
        }
        path.remove(path.size() - 1);
    }
}
```

</TabItem>
<TabItem value="cpp">

```cpp
// Word Ladder II
// 时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    vector<vector<string> > findLadders(const string& start,
        const string& end, const unordered_set<string> &dict) {
        queue<string> q;
        unordered_map<string, int> visited; // 判重
        unordered_map<string, vector<string> > father; // DAG

        auto state_is_valid = [&](const string& s) {
            return dict.find(s) != dict.end() || s == end;
        };
        auto state_is_target = [&](const string &s) {return s == end; };
        auto state_extend = [&](const string &s) {
            unordered_set<string> result;
            const int new_depth = visited[s] + 1;

            for (size_t i = 0; i < s.size(); ++i) {
                string new_state = s;
                for (char c = 'a'; c <= 'z'; c++) {
                    // 防止同字母替换
                    if (c == new_state[i]) continue;

                    swap(c, new_state[i]);

                    if (state_is_valid(new_state)) {
                        auto visited_iter = visited.find(new_state);

                        if (visited_iter != visited.end()) {
                            const int depth = visited_iter->second;
                            if (depth < new_depth) {
                                // do nothing
                            }
                            else if (depth == new_depth) {
                                result.insert(new_state);
                            }
                            else { // not possible
                                throw std::logic_error("not possible to get here");
                            }
                        }
                        else {
                            result.insert(new_state);
                        }
                    }
                    swap(c, new_state[i]); // 恢复该单词
                }
            }

            return result;
        };

        vector<vector<string>> result;
        q.push(start);
        visited[start] = 0;
        while (!q.empty()) {
            // 千万不能用 const auto&，pop() 会删除元素，
            // 引用就变成了悬空引用
            const auto state = q.front();
            q.pop();

            // 如果当前路径长度已经超过当前最短路径长度，
            // 可以中止对该路径的处理，因为我们要找的是最短路径
            if (!result.empty() && visited[state] + 1 > result[0].size()) break;

            if (state_is_target(state)) {
                vector<string> path;
                gen_path(father, start, state, path, result);
                continue;
            }
            // 必须挪到下面，比如同一层A和B两个节点均指向了目标节点，
            // 那么目标节点就会在q中出现两次，输出路径就会翻倍
            // visited.insert(state);

            // 扩展节点
            const auto& new_states = state_extend(state);
            for (const auto& new_state : new_states) {
                if (visited.find(new_state) == visited.end()) {
                    q.push(new_state);
                    visited[new_state] = visited[state] + 1;
                }
                father[new_state].push_back(state);
            }
        }

        return result;
    }
private:
    void gen_path(unordered_map<string, vector<string> > &father,
        const string &start, const string &state, vector<string> &path,
        vector<vector<string> > &result) {
        path.push_back(state);
        if (state == start) {
            if (!result.empty()) {
                if (path.size() < result[0].size()) {
                    result.clear();
                }
                else if (path.size() == result[0].size()) {
                    // do nothing
                }
                else { // not possible
                    throw std::logic_error("not possible to get here ");
                }
            }
            result.push_back(path);
            reverse(result.back().begin(), result.back().end());
        }
        else {
            for (const auto& f : father[state]) {
                gen_path(father, start, f, path, result);
            }
        }
        path.pop_back();
    }
};
```

</TabItem>

<TabItem value="python">

```python
# Word Ladder II
# 时间复杂度O(n)，空间复杂度O(n)
from collections import deque, defaultdict
from typing import List, Set, Dict

class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: Set[str]) -> List[List[str]]:
        q = deque()
        visited = {}  # 判重
        father = defaultdict(list)  # DAG

        def stateIsValid(s: str) -> bool:
            return s in wordList or s == endWord

        def stateIsTarget(s: str) -> bool:
            return s == endWord

        def stateExtend(s: str) -> set:
            result = set()
            array = list(s)
            for i in range(len(array)):
                old = array[i]
                for c in range(ord('a'), ord('z') + 1):
                    # 防止同字母替换
                    if chr(c) == array[i]:
                        continue

                    array[i] = chr(c)
                    newState = ''.join(array)
                    newDepth = visited[s] + 1

                    if stateIsValid(newState):
                        if newState in visited:
                            depth = visited[newState]
                            if depth < newDepth:
                                # do nothing
                                pass
                            elif depth == newDepth:
                                result.add(newState)
                            else:
                                raise ValueError("not possible to get here")
                        else:
                            result.add(newState)
                    array[i] = old  # 恢复该单词
            return result

        def genPath(father: Dict[str, List[str]], start: str, state: str, path: List[str], result: List[List[str]]):
            path.append(state)
            if state == start:
                if result:
                    if len(path) < len(result[0]):
                        result.clear()
                    elif len(path) == len(result[0]):
                        # do nothing
                        pass
                    else:
                        raise ValueError("not possible to get here")
                tmp = path[::-1]
                result.append(tmp)
            else:
                for f in father[state]:
                    genPath(father, start, f, path, result)
            path.pop()

        result = []
        q.append(beginWord)
        visited[beginWord] = 0
        while q:
            state = q.popleft()

            # 如果当前路径长度已经超过当前最短路径长度，
            # 可以中止对该路径的处理，因为我们要找的是最短路径
            if result and (visited[state] + 1) > len(result[0]):
                break

            if stateIsTarget(state):
                genPath(father, beginWord, state, [], result)
                continue

            # 扩展节点
            newStates = stateExtend(state)
            for newState in newStates:
                if newState not in visited:
                    q.append(newState)
                    visited[newState] = visited[state] + 1
                father[newState].append(state)

        return result
```

</TabItem>
</Tabs>

### 双队列

<Tabs
defaultValue="java"
values={[
{ label: 'Java', value: 'java', },
{ label: 'C++', value: 'cpp', },
]
}>
<TabItem value="java">

```java
// Word Ladder II
// 时间复杂度O(n)，空间复杂度O(n)
public class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord,
                                          Set<String> wordList) {
        // 当前层，下一层，用unordered_set是为了去重，例如两个父节点指向
        // 同一个子节点，如果用vector, 子节点就会在next里出现两次，其实此
        // 时 father 已经记录了两个父节点，next里重复出现两次是没必要的
        HashSet<String> current = new HashSet<>();
        HashSet<String> next = new HashSet<>();
        HashSet<String> visited = new HashSet<>(); // 判重
        HashMap<String, ArrayList<String>> father = new HashMap<>(); // DAG
        int level = -1; // 层次

        final Function<String, Boolean> stateIsValid = (String s) ->
                wordList.contains(s) || s.equals(endWord);
        final Function<String, Boolean> stateIsTarget = (String s) ->
                s.equals(endWord);

        final Function<String, HashSet<String> > stateExtend = (String s) -> {
            HashSet<String> result = new HashSet<>();

            char[] array = s.toCharArray();
            for (int i = 0; i < array.length; ++i) {
                final char old = array[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    // 防止同字母替换
                    if (c == array[i]) continue;

                    array[i] = c;
                    String newState = new String(array);

                    if (stateIsValid.apply(newState) &&
                            !visited.contains(newState)) {
                        result.add(newState);
                    }
                    array[i] = old; // 恢复该单词
                }
            }

            return result;
        };

        List<List<String>> result = new ArrayList<>();
        current.add(beginWord);
        while (!current.isEmpty()) {
            ++ level;
            // 如果当前路径长度已经超过当前最短路径长度，
            // 可以中止对该路径的处理，因为我们要找的是最短路径
            if (!result.isEmpty() && level + 1 > result.get(0).size()) break;

            // 1. 延迟加入visited, 这样才能允许两个父节点指向同一个子节点
            // 2. 一股脑current 全部加入visited, 是防止本层前一个节点扩展
            // 节点时，指向了本层后面尚未处理的节点，这条路径必然不是最短的
            for (String state : current)
                visited.add(state);

            for (String state : current) {
                if (stateIsTarget.apply(state)) {
                    ArrayList<String> path = new ArrayList<>();
                    genPath(father, beginWord, state, path, result);
                    continue;
                }
                // 扩展节点
                HashSet<String> newStates = stateExtend.apply(state);
                for (String newState : newStates) {
                    next.add(newState);
                    ArrayList<String> parents = father.getOrDefault(newState, new ArrayList<>());
                    parents.add(state);
                    father.put(newState, parents);
                }
            }
            current.clear();
            // swap
            HashSet<String> tmp = current;
            current = next;
            next = tmp;

        }
        return result;
    }
    private static void genPath(HashMap<String, ArrayList<String>> father,
                                String start, String state, List<String> path,
                                List<List<String>> result) {
        path.add(state);
        if (state.equals(start)) {
            if (!result.isEmpty()) {
                if (path.size() < result.get(0).size()) {
                    result.clear();
                } else if (path.size() == result.get(0).size()) {
                    // do nothing
                } else {
                    throw new IllegalStateException("not possible to get here");
                }
            }
            ArrayList<String> tmp = new ArrayList<>(path);
            Collections.reverse(tmp);
            result.add(tmp);
        } else {
            for (String f : father.get(state)) {
                genPath(father, start, f, path, result);
            }
        }
        path.remove(path.size() - 1);
    }
}
```

</TabItem>
<TabItem value="cpp">

```cpp
// Word Ladder II
// 时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    vector<vector<string> > findLadders(const string& start,
            const string& end, const unordered_set<string> &dict) {
        // 当前层，下一层，用unordered_set是为了去重，例如两个父节点指向
        // 同一个子节点，如果用vector, 子节点就会在next里出现两次，其实此
        // 时 father 已经记录了两个父节点，next里重复出现两次是没必要的
        unordered_set<string> current, next;
        unordered_set<string> visited; // 判重
        unordered_map<string, vector<string> > father; // DAG

        int level = -1;  // 层次

        auto state_is_valid = [&](const string& s) {
            return dict.find(s) != dict.end() || s == end;
        };
        auto state_is_target = [&](const string &s) {return s == end;};
        auto state_extend = [&](const string &s) {
            unordered_set<string> result;

            for (size_t i = 0; i < s.size(); ++i) {
                string new_word(s);
                for (char c = 'a'; c <= 'z'; c++) {
                    // 防止同字母替换
                    if (c == new_word[i]) continue;

                    swap(c, new_word[i]);

                    if (state_is_valid(new_word) &&
                            visited.find(new_word) == visited.end()) {
                        result.insert(new_word);
                    }
                    swap(c, new_word[i]); // 恢复该单词
                }
            }

            return result;
        };

        vector<vector<string> > result;
        current.insert(start);
        while (!current.empty()) {
            ++ level;
            // 如果当前路径长度已经超过当前最短路径长度，可以中止对该路径的
            // 处理，因为我们要找的是最短路径
            if (!result.empty() && level+1 > result[0].size()) break;

            // 1. 延迟加入visited, 这样才能允许两个父节点指向同一个子节点
            // 2. 一股脑current 全部加入visited, 是防止本层前一个节点扩展
            // 节点时，指向了本层后面尚未处理的节点，这条路径必然不是最短的
            for (const auto& state : current)
                visited.insert(state);
            for (const auto& state : current) {
                if (state_is_target(state)) {
                    vector<string> path;
                    gen_path(father, path, start, state, result);
                    continue;
                }

                const auto new_states = state_extend(state);
                for (const auto& new_state : new_states) {
                    next.insert(new_state);
                    father[new_state].push_back(state);
                }
            }

            current.clear();
            swap(current, next);
        }

        return result;
    }
private:
    void gen_path(unordered_map<string, vector<string> > &father,
            vector<string> &path, const string &start, const string &word,
            vector<vector<string> > &result) {
        path.push_back(word);
        if (word == start) {
            if (!result.empty()) {
                if (path.size() < result[0].size()) {
                    result.clear();
                    result.push_back(path);
                } else if(path.size() == result[0].size()) {
                    result.push_back(path);
                } else {
                    // not possible
                    throw std::logic_error("not possible to get here");
                }
            } else {
                result.push_back(path);
            }
            reverse(result.back().begin(), result.back().end());
        } else {
            for (const auto& f : father[word]) {
                gen_path(father, path, start, f, result);
            }
        }
        path.pop_back();
    }
};
```

</TabItem>

<TabItem value="python">

```python
# Word Ladder II
# 时间复杂度O(n)，空间复杂度O(n)
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: set) -> list[list[str]]:
        # 当前层，下一层，用unordered_set是为了去重，例如两个父节点指向
        # 同一个子节点，如果用vector, 子节点就会在next里出现两次，其实此
        # 时 father 已经记录了两个父节点，next里重复出现两次是没必要的
        current = set()
        next_level = set()
        visited = set()  # 判重
        father = {}  # DAG
        level = -1  # 层次

        def stateIsValid(s):
            return s in wordList or s == endWord

        def stateIsTarget(s):
            return s == endWord

        def stateExtend(s):
            result = set()
            array = list(s)
            for i in range(len(array)):
                old = array[i]
                for c in range(ord('a'), ord('z') + 1):
                    # 防止同字母替换
                    if chr(c) == array[i]:
                        continue

                    array[i] = chr(c)
                    new_state = ''.join(array)

                    if stateIsValid(new_state) and new_state not in visited:
                        result.add(new_state)
                    array[i] = old  # 恢复该单词
            return result

        result = []
        current.add(beginWord)
        while current:
            level += 1
            # 如果当前路径长度已经超过当前最短路径长度，
            # 可以中止对该路径的处理，因为我们要找的是最短路径
            if result and level + 1 > len(result[0]):
                break

            # 1. 延迟加入visited, 这样才能允许两个父节点指向同一个子节点
            # 2. 一股脑current 全部加入visited, 是防止本层前一个节点扩展
            # 节点时，指向了本层后面尚未处理的节点，这条路径必然不是最短的
            visited.update(current)

            for state in current:
                if stateIsTarget(state):
                    path = []
                    self.genPath(father, beginWord, state, path, result)
                    continue
                # 扩展节点
                new_states = stateExtend(state)
                for new_state in new_states:
                    next_level.add(new_state)
                    if new_state not in father:
                        father[new_state] = []
                    father[new_state].append(state)

            current.clear()
            # swap
            current, next_level = next_level, current

        return result

    def genPath(self, father, start, state, path, result):
        path.append(state)
        if state == start:
            if result:
                if len(path) < len(result[0]):
                    result.clear()
                elif len(path) == len(result[0]):
                    pass
                else:
                    raise ValueError("not possible to get here")
            tmp = path[::-1]
            result.append(tmp)
        else:
            for f in father[state]:
                self.genPath(father, start, f, path, result)
        path.pop()
```

</TabItem>
</Tabs>

### 图的广搜

前面的解法，在状态扩展的时候，每次都是从'a'到'z'全部枚举一遍，重复计算，比较浪费，其实当给定字典`dict`后，单词与单词之间的路径就固定下来了，本质上单词与单词之间构成了一个无向图。如果事先把这个图构建出来，那么状态扩展就会大大加快。

<Tabs
defaultValue="java"
values={[
{ label: 'Java', value: 'java', },
{ label: 'C++', value: 'cpp', },
]
}>
<TabItem value="java">

```java
import java.util.*;
import java.util.function.Predicate;
import java.util.function.Function;

// Word Ladder II
// 时间复杂度O(n)，空间复杂度O(n)
public class Solution {
    public List<List<String>> findLadders(String beginWord, String endWord,
                                          Set<String> wordList) {
        Queue<String> q = new LinkedList<>();
        HashMap<String, Integer> visited = new HashMap<>(); // 判重
        HashMap<String, ArrayList<String>> father = new HashMap<>(); // DAG
        // only used by stateExtend()
        final HashMap<String, HashSet<String>> g = buildGraph(wordList);

        final Function<String, Boolean> stateIsValid = (String s) ->
                wordList.contains(s) || s.equals(endWord);
        final Function<String, Boolean> stateIsTarget = (String s) ->
                s.equals(endWord);

        final Function<String, List<String> > stateExtend = (String s) -> {
            List<String> result = new ArrayList<>();
            final int newDepth = visited.get(s) + 1;
            HashSet<String> list = g.get(s);
            if (list == null) return result;

            for (String newState : list) {
                if (stateIsValid.apply(newState)) {
                    if (visited.containsKey(newState)) {
                        final int depth = visited.get(newState);
                        if (depth < newDepth) {
                            // do nothing
                        } else if (depth == newDepth) {
                            result.add(newState);
                        } else {
                            throw new IllegalStateException("not possible to get here");
                        }

                    } else {
                        result.add(newState);
                    }
                }
            }

            return result;
        };

        List<List<String>> result = new ArrayList<>();
        q.offer(beginWord);
        visited.put(beginWord, 0);
        while (!q.isEmpty()) {
            String state = q.poll();

            // 如果当前路径长度已经超过当前最短路径长度，
            // 可以中止对该路径的处理，因为我们要找的是最短路径
            if (!result.isEmpty() && (visited.get(state) + 1) > result.get(0).size()) break;

            if (stateIsTarget.apply(state)) {
                ArrayList<String> path = new ArrayList<>();
                genPath(father, beginWord, state, path, result);
                continue;
            }
            // 必须挪到下面，比如同一层A和B两个节点均指向了目标节点，
            // 那么目标节点就会在q中出现两次，输出路径就会翻倍
            // visited.insert(state);

            // 扩展节点
            List<String> newStates = stateExtend.apply(state);
            for (String newState : newStates) {
                if (!visited.containsKey(newState)) {
                    q.offer(newState);
                    visited.put(newState, visited.get(state)+1);
                }
                ArrayList<String> parents = father.getOrDefault(newState, new ArrayList<>());
                parents.add(state);
                father.put(newState, parents);
            }
        }
        return result;
    }
    private static void genPath(HashMap<String, ArrayList<String>> father,
                                String start, String state, List<String> path,
                                List<List<String>> result) {
        path.add(state);
        if (state.equals(start)) {
            if (!result.isEmpty()) {
                if (path.size() < result.get(0).size()) {
                    result.clear();
                } else if (path.size() == result.get(0).size()) {
                    // do nothing
                } else {
                    throw new IllegalStateException("not possible to get here");
                }
            }
            ArrayList<String> tmp = new ArrayList<>(path);
            Collections.reverse(tmp);
            result.add(tmp);
        } else {
            for (String f : father.get(state)) {
                genPath(father, start, f, path, result);
            }
        }
        path.remove(path.size() - 1);
    }

    private static HashMap<String, HashSet<String>> buildGraph(Set<String> dict) {
        HashMap<String, HashSet<String>> adjacency_list = new HashMap<>();
        for (String word: dict) {
            char[] array = word.toCharArray();
            for (int i = 0; i < array.length; ++i) {
                final char old = array[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    // 防止同字母替换
                    if (c == array[i]) continue;

                    array[i] = c;
                    String newWord = new String(array);

                    if (dict.contains(newWord)) {
                        HashSet<String> list = adjacency_list.getOrDefault(
                                word, new HashSet<>());
                        list.add(newWord);
                        adjacency_list.put(word, list);
                    }
                    array[i] = old; // 恢复该单词
                }
            }
        }
        return adjacency_list;
    }
}
```

</TabItem>
<TabItem value="cpp">

```cpp
// Word Ladder II
// 时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    vector<vector<string> > findLadders(const string& start,
        const string& end, const unordered_set<string> &dict) {
        queue<string> q;
        unordered_map<string, int> visited; // 判重
        unordered_map<string, vector<string> > father; // DAG
        // only used by state_extend()
        const unordered_map<string, unordered_set<string> >& g = build_graph(dict);

        auto state_is_valid = [&](const string& s) {
            return dict.find(s) != dict.end() || s == end;
        };
        auto state_is_target = [&](const string &s) {return s == end; };
        auto state_extend = [&](const string &s) {
            vector<string> result;
            const int new_depth = visited[s] + 1;
            auto iter = g.find(s);
            if (iter == g.end()) return result;
            const auto& list = iter->second;

            for (const auto& new_state : list) {
                if (state_is_valid(new_state)) {
                    auto visited_iter = visited.find(new_state);
                    if (visited_iter != visited.end()) {
                        const int depth = visited_iter->second;
                        if (depth < new_depth) {
                            // do nothing
                        }
                        else if (depth == new_depth) {
                            result.push_back(new_state);
                        } else { // not possible
                            throw std::logic_error("not possible to get here");
                        }
                    }
                    else {
                        result.push_back(new_state);
                    }
                }
            }

            return result;
        };

        vector<vector<string>> result;
        q.push(start);
        visited[start] = 0;
        while (!q.empty()) {
            // 千万不能用 const auto&，pop() 会删除元素，
            // 引用就变成了悬空引用
            const auto state = q.front();
            q.pop();

            // 如果当前路径长度已经超过当前最短路径长度，
            // 可以中止对该路径的处理，因为我们要找的是最短路径
            if (!result.empty() && visited[state] + 1 > result[0].size()) break;

            if (state_is_target(state)) {
                vector<string> path;
                gen_path(father, start, state, path, result);
                continue;
            }
            // 必须挪到下面，比如同一层A和B两个节点均指向了目标节点，
            // 那么目标节点就会在q中出现两次，输出路径就会翻倍
            // visited.insert(state);

            // 扩展节点
            const auto& new_states = state_extend(state);
            for (const auto& new_state : new_states) {
                if (visited.find(new_state) == visited.end()) {
                    q.push(new_state);
                    visited[new_state] = visited[state] + 1;
                }
                father[new_state].push_back(state);
            }
        }

        return result;
    }
private:
    void gen_path(unordered_map<string, vector<string> > &father,
        const string &start, const string &state, vector<string> &path,
        vector<vector<string> > &result) {
        path.push_back(state);
        if (state == start) {
            if (!result.empty()) {
                if (path.size() < result[0].size()) {
                    result.clear();
                }
                else if (path.size() == result[0].size()) {
                    // do nothing
                }
                else { // not possible
                    throw std::logic_error("not possible to get here ");
                }
            }
            result.push_back(path);
            reverse(result.back().begin(), result.back().end());
        }
        else {
            for (const auto& f : father[state]) {
                gen_path(father, start, f, path, result);
            }
        }
        path.pop_back();
    }
    unordered_map<string, unordered_set<string> > build_graph(
        const unordered_set<string>& dict) {
        unordered_map<string, unordered_set<string> > adjacency_list;

        for (const auto& word : dict) {
            for (size_t i = 0; i < word.size(); ++i) {
                string new_word(word);
                for (char c = 'a'; c <= 'z'; c++) {
                    // 防止同字母替换
                    if (c == new_word[i]) continue;

                    swap(c, new_word[i]);

                    if ((dict.find(new_word) != dict.end())) {
                        auto iter = adjacency_list.find(word);
                        if (iter != adjacency_list.end()) {
                            iter->second.insert(new_word);
                        }
                        else {
                            adjacency_list.insert(pair<string,
                                unordered_set<string >> (word, unordered_set<string>()));
                            adjacency_list[word].insert(new_word);
                        }
                    }
                    swap(c, new_word[i]); // 恢复该单词
                }
            }
        }
        return adjacency_list;
    }
};
```

</TabItem>

<TabItem value="python">

```python
from collections import defaultdict, deque

# Word Ladder II
# 时间复杂度O(n)，空间复杂度O(n)
class Solution:
    def findLadders(self, beginWord: str, endWord: str, wordList: set[str]) -> list[list[str]]:
        q = deque()
        visited = {}  # 判重
        father = {}  # DAG
        # only used by stateExtend()
        g = self.buildGraph(wordList)

        def stateIsValid(s):
            return s in wordList or s == endWord

        def stateIsTarget(s):
            return s == endWord

        def stateExtend(s):
            result = []
            newDepth = visited[s] + 1
            if s not in g:
                return result

            for newState in g[s]:
                if stateIsValid(newState):
                    if newState in visited:
                        depth = visited[newState]
                        if depth < newDepth:
                            # do nothing
                            pass
                        elif depth == newDepth:
                            result.append(newState)
                        else:
                            raise ValueError("not possible to get here")
                    else:
                        result.append(newState)
            return result

        result = []
        q.append(beginWord)
        visited[beginWord] = 0
        while q:
            state = q.popleft()

            # 如果当前路径长度已经超过当前最短路径长度，
            # 可以中止对该路径的处理，因为我们要找的是最短路径
            if result and (visited[state] + 1) > len(result[0]):
                break

            if stateIsTarget(state):
                path = []
                self.genPath(father, beginWord, state, path, result)
                continue
            # 必须挪到下面，比如同一层A和B两个节点均指向了目标节点，
            # 那么目标节点就会在q中出现两次，输出路径就会翻倍
            # visited.insert(state)

            # 扩展节点
            newStates = stateExtend(state)
            for newState in newStates:
                if newState not in visited:
                    q.append(newState)
                    visited[newState] = visited[state] + 1
                if newState not in father:
                    father[newState] = []
                father[newState].append(state)
        return result

    def genPath(self, father, start, state, path, result):
        path.append(state)
        if state == start:
            if result:
                if len(path) < len(result[0]):
                    result.clear()
                elif len(path) == len(result[0]):
                    # do nothing
                    pass
                else:
                    raise ValueError("not possible to get here")
            tmp = path[::-1]
            result.append(tmp)
        else:
            for f in father[state]:
                self.genPath(father, start, f, path, result)
        path.pop()

    def buildGraph(self, dict_words):
        adjacency_list = defaultdict(set)
        for word in dict_words:
            array = list(word)
            for i in range(len(array)):
                old = array[i]
                for c in range(ord('a'), ord('z') + 1):
                    # 防止同字母替换
                    if chr(c) == array[i]:
                        continue
                    array[i] = chr(c)
                    newWord = "".join(array)
                    if newWord in dict_words:
                        adjacency_list[word].add(newWord)
                    array[i] = old  # 恢复该单词
        return adjacency_list
```

</TabItem>
</Tabs>

### 相关题目

- [Word Ladder](word-ladder.md)
