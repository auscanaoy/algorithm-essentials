---
title: Clone Graph
---

### 描述

Clone an undirected graph. Each node in the graph contains a `label` and a list of its `neighbours`.

OJ's undirected graph serialization:
Nodes are labeled uniquely.

We use `#` as a separator for each node, and `,` as a separator for node label and each neighbour of the node.
As an example, consider the serialized graph `{0,1,2#1,2#2,2}`.

The graph has a total of three nodes, and therefore contains three parts as separated by `#`.

1. First node is labeled as 0. Connect node 0 to both nodes 1 and 2.
1. Second node is labeled as 1. Connect node 1 to node 2.
1. Third node is labeled as 2. Connect node 2 to node 2 (itself), thus forming a self-cycle.

Visually, the graph looks like the following:

```
       1
      / \
     /   \
    0 --- 2
         / \
         \_/
```

### 分析

广度优先遍历或深度优先遍历都可以。

### DFS

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
// Clone Graph
// DFS，时间复杂度O(n)，空间复杂度O(n)
public class Solution {
    public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
        if(node == null) return null;
        // key is original node，value is copied node
        HashMap<UndirectedGraphNode, UndirectedGraphNode> visited = new HashMap<>();
        clone(node, visited);
        return visited.get(node);
    }
    // DFS
    private static UndirectedGraphNode clone(UndirectedGraphNode node,
                                              HashMap<UndirectedGraphNode,
                                                      UndirectedGraphNode> visited) {
        // a copy already exists
        if (visited.containsKey(node)) return visited.get(node);

        UndirectedGraphNode new_node = new UndirectedGraphNode(node.label);
        visited.put(node, new_node);
        for (UndirectedGraphNode nbr : node.neighbors)
            new_node.neighbors.add(clone(nbr, visited));
        return new_node;
    }
}
```

</TabItem>
<TabItem value="cpp">

```cpp
// Clone Graph
// DFS，时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    UndirectedGraphNode *cloneGraph(const UndirectedGraphNode *node) {
        if(node == nullptr) return nullptr;
        // key is original node，value is copied node
        unordered_map<const UndirectedGraphNode *,
                            UndirectedGraphNode *> visited;
        clone(node, visited);
        return visited[node];
    }
private:
    // DFS
    static UndirectedGraphNode* clone(const UndirectedGraphNode *node,
            unordered_map<const UndirectedGraphNode *,
            UndirectedGraphNode *> &visited) {
        // a copy already exists
        if (visited.find(node) != visited.end()) return visited[node];

        UndirectedGraphNode *new_node = new UndirectedGraphNode(node->label);
        visited[node] = new_node;
        for (auto nbr : node->neighbors)
            new_node->neighbors.push_back(clone(nbr, visited));
        return new_node;
    }
};
```

</TabItem>

<TabItem value="python">

```python
# Clone Graph
# DFS, time complexity O(n), space complexity O(n)
class Solution:
    def cloneGraph(self, node: 'UndirectedGraphNode') -> 'UndirectedGraphNode':
        if not node:
            return None
        # key is original node, value is copied node
        visited = {}
        return self.clone(node, visited)

    # DFS
    def clone(self, node: 'UndirectedGraphNode', visited: dict) -> 'UndirectedGraphNode':
        # a copy already exists
        if node in visited:
            return visited[node]

        new_node = UndirectedGraphNode(node.label)
        visited[node] = new_node
        for nbr in node.neighbors:
            new_node.neighbors.append(self.clone(nbr, visited))
        return new_node
```

</TabItem>
</Tabs>

### BFS

<Tabs
defaultValue="java"
values={[
{ label: 'Java', value: 'java', },
{ label: 'C++', value: 'cpp', },
]
}>
<TabItem value="java">

```java
// Clone Graph
// BFS，时间复杂度O(n)，空间复杂度O(n)
public class Solution {
    public UndirectedGraphNode cloneGraph(UndirectedGraphNode node) {
        if (node == null) return null;
        // key is original node，value is copied node
        HashMap<UndirectedGraphNode,UndirectedGraphNode> visited = new HashMap<>();
        // each node in queue is already copied itself
        // but neighbors are not copied yet
        Queue<UndirectedGraphNode> q = new LinkedList<>();
        q.offer(node);
        visited.put(node, new UndirectedGraphNode(node.label));
        while (!q.isEmpty()) {
            UndirectedGraphNode cur = q.poll();
            for (UndirectedGraphNode nbr : cur.neighbors) {
                // a copy already exists
                if (visited.containsKey(nbr)) {
                    visited.get(cur).neighbors.add(visited.get(nbr));
                } else {
                    UndirectedGraphNode new_node =
                            new UndirectedGraphNode(nbr.label);
                    visited.put(nbr, new_node);
                    visited.get(cur).neighbors.add(new_node);
                    q.offer(nbr);
                }
            }
        }
        return visited.get(node);
    }
}
```

</TabItem>
<TabItem value="cpp">

```cpp
// Clone Graph
// BFS，时间复杂度O(n)，空间复杂度O(n)
class Solution {
public:
    UndirectedGraphNode *cloneGraph(const UndirectedGraphNode *node) {
        if (node == nullptr) return nullptr;
        // key is original node，value is copied node
        unordered_map<const UndirectedGraphNode *,
                            UndirectedGraphNode *> copied;
        // each node in queue is already copied itself
        // but neighbors are not copied yet
        queue<const UndirectedGraphNode *> q;
        q.push(node);
        copied[node] = new UndirectedGraphNode(node->label);
        while (!q.empty()) {
            const UndirectedGraphNode *cur = q.front();
            q.pop();
            for (auto nbr : cur->neighbors) {
                // a copy already exists
                if (copied.find(nbr) != copied.end()) {
                    copied[cur]->neighbors.push_back(copied[nbr]);
                } else {
                    UndirectedGraphNode *new_node =
                            new UndirectedGraphNode(nbr->label);
                    copied[nbr] = new_node;
                    copied[cur]->neighbors.push_back(new_node);
                    q.push(nbr);
                }
            }
        }
        return copied[node];
    }
};
```

</TabItem>

<TabItem value="python">

```python
# Clone Graph
# BFS，时间复杂度O(n)，空间复杂度O(n)
from collections import deque

class Solution:
    def cloneGraph(self, node: 'Node') -> 'Node':
        if not node:
            return None
        # key is original node，value is copied node
        visited = {}
        # each node in queue is already copied itself
        # but neighbors are not copied yet
        q = deque()
        q.append(node)
        visited[node] = Node(node.val)
        while q:
            cur = q.popleft()
            for nbr in cur.neighbors:
                # a copy already exists
                if nbr in visited:
                    visited[cur].neighbors.append(visited[nbr])
                else:
                    new_node = Node(nbr.val)
                    visited[nbr] = new_node
                    visited[cur].neighbors.append(new_node)
                    q.append(nbr)
        return visited[node]
```

</TabItem>
</Tabs>
