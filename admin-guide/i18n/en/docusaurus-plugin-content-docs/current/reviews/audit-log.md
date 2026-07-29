---
title: Audit Log
sidebar_position: 2
---

##

**Navigation**: Left sidebar → “Audit Log”

The audit log records administrator actions on resources such as users, transactions, stocks, and system configuration. Use it for security audits and incident tracing.

![Audit-log list and filters](../assets/V102/audit-log-list.jpg)

### Search Logs

Combine the following filters:

| Filter | Description |
|------|------|
| **Keyword** | Search the action name or summary |
| **Action type** | Create, modify, delete, review, and other actions |
| **Result** | Success or failure |
| **Resource type / Resource ID** | Locate the affected business resource |
| **Administrator user ID** | Locate the person who performed the action |
| **Target user ID** | Locate the affected user |
| **Start time / End time** | Restrict the time range in which the action occurred |

After setting the filters, run the search. To view a newly completed action, click “Refresh” to retrieve the latest data.

### Log Fields and Details

The list shows the time, action, administrator, target user, resource type and ID, result, source IP, summary, and a link to the details. Click “View Details” to verify the request parameters, changes, and execution result.

When investigating an issue, narrow the scope in this order:

1. Use the time range and result to locate the anomalous batch.
2. Use the administrator ID, target user ID, or resource ID to find the specific record.
3. Check the source IP, action summary, and details to confirm who performed which action on which resource and when.
4. Use pagination to continue reviewing other records in the same period.
