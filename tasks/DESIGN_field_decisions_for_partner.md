# 设计要落地,需要你拍板的数据契约(回我 yes/no 就行)

背景:我在做夜虹(Night Prism)的 UI 设计,对着重构后的 `main`(#5)核了一遍。设计里有几个字段/接口是 `types.ts` 和 `server.ts` 现在**还没有**的。麻烦你逐条决定"加"还是"不加"——加就是你这边动 `types.ts`(有的还要动 `server.ts` mock),不加我就把设计缩到现有契约能撑的范围。每条都给了我的推荐,你不同意再说。

---

## 1. 肤质要不要加「敏感」?

- **现状**:`SkinProfile.skinType = 'dry' | 'oily' | 'combination' | 'normal' | null`(4 选);敏感是单独的 `sensitivities: string[]`。
- **设计原本**:onboarding 肤质步骤想放 5 个瓦片(干/油/混/敏感/中性)。
- **决定**:☐ 保持现状(我把「敏感」从肤质瓦片拿掉,归到 sensitivities) ☐ 给 skinType 加 `'sensitive'`
- **我推荐**:保持现状,不动类型。敏感当作 sensitivity 更合理,也不用改代码。

## 2. 要不要给档案加 `concerns`(困扰)字段?

- **现状**:`SkinProfile` 没有 concerns。困扰目前只是推荐时临时选的输入,不进档案。
- **设计原本**:onboarding 想让用户存最多 2 个长期困扰(冒痘/泛红/干燥…),首页 chips 也想显示。
- **决定**:☐ 困扰只做临时输入(不进档案,首页不显示困扰 chip) ☐ 给 `SkinProfile` 加 `concerns: string[]`
- **我推荐**:加 `concerns: string[]`。它是"首页 profile chips"和"推荐更准"的基础,只加一个 string[] 成本很低。

## 3. 安全信息(孕期/哺乳/处方药/感染)怎么存?

- **现状**:没有 safety 字段,只有泛用的 `sensitivities: string[]`。
- **设计原本**:onboarding 有独立"安全"步骤,勾选严重项 → 结果页出琥珀色警告 + 转诊皮肤科 + 从推荐里剔除强活性成分。
- **决定**:☐ 复用 `sensitivities`(把 arb/pregnancy 等塞进同一个 string[]) ☐ 加独立 `safetyFlags: string[]`
- **我推荐**:加独立 `safetyFlags: string[]`。安全项要驱动"转诊 + 剔除强活性"这种硬逻辑,跟"皮肤敏感成分"混在一个数组里,后端很难区分该不该触发警告。

## 4. 天气:确认是纯展示 mock,对吧?

- **现状**:`SkinProfile` 只有 `city: string`,没有天气数据。你 0707 的规矩也写了 UI pass **不做真天气**。
- **设计原本**:onboarding 和推荐结果页有天气卡(温度/湿度/UV/季节/气候标签)。
- **决定**:☐ 确认天气全部由 city 派生的写死 mock、纯展示(我按这个做) ☐ 你打算之后接真天气 API
- **我推荐**:确认纯 mock。跟你的规矩一致,我把 4 个城市(上海/北京/洛杉矶/伦敦)的天气写死在前端展示层,不碰后端。

## 5.(较大)推荐结果 `VerdictResult` 要不要扩?

这是最影响设计的一条。

- **现状**:`VerdictResult = { recommendedIds, avoidIds, reason }` —— 一个 `reason` 字符串。
- **设计原本**(hero 结果屏)想要:环境证据卡 + 分类 note(酸类/成分叠加/安全)+ **每件产品单独的 why** + AM/PM routine + 法律行。这些现在后端一个都没有,只能从单个 `reason` 里硬凑。
- **决定**:
  - ☐ **不扩**:我把结果屏缩到契约能给的——推荐列表 + 避免列表 + 一整段 reason 文案,不做 per-item why、不做证据卡结构。
  - ☐ **扩**:你把 `VerdictResult` 改成结构化,比如
    ```ts
    type VerdictItem = { productId: string; why: string };
    type VerdictResult = {
      recommended: VerdictItem[];   // 带每件的 why
      avoid: VerdictItem[];
      environmentNote?: string;     // 环境/气候一句话
      routine?: { am: string[]; pm: string[] };  // 早晚
      reason: string;               // 兜底总述,保留
    };
    ```
    并在 `server.ts` 的 `mockVerdict` 里也照着填(无 key 也能演示)。
- **我推荐**:先**不扩**,第一版设计接现有契约,把 hero 屏做成"推荐/避免两栏 + 一段 reason"。等 demo 跑通、确定这个屏是重点,再决定要不要扩结构。避免现在就动后端拖慢你。

---

## 附:两条不用你决定、我自己处理的
- 推荐器交互:我按 main 现有的**聊天式**(`AiAdvisorTab` + `ChatMessage`)来重绘,不改成 chip 选择器。
- Routine:我按 main 的**独立 routine tab**(`RoutineTravelTab`)来设计,不把早晚塞进推荐结果里。

麻烦每条打个勾或回一句,我据此定第一版设计的边界。
