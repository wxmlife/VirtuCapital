---
title: stock management
sidebar_position: 1
---

## 4. Stock Management

### 4.1 Overview of Huanghe Account Positions

**Operation path**: Left navigation bar → "Stock Management"

The top shows the overall position status of the platform:

| Indicator | Description |
|------|------|
| **Number of stocks held** | Number of stock types managed by the platform |
| **Total positions of Huanghe account** | Total market value of positions of the platform's own accounts |
| **Number of positions that can be allocated** | Number of positions that have not yet been allocated to investors |
| **Number of positions allocated** | Number of positions allocated to investors |
| **Over-allocated stocks** | Stocks that have been allocated more than the total number of positions (risk indicator) |
| **Number of stocks managed** | Total number of stocks currently being managed |
| **Total number of positions set** | Total number of positions set for all stocks |
| **Number of positions allocated** | Total number of positions allocated to investors |
| **Investors involved** | Number of investors holding stocks |

> 🚨 **Focus on**: "Over-allocated stocks" indicate abnormal allocation and need to be verified immediately.
![](../assets/06-stockManage-accountPosition.jpg)


### 4.2 Stock management list

#### Search function

| Search conditions | Description |
|---------|------|
| **Stock Name** | Enter the Chinese/English name of the stock |
| **Stock Code** | Enter the stock code (such as 00700) |
| **Market Search** | Filter by market (Hong Kong stocks/US stocks/A shares) |

#### Table field description

| Field | Description |
|------|------|
| **Stock** | Stock name |
| **Market** | Market (Hong Kong stocks HK/US stocks/A shares CN) |
| **Total positions** | The total number of positions set for this stock |
| **Number of positions allocated** | Number of positions allocated to investors |
| **Number of remaining warehouses** | Total number of warehouses - Number of allocated warehouses |
| **Number of investors** | Number of investors holding the stock |
| **Establishment Time** | The time when the stock was added to the system |
| **Operation** | Edit/delete operations |

### 4.3 Add new stocks

**Operation path**: Stock management page → Click the "Add Stock" button
![](../assets/07-stockManage-addStock.jpg)

#### Step 1: Configure stock information

| Field | Description | Required |
|------|------|------|
| **Stocks** | Search and select stocks (supports name/symbol search) | ✅ |
| **Total number of stock positions** | Set the total number of positions of the stock | ✅ |
| **Initial Price (Cost Price)** | The initial cost price of the stock | ✅ |

#### Step 2: Investor Allocation

Allocate positions to investors:

| Field | Description |
|------|------|
| **Investors** | Select investors to allocate to |
| **Number of positions** | Number of positions allocated to this investor |
| **Cost Price** | The investor’s position cost price |
| **Proportion** | The proportion of the investor's positions to the total number of positions (automatically calculated) |
| **Action** | Delete this allocation row |

> 💡 **Tip**: You can add multiple rows to allocate to multiple investors at the same time.

#### Step 3: Configuration summary

The system automatically calculates and displays:
- **Total number of stock positions**: The set total number of positions
- **Number of allocated positions**: The total number of currently allocated positions
- **Number of remaining warehouses**: Total number of warehouses - Number of allocated warehouses

> ⚠️ **Verification Rules**: The number of allocated warehouses cannot exceed the total number of warehouses.



![](../assets/08-stock-allocateStock.jpg)

---
