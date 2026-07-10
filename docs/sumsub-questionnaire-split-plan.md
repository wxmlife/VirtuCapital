# Sumsub 开户问卷拆分方案

## 1. 职业信息 / Employment Information / 職業資訊

ID: `employmentAndFinanci`

保留字段：

| English | 简体中文 | 繁体中文 |
|---|---|---|
| Occupation type | 职业性质 | 職業性質 |
| Employer / business / school name | 公司 / 商号 / 学校名称 | 公司 / 商號 / 學校名稱 |
| Company / business / school address (if applicable) | 公司 / 业务 / 学校地址（如适用） | 公司 / 業務 / 學校地址（如適用） |
| Job title / business role / previous position | 职位 / 业务身份 / 过往职位 | 職位 / 業務身份 / 過往職位 |
| Industry / business nature / previous industry | 行业 / 业务性质 / 过往行业 | 行業 / 業務性質 / 過往行業 |
| Years employed / business operating / work experience | 任职 / 经营 / 工作经验年限 | 任職 / 經營 / 工作經驗年限 |

## 2. 资产投资信息 / Asset Investment Information / 資產投資資訊

ID: `assetInvestmentInfor`

字段：

| English | 简体中文 | 繁体中文 |
|---|---|---|
| Account type | 开户账户类型 | 開戶帳戶類型 |
| Source of funds (multiple choice) | 资金来源（多选） | 資金來源（多選） |
| Annual income (CNY) | 年收入（人民币） | 年收入（人民幣） |
| Source of wealth (multiple choice) | 财富来源（多选） | 財富來源（多選） |
| Net asset value (CNY) | 资产净值（人民币） | 資產淨值（人民幣） |
| Investment objective (multiple choice) | 投资目的（多选） | 投資目的（多選） |
| Monthly trading frequency | 每月交易次数 | 每月交易次數 |
| Risk tolerance | 风险承受能力 | 風險承受能力 |
| Stock investment experience (years) | 股票投资经验（年） | 股票投資經驗（年） |
| Index options / futures investment experience (years) | 指数期权 / 期货投资经验（年） | 指數期權 / 期貨投資經驗（年） |
| Warrants / stock options investment experience (years) | 认股证 / 股票期权投资经验（年） | 認股證 / 股票期權投資經驗（年） |
| Foreign exchange / precious metals investment experience (years) | 外汇 / 贵金属投资经验（年） | 外匯 / 貴金屬投資經驗（年） |
| Structured product investment experience | 结构性产品投资经验 | 結構性產品投資經驗 |
| Derivative product trading intention | 衍生产品买卖意向 | 衍生產品買賣意向 |
| Derivative product knowledge and experience confirmation | 衍生产品知识及经验确认 | 衍生產品知識及經驗確認 |

## 3. 合规信息确认 / Compliance Information Confirmation / 合規資訊確認

建议 ID: `complianceConfirmation`

字段：

| English | 简体中文 | 繁体中文 |
|---|---|---|
| I am the ultimate beneficial owner of this account and the person ultimately responsible for instructions on this securities account | 本人是该账户最终实益拥有人，并为该证券账户最终负责发出指示的人 | 本人是該帳戶最終實益擁有人，並為該證券帳戶最終負責發出指示的人 |
| Are you a director, employee or representative of the SFC, a licensed corporation or the Hong Kong Exchange participant? | 本人是否为香港证监会持牌法团、注册机构或香港交易所参与者的董事、雇员或代表？ | 本人是否為香港證監會持牌法團、註冊機構或香港交易所參與者的董事、僱員或代表？ |
| Are you related to any director or employee of Virtu Capital or its affiliates? | 本人与 Virtu Capital 或其联系公司的董事或雇员是否有亲属关系？ | 本人與 Virtu Capital 或其聯繫公司的董事或僱員是否有親屬關係？ |
| Are you a U.S. citizen, U.S. resident or green card holder? | 本人是否为美国公民、美国居民或绿卡持有者？ | 本人是否為美國公民、美國居民或綠卡持有者？ |
| Does your spouse hold a related margin financing account? | 本人的配偶是否持有相关保证金融资账户？ | 本人的配偶是否持有相關保證金融資帳戶？ |
| Do you or your spouse control 35% or more of any other margin account? | 本人或配偶是否控制其他保证金账户 35% 或以上权益？ | 本人或配偶是否控制其他保證金帳戶 35% 或以上權益？ |
| Does your business nature involve higher money-laundering risk? | 本人的业务性质是否有较高洗钱风险？ | 本人的業務性質是否有較高洗錢風險？ |
| Are you or your immediate family / close associates politically exposed persons? | 本人或直系亲属、关系密切人士是否为政治公众人物？ | 本人或直系親屬、關係密切人士是否為政治公眾人物？ |
| I agree to use the information provided for account opening to generate the W-8BEN tax form | 本人同意使用开户所填信息生成 W-8BEN 税务表格 | 本人同意使用開戶所填資訊生成 W-8BEN 稅務表格 |
| May we notify you about platform promotions through App or email? | 是否允许我们通过 App、邮件等方式告知您平台近期优惠活动？ | 是否允許我們透過 App、電郵等方式告知您平台近期優惠活動？ |

## 4. 风险披露 / Risk Disclosure / 風險披露

建议 ID: `riskDisclosure`

字段：

| English | 简体中文 | 繁体中文 |
|---|---|---|
| Risk disclosure content | 风险披露内容 | 風險披露內容 |
| I have read, understood, fully accepted and agreed to the above risk disclosure | 本人已经详细了解、清楚明白、完全接受并同意遵守以上披露内容 | 本人已經詳細了解、清楚明白、完全接受並同意遵守以上披露內容 |

## 5. 身份认证

把原「绑定香港银行卡」步骤替换为「活体自拍照 / Liveness selfie」。建议流程：

1. 证件 OCR / Identity document
2. 信息确认 / Confirmation
3. 活体自拍照 / Liveness selfie

