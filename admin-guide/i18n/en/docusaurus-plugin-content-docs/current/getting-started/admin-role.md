---
title: Becoming an Administrator
sidebar_position: 1
---

## Administrator Account Provisioning

Administrator access must be authorized by the organization; ordinary users cannot enable it themselves. Before applying, confirm that the applicant’s identity has been verified, that their role genuinely requires back-office access, and that the corresponding approval has been obtained.

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">1</span>
    <div className="admin-step-title">Prepare an existing user account</div>
  </div>
  <p>The applicant must first have a verifiable Virtu Capital user account. Never share one administrator account among multiple people, and never send passwords through documents, tickets, or chats.</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">2</span>
    <div className="admin-step-title">Submit a role request</div>
  </div>
  <p>Submit the request through the organization’s designated internal approval process. Include the user identifier, job role, requested role, purpose of access, and validity period. Approvers must follow the principle of least privilege.</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">3</span>
    <div className="admin-step-title">Have an authorized person change the role</div>
  </div>
  <p>A person with role-management permission locates the account in the “Investors” list, opens the role-change interface, and verifies the target role and scope of impact before applying the change. An ordinary administrator must not promote themselves to super administrator.</p>
</div>

<div className="admin-step-card">
  <div className="admin-step-header">
    <span className="admin-step-number">4</span>
    <div className="admin-step-title">Verify and retain an audit trail</div>
  </div>
  <p>The applicant logs in again and confirms that only approved features are visible. The approver then verifies the role-change record in the audit log. When a person changes jobs, leaves the organization, or reaches the end of the authorization period, promptly reduce or revoke back-office access.</p>
</div>

### Role Selection Principles

| Role | Intended Users | Boundary |
| --- | --- | --- |
| **Investor** | Ordinary client users | Must not access the administrator back office |
| **Administrator** | Authorized operations, customer-service, or risk-control personnel | Performs routine queries, maintenance, and first-level reviews; high-risk changes still require additional review |
| **Super administrator** | A very small number of final approvers | Handles roles, system settings, and high-risk operations that require final review |

> ⚠️ Super administrator is not the default role for daily work. If you cannot determine which role to grant, retain the lower-privilege role and contact the organization’s authorization owner.
