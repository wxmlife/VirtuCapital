---
title: Dashboard Overview
sidebar_position: 3
---

## 2. Dashboard Overview

The dashboard is the administrator’s overview page after login. Use it to assess platform assets, account balances, and system status quickly. Follow the definitions, currencies, and update times currently shown on the page.

### 2.1 Market Overview Cards

| Metric | Description |
| --- | --- |
| **Total investors** | Number of investors currently included in the statistics |
| **Total assets (HKD)** | Aggregate assets converted according to the exchange-rate basis shown on the page |
| **Stock value (HKD)** | Aggregate market value of investors’ stock holdings |
| **Cash** | Aggregate balances in HKD, USD, USDT, and other currencies |

Use these cards to identify obvious anomalies; they do not replace business-detail checks or accounting reconciliation. If a value appears abnormal, check market-data exchange rates, stock quotes, investor holdings, and fund records in that order.

<!-- screenshot-slot: dashboard-overview; status: placeholder -->
> 📷 **Screenshot pending: complete dashboard overview.**

### 2.2 Yellow River Account

This area shows visible currency balances for the platform account, such as USD and HKD. Use the balances only for viewing and reconciliation; perform actual transfers, credits, or debits through the corresponding business workflow.

> ⚠️ If a dashboard balance differs from business records, do not try to “correct” the display by approving or entering a transaction again. Locate the original record and audit log first.

### 2.3 Quick Actions

Quick-action cards open frequently used pages such as Investors, Stock Management, Market Data, and Message Templates. After clicking, confirm that the page title matches the intended destination before acting. Using the browser Back button does not automatically undo content that has already been saved or submitted.

### 2.4 System Information

| Item | Description |
| --- | --- |
| **Application** | Current back-office application name |
| **Version** | Current deployment version, used for troubleshooting |
| **Environment** | Current runtime environment; never mix test and production data |

<!-- screenshot-slot: dashboard-system-status; status: placeholder -->
> 📷 **Screenshot pending: platform account balances and system-information area.**

### 2.5 Daily Inspection Recommendations

1. Confirm that total assets, stock value, and cash have no unexplained sudden changes.
2. Check whether platform account balances agree with recently completed fund records.
3. Check whether a pending-task indicator appears beside “Records.”
4. Check the latest market-data synchronization status.
5. When reporting a problem, include the page, time, environment, and version, but do not attach customer data that has not been redacted.
