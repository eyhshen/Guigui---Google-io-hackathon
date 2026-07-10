# 注册入口 + 记录档案 — 实现说明与 Google 配置清单

日期：2026-07-10

## 做了什么

给 GuiGui 开通了真实的注册入口，并把「记录档案」（保存肤质档案 + 化妆柜）接到账号上。
保持 guest-first：浏览、扫码、问 AI、建档预览都无需注册，只有**保存/同步档案**这一步要求先注册。

- 两种真实注册方式：
  - **Google 登录**（首选）— 客户端 ID-token 流程，无需服务端密钥。未配置 Client ID 时按钮显示为「待配置」占位。
  - **邮箱 + 密码**（更简单的备选）— 密码经 PBKDF2（120k 轮 SHA-256）哈希后存储，绝不明文保存。
- 档案存储：本机浏览器 `localStorage`（决策：换设备/清缓存会丢，适合 hackathon demo）。
  - `guigui.session` — 当前登录账号 id
  - `guigui.users` — 账号注册表（邮箱账号含 salt/hash）
  - `guigui.data.<id>` — 该账号的档案（profile + inventory）
- 登录后档案随每次改动自动持久化；下次打开自动带回并跳过 onboarding。

## 相关文件

- `src/auth.ts` — 账号 + localStorage + 密码哈希 + Google ID-token 解码
- `src/components/AuthSheet.tsx` — 注册/登录底部弹层（Google 按钮 + 邮箱表单）
- `src/App.tsx` — 账号状态、保存门禁、启动时恢复、退出登录
- `src/components/Sheets.tsx` — 菜单反映登录态；旧的占位 AccountSheetBody 已移除
- `.env.example` — 新增 `VITE_GOOGLE_CLIENT_ID` 说明

## 验证（已在浏览器跑通）

- 访客保存档案 → 弹出注册页
- 邮箱注册 → 密码哈希、无明文、账号+档案落地、toast「档案已保存」
- 刷新 → 登录态恢复，菜单显示邮箱 + 退出登录
- 登录态下改肤质保存 → 持久化（skinType=oily）
- 退出登录 → 邮箱重新登录 → 恢复原档案
- `npm run lint` ✓  `npm run build` ✓

## Google OAuth 配置清单（需要 Elaine 配合）

要点亮「用 Google 继续」按钮，只需一样东西：**一个 OAuth 2.0 Client ID**（Web 应用类型）。
**不需要** client secret（客户端 ID-token 流程）。

在 [Google Cloud Console](https://console.cloud.google.com/) 里：

1. **建/选一个项目**（任意名字，如 `guigui`）。
2. **配置 OAuth 同意屏幕**（APIs & Services → OAuth consent screen）：
   - User Type：**External**
   - App name：`GuiGui`（柜柜）；support email：你的邮箱
   - 保存为 **Testing** 模式即可；在 **Test users** 里加上你要登录用的 Google 邮箱
3. **创建凭据**（APIs & Services → Credentials → Create Credentials → OAuth client ID）：
   - Application type：**Web application**
   - **Authorized JavaScript origins** 加上你实际访问的地址（精确到端口，含协议）：
     - `https://localhost:3000`（默认端口）
     - 如果你用别的端口跑（本次测试用的是 `https://localhost:3187`），也一并加上
   - **Authorized redirect URIs**：留空即可（此流程不用回调）
4. 创建后复制 **Client ID**（形如 `xxxxx.apps.googleusercontent.com`）。

把它填进 `.env.local`：

```
VITE_GOOGLE_CLIENT_ID="你的-client-id.apps.googleusercontent.com"
```

重启 `npm run dev`，Google 按钮自动启用。

> 说明：需要的只有「Client ID」——不用密码、不用 client secret、不用付费。
> 只是在 Google 后台登记一下「允许从这个网址用我的 Google 账号登录」。
