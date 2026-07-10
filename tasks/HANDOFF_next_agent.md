# Handoff — next step: 把设计和真实 app 拼在一起,跑起来看效果

**写于 2026-07-09。** 上一段对话做完了"设计落地 + 交接 PoPo",这份是给下一个 agent 的起点。

## 目标(下一步要做的事)
等 PoPo 回复后,**把现在有的东西全部拼在一起,直接看这个 app 的真实效果** —— 也就是把
夜虹 Night Prism 的深色视觉,套进真实的 React app(`src/`),`npm run dev` 跑起来能看到
柜柜变成夜虹的样子。

## 开工前的前置条件(等 PoPo)
不要在这些没到位之前硬上:
1. **PoPo 的 PR #6 合进 `upstream/main`** —— 它给 `SkinProfile` 加了 `concerns` + `safetyFlags`。
   合了之后 `git fetch upstream && git rebase upstream/main`(在 `elaine/design-system` 上)。
2. **PoPo 的后端连接** —— 见 `tasks/BACKEND_tasks_for_partner.md`:把 concerns/safetyFlags 接进
   `/api/verdict` · `/api/travel`(safetyFlags 硬门:剔除强活性 + 转诊)。
3. **safetyFlags 触发串对齐** —— `BACKEND_tasks_for_partner.md` 末尾那个问题,前后端要用同一组字符串。

## 现状(两套东西,还没接起来)
- **真实 app** = `src/`(浅色:cream/stone + 绿 `#3D7D52`)。已重构成 4 个 tab 组件
  `ShelfTab` / `AiAdvisorTab` / `RoutineTravelTab` + explore 内联;`HomeSummary`/`Shelf`/`Scanner`/
  `EmptyCabinetState`/`ProfileCompletionPrompt`/`GuestAccountPrompt`/`Bottle`。跑法:`npm install && npm run dev`。
- **设计** = `design/night-prism/`(深色夜虹)。**是独立原型,还没接进 `src/`**。跑法:
  `cd design/night-prism && python3 -m http.server 8199` → 开 `ui_kits/shelfie/index.html`。
  它的 `ui_kits/shelfie/Shelfie*.jsx` 跟 `src/components/*` 是 1:1 镜像,是移植时的视觉参照。

## 拼在一起 = 怎么做(整合任务的形状)
把夜虹深色视觉**移植进现有 `src/` 组件**,不是拿设计版 App.tsx 整个替换(PoPo 的 0707 规矩)。
即:逐个组件,把 `design/night-prism/ui_kits/shelfie/ShelfieShelf.jsx` 的视觉 JSX/样式,搬进
`src/components/ShelfTab.tsx`;AI/routine/scan 同理。tokens(`design/night-prism/tokens/*.css`)引进
`src/`。这是一次**大的视觉换肤**(浅→深),量不小,建议一个组件一个组件来,每步 `npm run dev` 看效果。

顺带把 Elaine 还没建的 5 个 UI 项一起做掉(它们本来就是整合的一部分):
onboarding 肤质 5→4、concerns(固定枚举 max 2)写入 profile、safetyFlags 写入、profile 弹窗补这两个输入、
`data.js`/真实 `setProfile` 加这两个字段。详见 `design/PAGE_PROMPTS.md` 顶部"Confirmed data contract"。

## 分支 / 仓库状态
- fork `origin = eyhshen`,`upstream = Phat-Po`。`origin/main` = `upstream/main` = `8001ed8`(#5)。
- 当前分支 `elaine/design-system` @ `223d06b`(已 force-push 到 origin):含 `design/night-prism/` 全套 +
  契约文档 + 后端 MD。整合工作在这个分支上继续。
- **PR 提到 `upstream`(Phat-Po)的 main,不是 fork。** 任何 push/PR 都要先问 Elaine(硬门)。

## 坑
- 设计副本缺两个二进制(`guigui-logo.png` 真图 / greeting `.ttf`)—— 走 design-MCP 的 256KB 读上限被截。
  logo 现在是 `app-icon.svg` 栅格化的替身,字体 fallback 到 Noto Serif SC。要还原就从 Claude Design 项目
  (`4de317c9`)把真文件丢进 `design/night-prism/assets/`。整合进 `src/` 时按 `src/` 现有 logo 资产走即可。
- Claude Design 里有张 "Build Status" 卡(Handoff 组),记着待建 5 项;它只在 Claude Design,不在 repo。
- 设计是深色、真实 app 是浅色 —— 整合本质是换肤,注意别把交互/数据流改坏(纯展示 + props 回调的结构要保住)。

## 相关文件
- `design/night-prism/README.md` —— 设计怎么跑 + 两个缺失二进制的说明。
- `tasks/BACKEND_tasks_for_partner.md` —— PoPo 的后端活。
- `tasks/DESIGN_field_decisions_for_partner.md` + `tasks/REPLY_to_partner_20260709.md` —— 字段决策的来龙去脉(PoPo 已拍板)。
- `design/PAGE_PROMPTS.md` / `design/BEHAVIOR_CONTRACTS.md` —— 设计的 source of truth,已含 PR #6 契约。
