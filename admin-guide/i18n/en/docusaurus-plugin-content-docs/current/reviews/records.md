---
title: Record Review
sidebar_position: 1
---

## 6. Record Review

**Navigation**: Left sidebar → “Records”

The Records page presents orders, deposits, withdrawals, currency exchanges, share transfers, stock transfers, and other business activities in one place. A notification indicator on the menu means that records are awaiting action.

![Pending-review record list](../assets/V102/records-pending-list.jpg)

### 6.1 Search Records

| Filter | Description |
|------|------|
| **Record type** | All, order, deposit, withdrawal, currency exchange, share transfer, stock transfer, back-office operation, and other types |
| **Investor** | Search by name, email, mobile number, or investor ID |
| **Review status** | No review required, pending review, pending super-administrator review, approved, rejected, or canceled |
| **Stock** | Search by code, Ticker, Stock Key, or name |

Click “Apply Filters” to run the query, “Reset” to clear the filters, and “Refresh” to retrieve the latest status. The list shows the investor, stock, action type, pending task, quantity, amount, time, review status, business status, and a details entry point, with pagination.

### 6.2 General Review Principles

1. Open the details and verify the applicant, amount or quantity, attachments, and related account.
2. Check whether frozen funds or positions are sufficient and whether fees are correct.
3. Compare the lifecycle, related transactions, and activity log to confirm that statuses agree.
4. Reconfirm critical data before approval. When rejecting a request, provide a clear reason.
5. High-risk operations such as withdrawals and stock transfers still require a second review by a super administrator after administrator approval.

### 6.3 Inbound Stock-Transfer Review

The details page shows the transfer number, action type, business and review status, investor, destination broker, source broker, source account, settlement-participant code, inbound stocks and quantities, attachments, lifecycle, activity log, and review controls.

![Inbound stock-transfer details](../assets/V102/records-inbound-transfer-detail.jpg)

Verify that the source broker’s transfer-out confirmation, source account, destination broker, stock codes, quantities, and application files agree. Do not approve an incomplete request. Enter a clear review note before approving or rejecting it, then confirm that the lifecycle advances to the next state.

### 6.4 Outbound Stock-Transfer Review

Important details include the receiving broker, receiving account, contact person, stocks and quantities being transferred, frozen positions, fees, market value, application attachments, lifecycle, related fund records, and activity log.

![Outbound stock-transfer details](../assets/V102/records-outbound-transfer-detail.jpg)

Confirm that the receiving information is complete, the frozen quantity is sufficient, the fee is correct, and the application form, signature, and broker statement agree with the request. After administrator approval, wait for super-administrator review according to the workflow. The final status must agree with the position release, related fund record, and lifecycle.

### 6.5 Share-Transfer Review

Share-transfer details show the sender and recipient, stock, quantity, agreed price, agreed amount, currency, BSN, frozen position, related transactions, and activity log.

![Share-transfer details](../assets/V102/records-stock-transfer-detail.jpg)

Verify both parties’ identities, the quantity, price, and amount calculation. Confirm that the sender’s position has been frozen correctly and that no duplicate or conflicting transaction exists before approving or rejecting the request.

### 6.6 Other Records

- **Cash deposits**: Verify the deposit method, currency, amount, fee, payer account, and evidence. After approval, verify the related credit entry and balance change.
- **Cash withdrawals**: Verify the receiving account, available balance, frozen amount, fee, and attachments. After administrator review, wait for final review according to the workflow.
- **Orders, buys/sells, and currency exchanges**: Verify available funds or positions, price, fees, and market status.
- **Information changes**: Compare information before and after the change; sensitive information requires additional verification.
- **Back-office operations**: Verify the operator, target resource, change summary, and execution result.

A typical review lifecycle is: Submitted → Pending Review → Administrator Approved → Pending Super Administrator Review → Completed. Any review stage may become Rejected when information is invalid; a user-initiated cancellation is shown as Canceled.

### 6.7 Post-Review Verification

1. Refresh the record and confirm that the review status has updated.
2. Verify that the business status and fund or position status agree with the review result.
3. Check that related transactions, the lifecycle, and the activity log are not stuck in an intermediate state.
4. For high-risk business operations, wait for final review; do not click the review button again.
5. If statuses disagree, stop subsequent operations and use the record ID to investigate in the audit log.
