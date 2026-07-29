---
title: Role Permissions and Support
sidebar_position: 2
---

## Role Permissions and Operating Boundaries

The two tables below summarize what investors, administrators, and super administrators can do. Before acting, confirm whether your role is initiating a request, performing the first review, or changing a setting. Any action marked as requiring super-administrator review must wait for final approval.

### Client Role Operation Permissions

![Account and asset operation permissions](../assets/V102/permissions-account-assets.png)

### Administrator Role Operation Permissions

![Customer, stock, market, and system configuration permissions](../assets/V102/permissions-customer-system.png)

Actual access also depends on organizational authorization, account status, and the deployed version. If the page and the images differ, follow the permissions and controls shown in the system.

:::warning High-risk operations
Role changes, system settings, exchange rates, operations involving funds or positions, first reviews, and final reviews must not be completed by one person circumventing the approval chain.
:::

#### Auditing and Traceability

- After completing a role change, review, or configuration operation, verify the record in the audit log.
- Narrow the search using the operator, target user, resource ID, result, and time range.
- Failed records must also be retained and investigated.

![Audit-log list and filters](../assets/V102/audit-log-list.jpg)

##### Permission Revocation

- When a person changes roles, leaves the organization, shares an account, experiences an anomalous login, or reaches the end of an authorization period, promptly reduce access through the organization’s approval process.
- Do not delete a user as a substitute for changing their role and revoking permissions.

## Contact Support

| Issue Type | Contact |
| --- | --- |
| Technical issue | tech-support@virtucapital.com |
| Business inquiry | operations@virtucapital.com |
| Emergency | 24-hour hotline: +852-xxxx-xxxx |

When submitting a problem, include:

- Time, environment, and current route;
- Current account role (never provide a password or verification code);
- Reproduction steps and page error text;
- Related business-record ID or audit-log ID;
- Redacted screenshots or logs.
