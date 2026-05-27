# @wan0ge/bangumi-data

[![npm version](https://badgen.net/npm/v/@wan0ge/bangumi-data?icon=npm)](https://www.npmjs.com/package/@wan0ge/bangumi-data)
[![npm license](https://badgen.net/npm/license/@wan0ge/bangumi-data)](LICENSE)
[![file size](https://badgen.net/bundlephobia/minzip/@wan0ge/bangumi-data?icon=https://api.iconify.design/ant-design:file-zip-outline.svg?color=white)](https://bundlephobia.com/result?p=@wan0ge/bangumi-data)
[![jsDelivr](https://badgen.net/jsdelivr/hits/npm/@wan0ge/bangumi-data?icon=https://api.iconify.design/simple-icons:jsdelivr.svg?color=white)](https://www.jsdelivr.com/package/npm/@wan0ge/bangumi-data)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome?icon=https://api.iconify.design/octicon:git-pull-request.svg?color=white)](https://github.com/wan0ge/bangumi-data/blob/master/CONTRIBUTING.md)

本仓库是 [bangumi-data/bangumi-data](https://github.com/bangumi-data/bangumi-data) 的 fork，在原版数据基础上新增了 `season_id` / `video_sn` 字段，并通过 CI 自动发布至 npm（`@wan0ge/bangumi-data`）。
本 fork 的所有数据补全工作**依赖上游 bangumi-data 的更新**，上游维护者人工录入新番剧数据后，本 fork 的自动化脚本才会对新条目补全 `season_id` / `video_sn` 字段。感谢上游所有贡献者的持续维护。

---

## 与上游的差异

| 特性 | 上游 bangumi-data | 本 fork（@wan0ge） |
|---|---|---|
| `season_id` 字段 | 无 | 新增（尽力补全 B 站番剧 season_id） |
| `video_sn` 字段 | 无 | 新增（尽力补全巴哈姆特动画疯 video_sn） |
| 自动数据补全 | 手动 `bdh update` | `auto-sync.sh` 定时运行（依赖上游有新数据） |
| npm 发布 | 手动 | GitHub Actions 自动 `npm publish` |
| 版本号 | 手动 bump | 自动 bump（与上游版本联动） |
| 覆盖范围 | 公开站点 | 额外覆盖 B 站港澳台/台湾分区 |

---

## 新增字段说明

### `season_id`（B 站番剧）

通过 B 站 API 匹配 bangumi 条目的 `media_id` → `season_id`，覆盖 `bilibili` / `bilibili_hk_mo` / `bilibili_tw` / `bilibili_hk_mo_tw` 等站点。

```json
{
  "sites": [
    {
      "site": "bilibili",
      "id": "123456",
      "season_id": "20123456"
    }
  ]
}
```

### `video_sn`（巴哈姆特动画疯）

通过巴哈姆特 API 匹配 bangumi 条目 → 获取 `video_sn`，覆盖 `gamer` / `gamer_hk` 站点。

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

---

## 自动化流程

本 fork 通过 `auto-sync.sh` 定时运行，流程如下：

```
上游 bangumi-data/bangumi-data 有更新（人工录入新数据）
        │
        ▼
  auto-sync.sh（定时运行）
  1. fetch upstream（合并上游更新）
  2. node fill-missing-ids.js（为新增条目补全 season_id/video_sn）
  3. git commit + push
  4. 推送版本 tag
  5. 钉钉通知
        │
        ▼
  GitHub Actions（auto-publish.yml）
  → npm install → build → npm publish @wan0ge/bangumi-data
```

自动化补全的前提是上游已录入对应条目。上游数据未覆盖的条目，本 fork 也无法补全。

---

## 使用方法

```bash
npm install @wan0ge/bangumi-data
```

```js
const bangumiData = require('@wan0ge/bangumi-data');
// bangumiData.items = [{ id, sites: [{ site, id, season_id, video_sn }] }]
```

也可通过 CDN 获取最新 `v0.3.x` 数据：

```
https://unpkg.com/@wan0ge/bangumi-data@0.3/dist/data.json
```

---

## 相关仓库

| 仓库 | 说明 |
|---|---|
| [@wan0ge/bangumi-data](https://github.com/wan0ge/bangumi-data) | 本 fork（数据 + 自动化脚本） |
| [@wan0ge/helper](https://github.com/wan0ge/helper) | 本 fork 的 helper 工具链 |
| [bangumi-data/bangumi-data](https://github.com/bangumi-data/bangumi-data) | 上游原版（数据来源） |
| [bangumi-data/helper](https://github.com/bangumi-data/helper) | 上游 helper |

---

## 原版 README

以下内容为上游原版 README，保留供参考。

---

# Bangumi Data

[![Awesome](https://badgen.net/badge/icon/awesome/fc60a8?icon=awesome&label)](https://github.com/bangumi-data/awesome)
[![Build Status](https://badgen.net/travis/bangumi-data/bangumi-data?icon=travis&label=build)](https://travis-ci.org/bangumi-data/bangumi-data)
[![NPM Version](https://badgen.net/npm/v/bangumi-data?icon=npm)](https://www.npmjs.com/package/bangumi-data)
[![File size](https://badgen.net/bundlephobia/minzip/bangumi-data?icon=https://api.iconify.design/ant-design:file-zip-outline.svg?color=white)](https://bundlephobia.com/result?p=bangumi-data)
[![jsDelivr](https://badgen.net/jsdelivr/hits/npm/bangumi-data?icon=https://api.iconify.design/simple-icons:jsdelivr.svg?color=white)](https://www.jsdelivr.com/package/npm/bangumi-data)
[![License](https://badgen.net/npm/license/bangumi-data?icon=https://api.iconify.design/octicon:law.svg?color=white)](https://github.com/bangumi-data/bangumi-data#license)
[![Slack Welcome](https://badgen.net/badge/icon/welcome?icon=slack&label=slack)](https://bangumi-data.slack.com)
[![PRs Welcome](https://badgen.net/badge/PRs/welcome?icon=https://api.iconify.design/octicon:git-pull-request.svg?color=white)](CONTRIBUTING.md)

动画番组及其放送、资讯站点数据集合

## 使用方法

```bash
npm install bangumi-data
```

```js
const bangumiData = require('bangumi-data');
```

也可通过 CDN `https://unpkg.com/bangumi-data@0.3/dist/data.json` 获取 `v0.3.x` 的最新数据

## 哪些项目在使用

https://github.com/bangumi-data/awesome

## 帮助我们改进

见 [CONTRIBUTING.md](CONTRIBUTING.md)

## License

The data in this repo is available for use under a CC BY 4.0 license (http://creativecommons.org/licenses/by/4.0/). For attribution just mention somewhere that the source is bangumi-data. If you have any questions about using the data for your project please contact us.
