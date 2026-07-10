# 后端要接的东西(给 PoPo)— 让前端设计跑通

前端(夜虹设计)已经按你 PR #6 的契约在走。下面是**后端侧**要补的连接点,才能让 onboarding
新收的 `concerns` / `safetyFlags` 真正影响 AI 输出。`VerdictResult` / `TravelResult` 形状
**不用改**(你已经定了不扩),所以这些都是 prompt + 逻辑层的活,不是接口层。

## 背景:现在的状态
- 三个接口 `/api/scan` · `/api/verdict` · `/api/travel` 都在,Gemini + 无 key mock fallback 都有。
- PR #6 给 `SkinProfile` 加了 `concerns: string[]` + `safetyFlags: string[]`(`types.ts` + `server.ts` 镜像)。
- 前端把整个 `profile` 传给 `/api/verdict` 和 `/api/travel`,所以后端**已经收得到**这两个字段——
  只是现在的 prompt / mock 逻辑还**没用**它们。

## 1. `/api/verdict` — 把 concerns 和 safetyFlags 接进推荐逻辑 ⭐ 核心

- **`concerns`**:作为"长期困扰"上下文喂进 Gemini prompt(跟每次对话里的即时 `condition`/聊天文本叠加)。
  例:profile.concerns = ["泛红","冒痘"] → prompt 里带上"该用户长期困扰:泛红、冒痘"。
- **`safetyFlags`(硬性安全门,这就是它单独成字段的原因)**:只要命中严重项
  (`孕期/哺乳` · `正在看皮肤科/用处方药` · `严重痘/破损/感染`)就必须:
  1. 从 `recommendedIds` 里**剔除强活性**(酸类 / A醇/维A / 高浓度维C),把它们挪进 `avoidIds`;
  2. 在 `reason` 开头**加一句转诊语**:"检测到安全项,建议先咨询皮肤科医生,已为你避开强效成分。"
  - 这段逻辑要在 **Gemini prompt** 和 **`mockVerdict`(无 key fallback)** 里都做一遍,保证无 key 也能演示。

## 2. `/api/travel` — 同样尊重 safetyFlags / concerns

- 打包清单里**不要放**被 safetyFlags 触发要避开的强活性产品。
- `concerns` 可作为副信号(例:泛红 → 提示带舒缓/修护)。
- `mockTravel` 同步这套逻辑。

## 3. `/api/scan` — 不动

- 扫描识别跟 profile 无关,不用改。

## 4. 天气 = 纯前端,后端不碰

- 天气卡是前端写死的 mock(上海/北京/洛杉矶/伦敦)。`city` 已经在 profile 里,你**可选**把 city 当
  气候提示喂给 Gemini(如果还没做);但**不要**在后端接真天气 API。

## 5. 契约不变(别改接口形状)

- `VerdictResult = { recommendedIds, avoidIds, reason }` 保持不变——前端就按这三个字段渲染
  (推荐两栏 + 一段 reason)。你所有新逻辑都体现在"选哪些 id"和"reason 文案"里,不加新字段。
- `TravelResult = { selectedIds, reason }` 同理。

## 前端会怎么对接你(供你参考)
- 前端设计的本地 mock(`design/night-prism/ui_kits/shelfie/data.js` 里的 `mockVerdict`/`mockTravel`)
  就是照 `/api/verdict`·`/api/travel` 的形状写的。真机集成时,前端会把这些 mock 换成
  `src/api.ts` 的真实调用——所以只要你后端返回同样的 `{recommendedIds, avoidIds, reason}`,直接对接得上。
- onboarding UI(前端待建的 5 项之一)会把 `concerns`(固定枚举,max 2)和 `safetyFlags` 塞进
  `setProfile`,再随 profile 一起发给你——你上面 1/2 的逻辑就是消费这两个字段。

有疑问的点:`safetyFlags` 里"严重项"的具体判定串(哪些值算触发转诊)最好你我对一份固定 list,
免得前端存的字符串和你后端判断的对不上。前端目前的候选:
`孕期/哺乳` · `正在看皮肤科/用处方药` · `当前有严重痘/破损/感染` · `以上都没有`(最后一个不触发)。
