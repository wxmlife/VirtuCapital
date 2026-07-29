---
title: 如何成為管理員
sidebar_position: 1
---

## 管理員帳號開通

管理員權限必須由組織授權，不能由普通用戶自行開通。申請前應確認申請人已完成身份核驗、崗位確實需要訪問後台，並已取得對應審核。

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">1</span>
    <div className="admin-step-title">準備現有用戶帳號</div>
  </div>
  <p>申請人應先擁有可核驗的 Virtu Capital 用戶帳號。不要為多人共用一個管理員帳號，也不要在文檔、工單或聊天中傳遞密碼。</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">2</span>
    <div className="admin-step-title">提交角色申請</div>
  </div>
  <p>透過組織規定的內部審核流程提交申請，寫明用戶識別碼、崗位、所需角色、權限用途和有效期限。審核人應遵循最小權限原則。</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">3</span>
    <div className="admin-step-title">由授權人員變更角色</div>
  </div>
  <p>具備角色管理權限的人員在「投資者」列表中定位帳號，打開角色變更介面，核對目標角色和影響範圍後執行。普通管理員不得自行提升為超級管理員。</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">4</span>
    <div className="admin-step-title">驗證並留痕</div>
  </div>
  <p>申請人重新登入並確認只出現獲批功能；審核人隨後在審計日誌中核對角色變更記錄。崗位變化、離職或授權到期時，應及時降權或撤銷後台訪問。</p>
</div>

### 角色選擇原則

| 角色 | 適用對象 | 邊界 |
| --- | --- | --- |
| **投資者** | 普通客戶端用戶 | 不應訪問管理員後台 |
| **管理員** | 營運、客服或風控等獲授權人員 | 執行日常查詢、維護和初審；高風險變更仍需複核 |
| **超級管理員** | 極少數最終審核人員 | 處理角色、系統設定及需要終審的高風險操作 |

> ⚠️ 超級管理員不是日常工作的預設角色。無法確認應授予哪種角色時，先保持較低權限並聯繫組織的授權負責人。
