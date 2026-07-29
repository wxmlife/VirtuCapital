---
title: Role Permissions and Support
sidebar_position: 2
---

## Role Permissions and Operating Boundaries

The system uses three role types. Menus that are actually visible also depend on the deployed version, account status, and organizational authorization. If page permissions differ from this table, follow the stricter boundary and contact the authorization owner for confirmation.

| Capability | Investor | Administrator | Super Administrator |
| --- | :---: | :---: | :---: |
| Use the client to view one’s own account and activity | ✓ | According to the underlying account | According to the underlying account |
| Log in to the administrator back office | — | ✓ | ✓ |
| Query investor, customer, stock, and market information | — | Within the authorized scope | ✓ |
| View records and audit logs | — | Within the authorized scope | ✓ |
| Perform first-level business reviews | — | Within the authorized scope | ✓ |
| Edit and submit exchange rates or system settings for review | — | Within the authorized scope | ✓ |
| Perform final reviews of high-risk records or settings | — | — | ✓ |
| Change back-office roles | — | — | Authorized super administrators only |

`✓` means that the role meets the basic prerequisite for that type of capability; it does not mean that every operation has been authorized. `—` means the operation must not be performed through that role.

### Role Changes

1. Locate the user precisely using the name, mobile number, and VC User ID.
2. Verify the current role, target role, and approval basis.
3. Grant only the minimum role required for the person’s responsibilities.
4. After the change, require the user to log in again and verify the visible menus.
5. Verify the operator, target user, time, and result in the audit log.

<!-- screenshot-slot: permissions-role-change-dialog; status: placeholder -->
> 📷 **Screenshot pending: investor role-change confirmation interface.**

:::warning High-risk operations
Role elevation, system settings, exchange rates, and final reviews involving funds or positions must not be completed by one person circumventing the approval chain. The presence of a button does not mean that the current person has business authorization to use it.
:::

### Auditing and Traceability

After completing a role change, review, or configuration operation, verify the record in the audit log. Narrow the search using the operator, target user, resource ID, result, and time range. Failed records must also be retained and investigated.

![Audit-log list and filters](../assets/V102/audit-log-list.jpg)

### Permission Revocation

When a person changes roles, leaves the organization, shares an account, experiences an anomalous login, or reaches the end of an authorization period, promptly reduce or revoke access through the organization’s approval process and inspect recent audit logs. Do not use a display-name change as a substitute for revoking permissions.

### Contact Support

This repository does not provide a verified public technical-support email address or hotline. For technical failures, business questions, or security incidents, contact the appropriate personnel through the organization’s authorized internal support, on-call, or escalation process. Do not use historical placeholder contact details from the documentation.

When submitting a problem, include:

- Time, environment, and current route;
- Current account role (never provide a password or verification code);
- Reproduction steps and page error text;
- Related business-record ID or audit-log ID;
- Redacted screenshots or logs.
