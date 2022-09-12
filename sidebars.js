module.exports = {
  someSidebar: {
    介绍: ["README", "data-structures"],
    数组: [
      {
        type: "category",
        label: "快慢指针",
        items: [
          "array/remove-duplicates-from-sorted-array",
          "array/remove-duplicates-from-sorted-array-ii",
          "array/remove-element",
          "array/move-zeroes",
        ],
      },
      {
        type: "category",
        label: "左右夹逼",
        items: [
          "array/2sum-ii",
          "array/3sum",
          "array/3sum-closest",
          "array/3sum-smaller",
          "array/4sum",
        ],
      },
      "array/longest-consecutive-sequence",
      "array/2sum",
      "array/4sum-ii",
      "array/next-permutation",
      "array/permutation-sequence",
      "array/valid-sudoku",
      "array/trapping-rain-water",
      "array/rotate-image",
      "array/plus-one",
      "array/climbing-stairs",
      "array/set-matrix-zeroes",
      "array/gas-station",
      "array/candy",
      "array/majority-element",
      "array/majority-element-ii",
      "array/rotate-array",
      "array/contains-duplicate",
      "array/contains-duplicate-ii",
      "array/contains-duplicate-iii",
      "array/product-of-array-except-self",
      "array/game-of-life",
      "array/increasing-triplet-subsequence",
      "array/meeting-rooms",
      "array/intersection-of-two-arrays",
      "array/intersection-of-two-arrays-ii",
    ],
    单链表: [
      "linked-list/README",
      {
        type: "category",
        label: "快慢指针",
        items: [
          "linked-list/fast-slow-pointers",
          "linked-list/linked-list-cycle",
          "linked-list/linked-list-cycle-ii",
          "linked-list/middle-of-the-linked-list",
          "linked-list/intersection-of-two-linked-lists",
          "linked-list/remove-nth-node-from-end-of-list",
        ],
      },
      "linked-list/reverse-linked-list",
      "linked-list/odd-even-linked-list",
      "linked-list/add-two-numbers",
      "linked-list/add-two-numbers-ii",
      "linked-list/reverse-linked-list-ii",
      "linked-list/partition-list",
      "linked-list/remove-duplicates-from-sorted-list",
      "linked-list/remove-duplicates-from-sorted-list-ii",
      "linked-list/rotate-list",
      "linked-list/swap-nodes-in-pairs",
      "linked-list/reverse-nodes-in-k-group",
      "linked-list/copy-list-with-random-pointer",
      "linked-list/reorder-list",
      "linked-list/lru-cache",
      "linked-list/lfu-cache",
      "linked-list/all-o1-data-structure",
      "linked-list/palindrome-linked-list",
    ],
    二叉树: [
      "binary-tree/README",
      {
        type: "category",
        label: "二叉树的遍历",
        items: [
          "binary-tree/traversal/binary-tree-preorder-traversal",
          "binary-tree/traversal/binary-tree-inorder-traversal",
          "binary-tree/traversal/binary-tree-postorder-traversal",
          "binary-tree/traversal/binary-tree-level-order-traversal",
          "binary-tree/traversal/binary-tree-level-order-traversal-ii",
          "binary-tree/traversal/binary-tree-right-side-view",
          "binary-tree/traversal/invert-binary-tree",
          "binary-tree/traversal/binary-search-tree-iterator",
          "binary-tree/traversal/binary-tree-zigzag-level-order-traversal",
          "binary-tree/traversal/recover-binary-search-tree",
          "binary-tree/traversal/same-tree",
          "binary-tree/traversal/symmetric-tree",
          "binary-tree/traversal/balanced-binary-tree",
          "binary-tree/traversal/flatten-binary-tree-to-linked-list",
          "binary-tree/traversal/populating-next-right-pointers-in-each-node-ii",
        ],
      },
      {
        type: "category",
        label: "二叉树的构建",
        items: [
          "binary-tree/construction/construct-binary-tree-from-preorder-and-inorder-traversal",
          "binary-tree/construction/construct-binary-tree-from-inorder-and-postorder-traversal",
        ],
      },
      {
        type: "category",
        label: "二叉查找树",
        items: [
          "binary-tree/bst/unique-binary-search-trees",
          "binary-tree/bst/unique-binary-search-trees-ii",
          "binary-tree/bst/validate-binary-search-tree",
          "binary-tree/bst/convert-sorted-array-to-binary-search-tree",
          "binary-tree/bst/convert-sorted-list-to-binary-search-tree",
          "binary-tree/bst/lca-of-bst",
          "binary-tree/bst/kth-smallest-element-in-a-bst",
        ],
      },
      {
        type: "category",
        label: "二叉树的递归",
        items: [
          "binary-tree/recursion/README",
          "binary-tree/recursion/minimum-depth-of-binary-tree",
          "binary-tree/recursion/maximum-depth-of-binary-tree",
          "binary-tree/recursion/path-sum",
          "binary-tree/recursion/path-sum-ii",
          "binary-tree/recursion/binary-tree-maximum-path-sum",
          "binary-tree/recursion/populating-next-right-pointers-in-each-node",
          "binary-tree/recursion/sum-root-to-leaf-numbers",
          "binary-tree/recursion/lca-of-binary-tree",
          "binary-tree/recursion/serialize-and-deserialize-binary-tree",
        ],
      },
      {
        type: "category",
        label: "线段树",
        items: ["binary-tree/segment-tree/range-sum-query-mutable"],
      },
    ],
    栈和队列: [
      {
        type: "category",
        label: "栈",
        items: [
          "stack-and-queue/stack/min-stack",
          "stack-and-queue/stack/valid-parentheses",
          "stack-and-queue/stack/longest-valid-parentheses",
          "stack-and-queue/stack/largest-rectangle-in-histogram",
          "stack-and-queue/stack/evaluate-reverse-polish-notation",
          "stack-and-queue/stack/implement-stack-using-queues",
          "stack-and-queue/stack/median-of-data-stream",
        ],
      },
      {
        type: "category",
        label: "队列",
        items: [
          "stack-and-queue/queue/implement-queue-using-stacks",
          "stack-and-queue/queue/moving-average-of-data-stream",
          "stack-and-queue/queue/sliding-window-maximum",
        ],
      },
    ],
    排序: [
      {
        type: "category",
        label: "插入排序",
        items: ["sorting/insertion-sort/insertion-sort-list"],
      },
      {
        type: "category",
        label: "归并排序",
        items: [
          "sorting/merge-sort/merge-two-sorted-arrays",
          "sorting/merge-sort/merge-two-sorted-lists",
          "sorting/merge-sort/merge-k-sorted-lists",
        ],
      },
      {
        type: "category",
        label: "快速排序",
        items: [
          "sorting/quick-sort/sort-colors",
          "sorting/quick-sort/kth-largest-element-in-an-array",
        ],
      },
      {
        type: "category",
        label: "桶排序",
        items: [
          "sorting/bucket-sort/README",
          "sorting/bucket-sort/first-missing-positive",
        ],
      },
      {
        type: "category",
        label: "计数排序",
        items: [
          "sorting/counting-sort/README",
          "sorting/counting-sort/h-index",
        ],
      },
      {
        type: "category",
        label: "基数排序",
        items: ["sorting/radix-sort/README", "sorting/radix-sort/maximum-gap"],
      },
      {
        type: "category",
        label: "堆排序",
        items: [
          "sorting/heap-sort/meeting-rooms-ii",
          "sorting/heap-sort/top-k-frequent-elements",
          "sorting/heap-sort/top-k-frequent-words",
        ],
      },
      {
        type: "category",
        label: "其他",
        items: ["sorting/other/largest-number"],
      },
      {
        type: "category",
        label: "小结",
        items: ["sorting/summary"],
      },
    ],
    查找: [
      "search/search-for-a-range",
      "search/search-insert-position",
      "search/search-in-rotated-sorted-array",
      "search/search-in-rotated-sorted-array-ii",
      "search/search-a-2d-matrix",
      "search/search-a-2d-matrix-ii",
      "search/find-minimum-in-rotated-sorted-array",
      "search/find-minimum-in-rotated-sorted-array-ii",
      "search/median-of-two-sorted-arrays",
      "search/h-index-ii",
      "search/random-pick-with-weight",
    ],
    暴力枚举法: [
      "brute-force/subsets",
      "brute-force/subsets-ii",
      "brute-force/permutations",
      "brute-force/permutations-ii",
      "brute-force/combinations",
    ],
    广度优先搜索: [
      "bfs/README",
      "bfs/word-ladder",
      "bfs/word-ladder-ii",
      "bfs/surrounded-regions",
      "bfs/the-maze",
      "bfs/the-maze-ii",
      "bfs/the-maze-iii",
      "bfs/bfs-summary",
    ],
    深度优先搜索: [
      "dfs/additive-number",
      "dfs/palindrome-partitioning",
      "dfs/unique-paths",
      "dfs/unique-paths-ii",
      "dfs/n-queens",
      "dfs/n-queens-ii",
      "dfs/restore-ip-addresses",
      "dfs/combination-sum",
      "dfs/combination-sum-ii",
      "dfs/combination-sum-iii",
      "dfs/generate-parentheses",
      "dfs/sudoku-solver",
      "dfs/word-search",
      "dfs/android-unlock-patterns",
      "dfs/robot-room-cleaner",
      "dfs/dfs-summary",
    ],
    分治法: ["divide-and-conquer/pow", "divide-and-conquer/sqrt"],
    贪心法: [
      "greedy/jump-game",
      "greedy/jump-game-ii",
      "greedy/best-time-to-buy-and-sell-stock",
      "greedy/best-time-to-buy-and-sell-stock-ii",
      "greedy/longest-substring-without-repeating-characters",
      "greedy/container-with-most-water",
      "greedy/patching-array",
      "greedy/task-scheduler",
    ],
    动态规划: [
      "dp/triangle",
      "dp/maximum-subarray",
      "dp/maximum-product-subarray",
      "dp/longest-increasing-subsequence",
      "dp/palindrome-partitioning-ii",
      "dp/maximal-rectangle",
      "dp/best-time-to-buy-and-sell-stock-iii",
      "dp/best-time-to-buy-and-sell-stock-iv",
      "dp/best-time-to-buy-and-sell-stock-with-cooldown",
      "dp/interleaving-string",
      "dp/scramble-string",
      "dp/minimum-path-sum",
      "dp/edit-distance",
      "dp/decode-ways",
      "dp/distinct-subsequences",
      "dp/word-break",
      "dp/word-break-ii",
      "dp/dungeon-game",
      "dp/house-robber",
      "dp/house-robber-ii",
      "dp/house-robber-iii",
      "dp/range-sum-query-immutable",
      "dp/range-sum-query-2d-immutable",
      "dp/frog-jump",
      {
        type: "category",
        label: "背包问题",
        items: [
          "dp/knapsack-problem/README",
          "dp/knapsack-problem/partition-equal-subset-sum",
          "dp/knapsack-problem/ones-and-zeroes",
          "dp/knapsack-problem/last-stone-weight-ii",
        ],
      },
    ],
    图: [
      "graph/README",
      "graph/clone-graph",
      "graph/graph-valid-tree",
      "graph/network-delay-time",
      "graph/path-with-maximum-probability",
    ],
    字符串: [
      "string/valid-palindrome",
      "string/strstr",
      "string/atoi",
      "string/longest-palindromic-substring",
      "string/regular-expression-matching",
      "string/wildcard-matching",
      "string/longest-common-prefix",
      "string/valid-number",
      "string/integer-to-roman",
      "string/roman-to-integer",
      "string/count-and-say",
      "string/anagrams",
      "string/valid-anagram",
      "string/simplify-path",
      "string/length-of-last-word",
      "string/isomorphic-strings",
      "string/word-pattern",
      "string/decode-string",
    ],
    位操作: [
      "bitwise-operations/reverse-bits",
      "bitwise-operations/repeated-dna-sequences",
      "bitwise-operations/number-of-1-bits",
      "bitwise-operations/gray-code",
      "bitwise-operations/single-number",
      "bitwise-operations/single-number-ii",
      "bitwise-operations/single-number-iii",
      "bitwise-operations/power-of-two",
      "bitwise-operations/missing-number",
      "bitwise-operations/maximum-product-of-word-lengths",
      "bitwise-operations/bitwise-and-of-numbers-range",
      "simulation/power-of-three",
      "simulation/rectangle-area",
    ],
    数论: [
      "number-theory/README",
      "number-theory/happy-number",
      "number-theory/ugly-number",
      "number-theory/ugly-number-ii",
      "number-theory/super-ugly-number",
      "number-theory/fraction-to-recurring-decimal",
      "number-theory/factorial-trailing-zeroes",
    ],
    模拟: [
      "simulation/README",
      "simulation/reverse-integer",
      "simulation/palindrome-number",
      "simulation/insert-interval",
      "simulation/merge-intervals",
      "simulation/employee-free-time",
      "simulation/minimum-window-substring",
      "simulation/add-binary",
      "simulation/add-strings",
      "simulation/multiply-strings",
      "simulation/substring-with-concatenation-of-all-words",
      "simulation/pascal-s-triangle",
      "simulation/pascal-s-triangle-ii",
      "simulation/spiral-matrix",
      "simulation/spiral-matrix-ii",
      "simulation/zigzag-conversion",
      "simulation/divide-two-integers",
      "simulation/text-justification",
      "simulation/max-points-on-a-line",
      "simulation/sparse-matrix-multiplication",
    ],
    Java集合框架总结: ["java-collection"],
  },
};
