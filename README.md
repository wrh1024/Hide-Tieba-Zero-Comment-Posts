# 贴吧零回复帖子屏蔽

自动屏蔽百度贴吧首页评论数为零的帖子。

（本项目由 AI 辅助生成，仅人工测试其功能可用）

## 功能

- 自动检测并隐藏评论数为零的帖子
- 支持页面滚动加载时实时屏蔽
- 兼容百度贴吧首页个性化推荐

## 安装

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击脚本文件 `tieba-zero-comment-hide.user.js`，Tampermonkey 会自动识别并提示安装
3. 安装完成后，访问百度贴吧首页即可自动生效

## 使用方法

安装后无需任何操作，访问以下页面时会自动屏蔽零回复帖子：

- https://tieba.baidu.com/ （贴吧首页）

## 工作原理

脚本会遍历页面中的帖子元素，检测评论数显示为"评论"（即零回复）的帖子，并将其隐藏。支持动态加载内容的实时处理。

## 技术栈

- JavaScript (Userscript)
- Tampermonkey API
- MutationObserver

## License

MIT
