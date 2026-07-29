---
title: Becoming an Administrator
sidebar_position: 1
---

##

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">1</span>
    <div className="admin-step-title">Register as an investor in the App</div>
  </div>
  <p>Register as an investor in the Virtu Capital App using a Hong Kong mobile number, and set a custom email address (for example, name@virtu-capital.com) and password.<br />The email address currently does not need to be registered or verified in advance. Email verification will be added later.</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">2</span>
    <div className="admin-step-title">Change the role to Administrator</div>
  </div>
  <p>An existing administrator changes the investor’s role to Administrator. The role change from Investor to Administrator is complete after a super administrator approves it.</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">3</span>
    <div className="admin-step-title">Change the role to Super Administrator</div>
  </div>
  <p>Back-end technical personnel change the investor’s role to Super Administrator.</p>
</div>

## Role Selection Principles

| Role | Intended Users | Boundary |
| --- | --- | --- |
| **Investor** | Ordinary client users | Must not access the administrator back office |
| **Administrator** | Authorized operations, customer-service, or risk-control personnel | Performs routine queries, maintenance, and first-level reviews; high-risk changes still require super-administrator review |
| **Super administrator** | A very small number of final approvers | Handles roles, system settings, fund outflows, and other high-risk operations that require final review |
