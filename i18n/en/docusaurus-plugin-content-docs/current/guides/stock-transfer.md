---
id: stock-transfer
title: Transferring Stock to Another User
slug: /app-guide/guides/stock-transfer
sidebar_position: 4
---

# Transfer Stock to Another User

Stock Transfer moves shares between two Virtu Capital clients. It is not the workflow for moving shares to another broker. Both parties must have opened Virtu Capital accounts.

## Understand the trade types

| Business term | Current app label | Meaning | Consideration shown in the app |
| --- | --- | --- | --- |
| MIT | Some pages show **IMT (Internal Manual Trade)** | The platform calculates and settles shares and funds using the agreed price × quantity | Agreed price × quantity |
| OTC | Some pages show **OTCT (Over-the-Counter Trade)** | The app processes the stock transfer only; the parties settle funds outside the platform | 0 |

:::caution Check the settlement method, not only the abbreviation
Business rules use MIT and OTC, while individual app pages can show IMT and OTCT. Confirm whether settlement occurs inside the platform and review the displayed consideration.
:::

A BSN is evidence supporting the transfer. If current business rules require it, upload a clear, genuine document that identifies the parties, stock, and arrangement even when the upload control says Optional.

## Steps

### 1. Open Stock Transfer

Open **Assets → Stock Transfer**.

![Stock Transfer form](../assets/en/stock-transfer/02-form.jpeg)

### 2. Select the recipient

Search using the recipient’s VC UID, phone number, or email. Confirm the full UID and name with the recipient; do not identify someone only by nickname.

![Recipient and stock selection](../assets/en/stock-transfer/03-recipient-and-stock.jpeg)

### 3. Select the stock and trade type

Search by code or name, choose a holding, and enter a whole-share quantity no greater than **Transferable**.

- **MIT/IMT**: enter the agreed price and verify the consideration calculated by the app.
- **OTC/OTCT**: the consideration in the app should be 0; the parties arrange and document any off-platform settlement themselves.

![Internal Manual Trade parameters](../assets/en/stock-transfer/04-imt-parameters.jpeg)

![Over-the-Counter Trade parameters](../assets/en/stock-transfer/05-otct-parameters.jpeg)

Review the complete form before continuing.

![Completed Stock Transfer form](../assets/en/stock-transfer/06-complete-form.png)

### 4. Upload BSN and confirm

Upload the supporting BSN, then verify the recipient, code, quantity, trade type, agreed price, and consideration. Expand and read the Risk notice and Disclaimer and check the confirmation box.

### 5. Save or submit

Save a draft if more information is required, or submit the request. The system generates an application number or six-digit trade code. Store it securely; the recipient may need it for confirmation.

![Stock Transfer request submitted](../assets/en/stock-transfer/07-submitted.jpeg)

Open **Stock Transfer Records** to filter incoming or outgoing transfers, review status, and see the counterparty, quantity, agreed price, and consideration.

![Stock Transfer Records](../assets/en/stock-transfer/01-records.png)

## Freezing and cancellation

- A draft’s effect on available positions and balance is determined by the record page and current available amounts.
- After an MIT request is submitted, the seller’s shares and the recipient’s corresponding funds may be frozen for settlement.
- After an OTC request is submitted, the seller’s shares may be frozen; no consideration is transferred inside the app.
- If **Cancel** is available before review, matching, or settlement begins, you can request cancellation.
- Wait for shares or funds to be released after a successful cancellation. If settlement has begun or no cancellation entry is available, contact customer support instead of submitting a duplicate.

:::warning Security
Transfer only to a verified Virtu Capital client. Recheck UID, stock, quantity, MIT/OTC type, and BSN before submission. Never disclose a verification code, sign-in password, or trading password.
:::
