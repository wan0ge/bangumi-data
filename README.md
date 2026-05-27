# @wan0ge/bangumi-data

[![npm version](https://badgen.net/npm/v/@wan0ge/bangumi-data)](https://www.npmjs.com/package/@wan0ge/bangumi-data)
[![license](https://badgen.net/npm/license/@wan0ge/bangumi-data)](LICENSE)

> **本仓库是 [bangumi-data/bangumi-data](https://github.com/bangumi-data/bangumi-data) 的维护复刻（fork），在原版数据基础上新增并持续补全 `season_id` / `video_sn` 字段，并通过 CI 自动发布至 npm。**

---

## 与上游的差异

| 特性 | 上游 bangumi-data | 本 fork（@wan0ge） |
|---|---|---|
| `season_id` 字段 | ❌ 无 | ✅ 新增，标识 B 站番剧 season |
| `video_sn` 字段 | ❌ 无 | ✅ 新增，标识巴哈姆特/动画疯剧集 |
| 自动数据补全 | 手动 `bdh update` | ✅ `auto-sync.sh` 每日自动运行 |
| npm 发布方式 | 手动 | ✅ GitHub Actions 自动 `npm publish` |
| 版本号策略 | 手动 bump | ✅ 自动 bump（与上游版本联动） |
| 覆盖范围 | 公开站点 | ✅ 额外覆盖 B 站港澳台/台湾分区 |

---

## 安装使用

```bash
npm install @wan0ge/bangumi-data
```

```js
const bangumiData = require('@wan0ge/bangumi-data');
// data.items = [{ id, sites: [{ site, id, season_id, video_sn }] }]
```

或通过 CDN（v0.3.x 最新版）：

```
https://unpkg.com/@wan0ge/bangumi-data@0.3/dist/data.json
```

---

## 新增字段说明

### `season_id`（B 站番剧）

```json
{
  "id": "bgm.tv/sample",
  "sites": [
    {
      "site": "bilibili",
      "id": "123456",
      "season_id": "20123456"
    }
  ]
}
```

- 通过 B 站 API 自动匹配 bangumi 条目的 `media_id` → `season_id`
- 覆盖 `bilibili` / `bilibili_hk_mo` / `bilibili_tw` / `bilibili_hk_mo_tw` 等站点

### `video_sn`（巴哈姆特动画疯）

```json
{
  "sites": [
    {
      "site": "gamer",
      "id": "12345",
      "video_sn": "12345-1"
    }
  ]
}
```

- 通过巴哈姆特 API 匹配 bangumi 条目 → 获取 `video_sn`
- 覆盖 `gamer` / `gamer_hk` 站点

---

## 自动化流程

```
上游 bangumi-data/bangumi-data 更新
        │
        ▼
  auto-sync.sh（定时运行）
  1. fetch upstream（走代理加速）
  2. merge 上游更新
  3. node fill-missing-ids.js（补全 season_id/video_sn）
  4. git commit + push
  5. 推送版本 tag
  6. 钉钉通知
        │
        ▼
  GitHub Actions（auto-publish.yml）
  → npm install → build → npm publish @wan0ge/bangumi-data
```

---

## 目录结构

```
bangumi-data/
├── data/items/          # 原始数据（按 年/月.json 组织）
├── dist/data.json       # build 产物（发布到 npm）
├── check-coverage.js    # 覆盖率统计脚本
├── .github/workflows/
│   └── auto-publish.yml  # GitHub Actions 自动发布
└── README.md

helper/
├── auto-sync.sh        # 核心自动化脚本（定时运行）
├── fill-missing-ids.js # season_id / video_sn 补全脚本
├── bin/bdh.js          # 上游命令行工具（数据爬取）
├── lib/commands/hokan.js  # 爬取调度
└── exclusions/         # 各平台排除列表
```

---

## 手动补全字段（开发用）

详见 [全流程指南.md](./全流程指南.md)

核心命令：

```bash
# 使用上游爬虫爬取全量数据
cd helper
node bin/bdh.js hokan bilibili
node bin/bdh.js hokan gamer
node merge_crawled.js
```

---

## 相关仓库

| 仓库 | 说明 |
|---|---|
| [wan0ge/bangumi-data](https://github.com/wan0ge/bangumi-data) | 本 fork（数据 + 自动化） |
| [wan0ge/helper](https://github.com/wan0ge/helper) | 本 fork 的 helper 工具链 |
| [bangumi-data/bangumi-data](https://github.com/bangumi-data/bangumi-data) | 上游原版 |
| [bangumi-data/helper](https://github.com/bangumi-data/helper) | 上游 helper |

---

## License

数据：CC BY 4.0（http://creativecommons.org/licenses/by/4.0/）

代码：MIT
