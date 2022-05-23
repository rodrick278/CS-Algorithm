module.exports = {
  base: "/CS-Algorithm/",
  title: "背题家记录本",
  description: "记录算法的笔记本",
  head: [
    [
      "meta",
      {
        name: "keywords",
        content: "前端, 算法",
      },
      { name: "author", content: "Rodrick" }
    ],
    ['link', { rel: 'icon', href: '/portrait.png' }],
  ],
  plugins: [
    "@vuepress/medium-zoom",
    "@vuepress/back-to-top",
    "@vuepress/active-header-links",
  ],
  markdown: {
    lineNumbers: true,
  },
  themeConfig: {
    repo: "rodrick278/CS-Algorithm",
    logo: "/portrait.png",
    nav: [
      {
        text: "檐上有月",
        link: "https://rodrick.cn/",
      },
    ],
    sidebar: [
      {
        title: "介绍",
        collapsable: false,
        path: "/"
      },
      {
        title: "LeetCode题解",
        collapsable: false,
        children: [
          "/leetcode/动态规划.md",
          "/leetcode/二分查找.md",
          "/leetcode/分治.md",
          "/leetcode/滑动窗口.md",
          "/leetcode/链表.md",
          "/leetcode/排序.md",
          "/leetcode/双指针.md",
          "/leetcode/搜索.md",
          "/leetcode/贪心思想.md",
        ],
      },{
        title: "剑指offer",
        collapsable: false,
        path: "/swordOffer/"
      },{
        title: "附录",
        collapsable: false,
        path: "/other/"
      }
      
    ],

    // 搜索
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "最后更新",
  },

  // PWA 配置
  serviceWorker: true,
};
