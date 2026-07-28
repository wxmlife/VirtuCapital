---
title: 如何成为管理员
sidebar_position: 1
---

## 管理员账号开通

管理员权限必须由组织授权，不能由普通用户自行开通。申请前应确认申请人已完成身份核验、岗位确实需要访问后台，并已取得对应审批。

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">1</span>
    <div className="admin-step-title">准备现有用户账号</div>
  </div>
  <p>申请人应先拥有可核验的 Virtu Capital 用户账号。不要为多人共用一个管理员账号，也不要在文档、工单或聊天中传递密码。</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">2</span>
    <div className="admin-step-title">提交角色申请</div>
  </div>
  <p>通过组织规定的内部审批流程提交申请，写明用户标识、岗位、所需角色、权限用途和有效期限。审批人应遵循最小权限原则。</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">3</span>
    <div className="admin-step-title">由授权人员变更角色</div>
  </div>
  <p>具备角色管理权限的人员在「投资者」列表中定位账号，打开角色变更界面，核对目标角色和影响范围后执行。普通管理员不得自行提升为超级管理员。</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">4</span>
    <div className="admin-step-title">验证并留痕</div>
  </div>
  <p>申请人重新登录并确认只出现获批功能；审批人随后在审计日志中核对角色变更记录。岗位变化、离职或授权到期时，应及时降权或撤销后台访问。</p>
</div>

### 角色选择原则

| 角色 | 适用对象 | 边界 |
| --- | --- | --- |
| **投资者** | 普通客户端用户 | 不应访问管理员后台 |
| **管理员** | 运营、客服或风控等获授权人员 | 执行日常查询、维护和初审；高风险变更仍需复核 |
| **超级管理员** | 极少数最终审批人员 | 处理角色、系统设定及需要终审的高风险操作 |

> ⚠️ 超级管理员不是日常工作的默认角色。无法确认应授予哪种角色时，先保持较低权限并联系组织的授权负责人。
