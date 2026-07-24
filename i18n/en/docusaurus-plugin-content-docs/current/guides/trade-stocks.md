---
id: trade-stocks
title: Buying and Selling Stocks
slug: /app-guide/guides/trade-stocks
description: Find a stock, complete an order, and review its status in the Virtu Capital app
sidebar_position: 3
---

# Buy and Sell Stocks

## Before you start

- Complete account opening and make sure sufficient funds are available in the correct currency.
- HK stocks generally trade in board lots; check the lot size shown on the order page.
- A limit order controls the acceptable price but does not guarantee execution.

## 1. Find a stock

Open **Market** or **Watchlist**, search by code or name, then tap the stock to open its details.

![Stock details](../assets/en/stock-detail/01-stock-detail.png)

## 2. Open the trading page

Tap **Trading**. Where available, **Quick Buy** and **Quick Sell** provide a shorter entry from stock details.

## 3. Choose Buy or Sell

Check the side and complete these fields:

| Field | What to check |
| --- | --- |
| Order type | The current page uses a limit order |
| Validity | Day, Good Til Canceled, or a selected expiry date |
| Price | Maximum acceptable buy price or minimum acceptable sell price |
| Quantity | Number of shares, subject to the board-lot requirement |

![Order-entry page](../assets/en/trade/01-order-entry.png)

If you select a fixed expiry date, use the calendar and confirm the date before returning to the order.

![Select an order expiry date](../assets/en/trade/05-validity-date.png)

## 4. Enter price and quantity

The current market price may be prefilled. Adjust it only after checking the side, market status, and lot size. Stock quantity must be a valid whole-share and board-lot amount for the selected market.

## 5. Review amount and fees

Before submission, check the order amount, fees, estimated total debit or credit, available funds, and available position.

:::warning A limit order may remain unfilled
A buy limit order executes only at the limit or lower; a sell limit order executes only at the limit or higher. If the market does not reach the limit, the order can remain submitted or expire.
:::

## 6. Submit

Tap the buy or sell submission button, then wait for the success message.

![Buy order submitted](../assets/en/trade/02-buy-success.png)

For a sell order, verify the side and available shares in the order page before submission.

![Sell order entry](../assets/en/trade/03-sell-entry.png)

![Sell order submitted](../assets/en/trade/04-sell-success.png)

:::warning Submitted does not mean filled
During market closure or while the market is away from your limit, the order can continue waiting.
:::

## 7. Review status

Open **Assets → Orders**. Search by order ID, code, or name, or filter by status, side, and order type.

![Order list and status](../assets/en/orders/01-orders.png)

### Common statuses

- **Submitted**: received by the system but not fully executed.
- **Filled**: the complete quantity has executed.
- **Partially filled**: only part of the quantity has executed.
- **Canceled**: the remaining order will not continue executing.
