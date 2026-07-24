---
id: trade-stocks
title: 如何買入和賣出股票
slug: /app-guide/guides/trade-stocks
description: 在 Virtu Capital APP 搜索股票、填寫訂單並查看狀態
sidebar_position: 3
---

# 如何買入和賣出股票

## 開始前

- 確認賬戶已完成開戶並有足夠的對應幣種餘額。
- 港股通常按每手股數交易，訂單頁會顯示“每手”數量。
- 限價單隻限定成交價格，不保證一定成交。

## 1. 找到股票

進入“市場”或“自選”，搜索股票代碼或名稱，也可以從熱門股票列表進入。點擊股票後進入行情詳情頁。

![騰訊控股行情詳情](../assets/zh-Hans/trade/01-stock-detail.png)

## 2. 進入交易頁

點擊底部“交易”。如果只需要快速下單，也可以選擇“快買”或“快賣”。

## 3. 選擇買入或賣出

在訂單頁選擇“買入”或“賣出”，然後確認：

| 字段 | 說明 |
| --- | --- |
| 訂單類型 | 當前頁面爲限價單 |
| 有效期 | 當日有效、長期有效或指定日期有效 |
| 價格 | 買入時表示願意支付的最高價格；賣出時表示願意接受的最低價格 |
| 數量 | 輸入股數，並留意每手股數要求 |

四種入口的區別如下：

| 操作 | 適用場景 | 提交前重點檢查 |
| --- | --- | --- |
| 交易買入 | 在完整訂單頁設置買入價格、數量和有效期 | 可用餘額、每手股數、預計總支出 |
| 交易賣出 | 在完整訂單頁設置賣出價格、數量和有效期 | 當前持倉、可賣數量、預計到賬 |
| 快買 | 在股票詳情頁快速填寫買入價格和數量 | 訂單金額、手續費、市場狀態 |
| 快賣 | 在股票詳情頁快速填寫賣出價格和數量 | 當前持倉、手續費、市場狀態 |

<div className="screenshot-grid screenshot-grid--four">
  <figure><img src={require('../assets/zh-Hans/trade/06-buy.png').default} alt="交易買入" /><figcaption>交易買入</figcaption></figure>
  <figure><img src={require('../assets/zh-Hans/trade/07-sell.png').default} alt="交易賣出" /><figcaption>交易賣出</figcaption></figure>
  <figure><img src={require('../assets/zh-Hans/trade/08-quick-buy.png').default} alt="快買" /><figcaption>快買</figcaption></figure>
  <figure><img src={require('../assets/zh-Hans/trade/09-quick-sell.png').default} alt="快賣" /><figcaption>快賣</figcaption></figure>
</div>

## 4. 輸入價格和數量（股數）
以限價單爲例，選擇買入或賣出後，輸入股票價格與數量（股數）
:::warning 輸入股票價格與數量
- 股票價格默認爲當前市價，可以調整價格高低掛單
- 股票交易僅支持一手股票的整數倍\
請確定自己輸入的股票價格和數量
:::

## 5. 查看預估金額和手續費

提交前檢查訂單金額、手續費、預計總支出收入和可用餘額。

<div className="screenshot-grid screenshot-grid--two">
  <figure><img src={require('../assets/zh-Hans/trade/03-order-filled.png').default} alt="買入股票檢查訂單金額和費用" /><figcaption>買入股票檢查訂單金額和費用</figcaption></figure>
  <figure><img src={require('../assets/zh-Hans/trade/10-sell.png').default} alt="賣出股票檢查訂單金額和費用" /><figcaption>賣出股票檢查訂單金額和費用</figcaption></figure>
</div>

:::warning 限價單不保證成交
買入限價單隻會按指定價格或更低價格成交；賣出限價單隻會按指定價格或更高價格成交。如果市場沒有達到限價，訂單可能保持“已提交”或到期未成交。
:::

## 5. 提交訂單

點擊“買入下單”或“賣出下單”。看到下單成功提示後，點擊“確認”。

![股票買入下單成功](../assets/zh-Hans/trade/04-success.png)

:::warning 下單成功只表示訂單已提交，不代表已經成交。
休市期間或市場尚未達到限價時，訂單可能繼續等待。
:::

## 6. 查看訂單狀態

進入“資產”，點擊“訂單”。可以使用狀態、買賣方向和訂單類型篩選，也可以搜索訂單號、股票代碼和股票名稱。

訂單列表會顯示訂單價格、股數、金額、已成交數量和當前狀態。

![查看股票訂單狀態](../assets/zh-Hans/trade/05-orders.png)

### 常見狀態

- 已提交：訂單已經進入系統，尚未全部成交。
- 已成交：訂單股數已經全部成交。
- 部分成交：只有部分股數成交，剩餘部分仍可能繼續等待成交。
- 已取消：訂單已經撤銷，不會繼續成交。
