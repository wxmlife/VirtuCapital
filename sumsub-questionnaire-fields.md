# Sumsub 开户问卷字段清单

导出时间：2026-07-13

说明：以下内容按当前 Sumsub Cockpit 配置导出，覆盖个人开户流程的 4 份问卷；包含字段 ID、字段类型、三语标题、显示条件、占位符及选项。

## 总览

| 问卷 ID | 问卷名称 | 字段数量 |
|---|---|---:|
| `informationQuestion` | 填写信息 / Fill in Information | 19 |
| `employmentAndFinanci` | 职业及财务信息 / Employment And Financial Information | 18 |
| `assetInvestmentInfor` | 资产投资信息 / Asset Investment Information | 15 |
| `confirmationOfCompli` | 合规信息确认 / Confirmation of Compliance | 32 |

## 个人基础信息 / Fill in Information

- 问卷 ID：`informationQuestion`
- 英文名称：Fill in Information
- 简体/繁体名称：填写信息 / 填寫資訊

### 1. basicInformation

- Section ID：`basicInformation`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `fullName` | 短文本 | 姓名 | 姓名 | Full Name | 是 |  | 请输入您的姓名 / 請輸入您的姓名 / Please enter your full Name | 无 |
| 2 | `firstName_dzoat` | 短文本 | 名 | 名 | First Name | 是 |  | 请输入您的名 / 請輸入您的名 | 无 |
| 3 | `lastName` | 短文本 | 姓 | 姓 | Last Name | 是 |  | 请输入您的姓 / 請輸入您的姓 | 无 |
| 4 | `gender` | 单选 | 性别 | 性別 | Gender | 是 |  |  | `Male` - 男 / 男 / Male<br>`Female` - 女 / 女 / Female |
| 5 | `officialAcademicCred` | 下拉选择 | 学历 | 學歷 | Education | 是 |  | 请选择您的学历 / 請選擇您的學歷 / Please select your official academic credentials | `Master degree and above` - 硕士及以上 / 碩士及以上 / Master degree and above<br>`Bachelor Degree` - 本科 / 本科 / Bachelor Degree<br>`College Degree/Diploma` - 大专/文凭 / 大專/文憑 / College Degree/Diploma<br>`High/Junior High School` - 高中/初中 / 高中/初中 / High/Junior High School<br>`Primary and below` - 小学及以下 / 小學及以下 / Primary and below |
| 6 | `dateOfBirth` | 日期 | 出生日期 | 出生日期 | Date of Birth | 是 |  |  | 无 |
| 7 | `nationality` | 国家/地区 | 国籍 | 國籍 | Nationality | 是 |  | 请选择您的国籍 / 請選擇您的國籍 / Please select your nationality | 无 |
| 8 | `idTypeAndNumber` | 下拉选择 | 证件类型 | 證件類型 | ID Type | 是 |  | 请选择您的证件类型 / 請選擇您的證件類型 / Please select your ID type | `ID card` - 身份证 / 身份證 / ID card<br>`Passport` - 护照 / 護照 / Passport<br>`Driver's license` - 驾驶证 / 駕駛證 / Driver's license<br>`Residence permit` - 居留许可 / 居留許可 / Residence permit |
| 9 | `idNumber` | 短文本 | 证件号码 | 證件號碼 | ID Number | 是 |  | 请输入您的证件号码 / 請輸入您的證件號碼 / Please enter your ID number | 无 |
| 10 | `idValidFromDate` | 日期 | 证件有效起始日期 | 證件有效起始日期 | ID Valid From (Date) | 是 |  |  | 无 |
| 11 | `idValidToDate` | 日期 | 证件有效截止日期 | 證件有效截止日期 | ID Valid To (Date) | 是 |  |  | 无 |
| 12 | `issuingAuthority` | 短文本 | 签发机关 | 簽發機關 | Issuing Authority | 是 |  | 请输入证件签发机关 / 請輸入證件簽發機關 / Please enter the authority that issued the certificate. | 无 |
| 13 | `doYouHaveAHongKongId` | 单选 | 您是否持有香港身份证？ | 您是否持有香港身份證？ | Do you have a Hong Kong identity card? | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 14 | `countryregionOfResid` | 国家/地区 | 居住国家/地区 | 居住國家/地區 | Country/Region of Residence | 是 |  | 请选择居住国家/地区 / 請選擇居住國家/地區 / Please select the country/region of residence | 无 |
| 15 | `residenceAddressFull` | 短文本 | 居住地址（完整地址） | 居住地址（完整地址） | Residence Address (Full Address) | 是 |  | 请输入完整居住地址 / 請輸入完整居住地址 / Please enter the full residence address | 无 |
| 16 | `isYourTaxAddressTheS` | 单选 | 您的税务居住地址是否与居住地址相同？ | 您的稅務居住地址是否與居住地址相同？ | Is your tax residence address the same as your residential address? | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 17 | `taxAddressFullAddres` | 短文本 | 税务地址（完整地址） | 稅務地址（完整地址） | Tax Address (Full Address) | 是 | `basicInformation.isYourTaxAddressTheS=No` | 请输入完整税务地址 / 請輸入完整稅務地址 / Please enter the full tax address | 无 |
| 18 | `isYourPostalAddressT` | 单选 | 您的通讯地址是否与居住地址相同？ | 您的通訊地址是否與居住地址相同？ | Is your postal address the same as your residential address? | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 19 | `postAddressFullAddre` | 短文本 | 通讯地址（完整地址） | 通訊地址（完整地址） | Post Address (Full Address) | 是 | `basicInformation.isYourPostalAddressT=No` | 请输入完整通讯地址 / 請輸入完整通訊地址 / Please enter the full post address | 无 |

## 职业及财务信息 / Employment And Financial Information

- 问卷 ID：`employmentAndFinanci`
- 英文名称：Employment And Financial Information
- 简体/繁体名称：职业及财务信息 / 職業及財務資訊

### 1. employmentAndFinanci

- Section ID：`employmentAndFinanci`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `occupationType` | 下拉选择 | 职业性质 | 職業性質 | Employment Type | 是 |  | 请选择您的职业性质 / 請選擇您的職業性質 / Please select your occupation type | `Employed` - 在职 / 在職 / Employed<br>`Self-employed` - 自雇 / 自僱 / Self-employed<br>`Unemployed` - 待业 / 待業 / Unemployed<br>`Homemaker` - 居家照顾者 / 居家照顧者 / Homemaker<br>`Student` - 学生 / 學生 / Student<br>`Retired` - 退休 / 退休 / Retired |
| 2 | `employerBusinessScho` | 短文本 | 公司名称（完整名称） | 公司名稱（完整名稱） | Company Name (Full Name) | 否 | `employmentAndFinanci.occupationType=Employed` | 请输入完整公司名称 / 請輸入完整公司名稱 / Please enter the full company name | 无 |
| 3 | `nameOfCurrentOrForme` | 短文本 | 当前或前任公司名称（完整名称） | 目前或前任公司名稱（完整名稱） | Name of Current Or Former  Company (Full Name) | 是 | `employmentAndFinanci.occupationType=Self-employed` | 请输入您当前或前任公司的完整名称 / 請輸入您目前或前任公司的完整名稱 / Please enter the full name of your current or former  company | 无 |
| 4 | `workExperience` | 单选 | 工作经验 | 工作經驗 | Work Experience | 是 | `employmentAndFinanci.occupationType=Unemployed` |  | `Have work experience` - 有工作经验 / 有工作經驗 / Have work experience<br>`No work experience` - 无工作经验 / 無工作經驗 / No work experience |
| 5 | `nameOfPreviousCompan` | 短文本 | 前公司名称（完整名称） | 前公司名稱（完整名稱） | Name of Previous Company (Full Name) | 是 | `employmentAndFinanci.workExperience=Have work experience` | 请输入完整公司名称 / 請輸入完整公司名稱 / Please enter the full company name | 无 |
| 6 | `countryregionWhereTh` | 国家/地区 | 公司所在国家/地区 | 公司所在國家/地區 | Country/Region Where The company Is Located | 是 | `employmentAndFinanci.occupationType=Employed \|\| employmentAndFinanci.occupationType=Self-employed \|\| employmentAndFinanci.workExperience=Have work experience` | 请选择公司所在国家/地区 / 請選擇公司所在國家/地區 / Please select the country/region where the company is located | 无 |
| 7 | `companyBusinessSchoo` | 短文本 | 公司地址 | 公司地址 | Company Address | 否 | `employmentAndFinanci.occupationType=Employed \|\| employmentAndFinanci.occupationType=Self-employed \|\| employmentAndFinanci.workExperience=Have work experience` | 请输入完整公司地址 / 請輸入完整公司地址 / Please enter the full company address | 无 |
| 8 | `industryBusinessNatu` | 下拉选择 | 行业 | 行業 | Nature of Business | 是 | `employmentAndFinanci.occupationType=Employed \|\| employmentAndFinanci.occupationType=Self-employed \|\| employmentAndFinanci.workExperience=Have work experience` | 互联网 / 互聯網 / Internet | `Internet` - 互联网 / 互聯網 / Internet<br>`Finance` - 金融 / 金融 / Finance<br>`Software and Information Technology` - 软件和信息技术 / 軟件和資訊科技 / Software and Information Technology<br>`Manufacturing` - 制造业 / 製造業 / Manufacturing<br>`Real Estate and Leasing` - 房地产及租赁 / 房地產及租賃 / Real Estate and Leasing<br>`Water, Electricity, and Gas` - 水、电和燃气 / 水、電和燃氣 / Water, Electricity, and Gas<br>`Construction, Surveying, and Engineering` - 建筑、测量和工程 / 建築、測量和工程 / Construction, Surveying, and Engineering<br>`Wholesale and Retail` - 批发和零售 / 批發和零售 / Wholesale and Retail<br>`Transportation, Warehousing, and Postal Services` - 运输、仓储和邮政服务 / 運輸、倉儲和郵政服務 / Transportation, Warehousing, and Postal Services<br>`Accommodation and Food Services` - 住宿和餐饮服务 / 住宿和餐飲服務 / Accommodation and Food Services<br>`Scientific Research` - 科学研究 / 科學研究 / Scientific Research<br>`Water Resources, Environment, and Public Utilities` - 水利、环境和公共设施 / 水利、環境和公共設施 / Water Resources, Environment, and Public Utilities<br>`Education` - 教育 / 教育 / Education<br>`Health and Social Work` - 卫生和社会工作 / 衛生和社會工作 / Health and Social Work<br>`Culture and Sports` - 文化和体育 / 文化和體育 / Culture and Sports<br>`Entertainment` - 娱乐 / 娛樂 / Entertainment<br>`Agriculture, Forestry, Animal Husbandry, and Fisheries` - 农、林、牧、渔业 / 農、林、牧、漁業 / Agriculture, Forestry, Animal Husbandry, and Fisheries<br>`Mining` - 采矿业 / 採礦業 / Mining<br>`Currency Exchange/Foreign Exchange` - 货币兑换/外汇 / 貨幣兌換/外匯 / Currency Exchange/Foreign Exchange<br>`Pawnshops` - 典当行 / 典當行 / Pawnshops<br>`Law` - 法律 / 法律 / Law<br>`Healthcare/Nursing` - 医疗保健/护理 / 醫療保健/護理 / Healthcare/Nursing<br>`Information/Communications` - 信息/通信 / 資訊/通訊 / Information/Communications<br>`Tourism` - 旅游 / 旅遊 / Tourism<br>`Auditing/Accounting` - 审计/会计 / 審計/會計 / Auditing/Accounting<br>`Media/Public Relations` - 媒体/公共关系 / 媒體/公共關係 / Media/Public Relations<br>`Consulting` - 咨询 / 諮詢 / Consulting<br>`Marketing/Design/Photography/Translation` - 市场营销/设计/摄影/翻译 / 市場推廣/設計/攝影/翻譯 / Marketing/Design/Photography/Translation<br>`Government Agencies` - 政府机构 / 政府機構 / Government Agencies<br>`Social Organizations/Charities` - 社会组织/慈善机构 / 社會組織/慈善機構 / Social Organizations/Charities<br>`Other Industries` - 其他行业 / 其他行業 / Other Industries |
| 9 | `jobTitleBusinessRole` | 短文本 | 职位 | 職位 | Postion | 是 | `employmentAndFinanci.occupationType=Employed \|\| employmentAndFinanci.occupationType=Self-employed \|\| employmentAndFinanci.workExperience=Have work experience` | 请输入您的职位 / 請輸入您的職位 / Please enter your position | 无 |
| 10 | `yearsEmployedBusines` | 短文本 | 工作经验（年） | 工作經驗（年） | Work Experience (Years) | 是 | `employmentAndFinanci.occupationType=Employed \|\| employmentAndFinanci.occupationType=Self-employed \|\| employmentAndFinanci.workExperience=Have work experience` | 请输入您在该处工作的年数 / 請輸入您在該處工作的年數 / Please enter the number of years you have worked there | 无 |
| 11 | `schoolNameFullName` | 短文本 | 学校名称（完整名称） | 學校名稱（完整名稱） | School Name (Full Name) | 是 | `employmentAndFinanci.occupationType=Student` | 请输入完整学校名称 / 請輸入完整學校名稱 / Please enter the full school name | 无 |
| 12 | `countryregionWhereSc` | 国家/地区 | 学校所在国家/地区 | 學校所在國家/地區 | Country/Region Where School Is Located | 是 | `employmentAndFinanci.occupationType=Student` | 请选择学校所在国家/地区 / 請選擇學校所在國家/地區 / Please select the country/region where the school is located | 无 |
| 13 | `schoolAddress` | 短文本 | 学校地址 | 學校地址 | School Address | 是 | `employmentAndFinanci.occupationType=Student` | 请输入学校完整地址 / 請輸入學校完整地址 / Please enter the school’s full address | 无 |
| 14 | `yearsOfEducation` | 短文本 | 受教育年限 | 受教育年限 | Years of Education | 是 | `employmentAndFinanci.occupationType=Student` | 请输入受教育年数 / 請輸入受教育年數 / Please enter the number of years of education | 无 |

### 2. section2

- Section ID：`section2`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `countryregionOfTaxFi` | 国家/地区 | 纳税申报国家/地区 | 納稅申報國家/地區 | Country/Region of Tax Filing | 是 |  | 请选择您的税务居民国家/地区 / 請選擇您的稅務居民國家/地區 / Please select your country/region of tax residency | 无 |
| 2 | `taxIdNumber` | 短文本 | 税务编号 | 稅務編號 | Tax ID Number | 是 |  | 税务编号通常为您的身份证号码或当地税务登记号码 / 稅務編號通常為您的身份證號碼或當地稅務登記號碼 / The tax ID number is typically your ID number or local tax registration number | 无 |
| 3 | `mobilePhoneNumber` | 电话号码 | 手机号码 | 手機號碼 | Mobile Phone Number | 是 |  | 请输入您的电话号码 / 請輸入您的電話號碼 / Please enter your phone number | 无 |
| 4 | `emailAddress` | 短文本 | 邮箱地址 | 電郵地址 | Email Address | 是 |  | 请输入您的邮箱地址 / 請輸入您的電郵地址 / Please enter your email address | 无 |

## 资产投资信息 / Asset Investment Information

- 问卷 ID：`assetInvestmentInfor`
- 英文名称：Asset Investment Information
- 简体/繁体名称：资产投资信息 / 資產投資資訊
- 描述：请填写您的资产及投资信息，将用于开户信息审核。 / 請填寫您的資產及投資資訊，將用於開戶資料審核。 / 

### 1. assetInvestmentInfor

- Section ID：`assetInvestmentInfor`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `accountType` | 单选 | 开户账户类型 | 開戶帳戶類型 | Account Type | 是 |  |  | `Cash Account` - 现金账户 / 現金帳戶 / Cash Account |
| 2 | `sourceOfFundsMultipl` | 下拉选择 | 资金来源 | 資金來源 | Source of funds | 是 |  | 请选择您的资金来源 / 請選擇您的資金來源 / Please select your source of funds | `Salary` - 工资 / 工資 / Salary<br>`Commission` - 佣金 / 佣金 / Commission<br>`Business Profit` - 经营利润 / 經營利潤 / Business Profit<br>`Savings` - 存款 / 存款 / Savings<br>`Dividend / Interest` - 股息/利息 / 股息/利息 / Dividend / Interest<br>`Household Income` - 家庭收入 / 家庭收入 / Household Income<br>`Retirement Pension` - 退休金 / 退休金 / Retirement Pension<br>`Mortgage / Loans` - 按揭/贷款 / 按揭/貸款 / Mortgage / Loans<br>`Other` - 其他 / 其他 / Other |
| 3 | `annualIncomeCny` | 下拉选择 | 年收入（港元） | 年收入（港元） | Annual Income (HKD) | 是 |  | 请选择您的年收入 / 請選擇您的年收入 / Please select your annual income | `≤200K` - ≤20万 / ≤20萬 / ≤200K<br>`200K-500K (inclusive)` - 20万-50万（含） / 20萬-50萬（含） / 200K-500K (inclusive)<br>`500K-1 Million` - 50万-100万 / 50萬-100萬 / 500K-1 Million<br>`1 Million-5 Million` - 100万-500万 / 100萬-500萬 / 1 Million-5 Million<br>`>5 Million` - >500万 / >500萬 / >5 Million |
| 4 | `sourceOfWealthMultip` | 下拉选择 | 财富来源 | 財富來源 | Source of Wealth | 是 |  | 请选择您的主要财富来源 / 請選擇您的主要財富來源 / Please select your main source of wealth | `Savings` - 存款 / 存款 / Savings<br>`Securities` - 证券 / 證券 / Securities<br>`Forex` - 外汇 / 外匯 / Forex<br>`Real estate` - 房地产 / 房地產 / Real estate<br>`Bond / Unit Trust` - 债券/单位信托 / 債券/單位信託 / Bond / Unit Trust |
| 5 | `netAssetValueCny` | 下拉选择 | 资产净值总额（港元） | 資產淨值總額（港元） | Total Net Asset Value (HKD) | 是 |  | 请选择您的资产净值总额 / 請選擇您的資產淨值總額 / Please select your net asset value | `≤500K` - ≤50万 / ≤50萬 / ≤500K<br>`500K-2.5 Million` - 50万-250万 / 50萬-250萬 / 500K-2.5 Million<br>`2.5 Million-5 Million` - 250万-500万 / 250萬-500萬 / 2.5 Million-5 Million<br>`>5 Million` - >500万 / >500萬 / >5 Million |

### 2. section2

- Section ID：`section2`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `investmentObjective` | 下拉选择 | 投资目的 | 投資目的 | Investment objective | 是 |  | 请选择您的主要投资目的 / 請選擇您的主要投資目的 / Please select your main Investment objective | `Preservation of Capital` - 保本 / 保本 / Preservation of Capital<br>`Passive Income` - 被动收入 / 被動收入 / Passive Income<br>`Growth` - 增长 / 增長 / Growth<br>`Trading Profits` - 交易利润 / 交易利潤 / Trading Profits<br>`Speculation` - 投机 / 投機 / Speculation<br>`Hedging` - 对冲 / 對沖 / Hedging<br>`Others` - 其他 / 其他 / Others |
| 2 | `monthlyTradingFreque` | 下拉选择 | 每月交易频率 | 每月交易頻率 | Monthly Trading Frequency | 是 |  | 请选择您的每月交易频率 / 請選擇您的每月交易頻率 / Please select your monthly trading frequency | `0 transation / month` - 0 笔交易/月 / 0 筆交易/月 / 0 transation / month<br>`1-10 transation / month` - 1-10 笔交易/月 / 1-10 筆交易/月 / 1-10 transation / month<br>`11-25 transation / month` - 11-25 笔交易/月 / 11-25 筆交易/月 / 11-25 transation / month<br>`26-50 transation / month` - 26-50 笔交易/月 / 26-50 筆交易/月 / 26-50 transation / month<br>`51-100 transation / month` - 51-100 笔交易/月 / 51-100 筆交易/月 / 51-100 transation / month<br>`>100 transation / month` - >100 笔交易/月 / >100 筆交易/月 / >100 transation / month |
| 3 | `riskTolerance` | 单选 | 风险承受能力 | 風險承受能力 | Risk Tolerance | 是 |  |  | `Low` - 低 / 低 / Low<br>`Medium` - 中 / 中 / Medium<br>`High` - 高 / 高 / High |
| 4 | `stockSharesInvestmen` | 单选 | 股票投资经验（年） | 股票投資經驗（年） | Stock & Shares Investment Experience (Years) | 是 |  |  | `<1` - 少于 1 年 / 少於 1 年 / <1<br>`1-5` - 1-5 年 / 1-5 年 / 1-5<br>`6-10` - 6-10 年 / 6-10 年 / 6-10<br>`>10` - 超过 10 年 / 超過 10 年 / >10 |
| 5 | `indexOptionsFuturesI` | 单选 | 指数期权/期货投资经验（年） | 指數期權/期貨投資經驗（年） | Index Options / Futures Investment Experience (years) | 是 |  |  | `<1` - 少于 1 年 / 少於 1 年 / <1<br>`1-5` - 1-5 年 / 1-5 年 / 1-5<br>`6-10` - 6-10 年 / 6-10 年 / 6-10<br>`>10` - 超过 10 年 / 超過 10 年 / >10 |
| 6 | `warrantsStockOptions` | 单选 | 认股证/股票期权投资经验（年） | 認股證/股票期權投資經驗（年） | Warrants / Stock Options Investment Experience (Years) | 是 |  |  | `<1` - 少于 1 年 / 少於 1 年 / <1<br>`1-5` - 1-5 年 / 1-5 年 / 1-5<br>`6-10` - 6-10 年 / 6-10 年 / 6-10<br>`>10` - 超过 10 年 / 超過 10 年 / >10 |
| 7 | `forexGoldInvestmentE` | 单选 | 外汇/黄金投资经验（年） | 外匯/黃金投資經驗（年） | Forex / Gold Investment Experience (Years) | 是 |  |  | `<1` - 少于 1 年 / 少於 1 年 / <1<br>`1-5` - 1-5 年 / 1-5 年 / 1-5<br>`6-10` - 6-10 年 / 6-10 年 / 6-10<br>`>10` - 超过 10 年 / 超過 10 年 / >10 |
| 8 | `structuredProductInv` | 单选 | 结构性产品投资经验 | 結構性產品投資經驗 | Structured Product Investment Experience | 是 |  |  | `<1` - 少于 1 年 / 少於 1 年 / <1<br>`1-5` - 1-5 年 / 1-5 年 / 1-5<br>`6-10` - 6-10 年 / 6-10 年 / 6-10<br>`>10` - 超过 10 年 / 超過 10 年 / >10 |

### 3. section3

- Section ID：`section3`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `derivativesTrading` | 单选 | 衍生品交易 | 衍生品交易 | Derivatives Trading | 是 |  |  | `I am interested in trading derivatives` - 本人有意进行衍生品交易 / 本人有意進行衍生品交易 / I am interested in trading derivatives<br>`I have no intention of trading derivatives` - 本人无意进行衍生品交易 / 本人無意進行衍生品交易 / I have no intention of trading derivatives |
| 2 | `pleaseSelectYourDeri` | 单选 | 您是否具备以下衍生品相关交易经验？<br><br>说明：（一）客户曾接受有关衍生品/复杂产品的培训或修读相关课程；及/或<br>（二）客户现时或过往具有与衍生品/复杂产品相关的工作经验；及/或<br>（三）客户于过去三年内曾执行五宗或以上衍生品交易，例如衍生权证、牛熊证、股票期权、期货及期权、商品、结构性产品及交易所买卖基金等。 | 您是否具備以下衍生品相關交易經驗？<br><br>說明：（一）客戶曾接受有關衍生品/複雜產品的培訓或修讀相關課程；及/或<br>（二）客戶現時或過往具有與衍生品/複雜產品相關的工作經驗；及/或<br>（三）客戶於過去三年內曾執行五宗或以上衍生品交易，例如衍生權證、牛熊證、股票期權、期貨及期權、商品、結構性產品及交易所買賣基金等。 | Do you have any relevant trading experience in the following derivatives?<br><br>Description: a）The Client underwent training or attended courses on derivative / complex products; and/or<br>b）The Client has current or previous work experience related to derivative / complex products; and/or<br>c）The Client has executed five or more transactions within the past three years in derivative products, e.g. Derivative Warrants, Callable Bull/Bear Contracts, Stock Options, Futures and Options, Commodities, Structured Products, and Exchange Traded Funds, etc. | 是 | `section3.derivativesTrading=I am interested in trading derivatives` |  | `I have no trading experience in derivatives investment` - 本人没有衍生品投资交易经验 / 本人沒有衍生品投資交易經驗 / I have no trading experience in derivatives investment<br>`I have trading experience in at least one derivatives products` - 本人具有至少一种衍生品交易经验 / 本人具有至少一種衍生品交易經驗 / I have trading experience in at least one derivatives products |

## 合规确认与风险披露 / Confirmation of Compliance

- 问卷 ID：`confirmationOfCompli`
- 英文名称：Confirmation of Compliance
- 简体/繁体名称：合规信息确认 / 合規資訊確認
- 描述：请确认您的合规信息，将用于开户信息审核。 / 請確認您的合規資訊，將用於開戶資料審核。 / Please confirm your compliance information, which will be used for account opening review.

### 1. complianceSection

- Section ID：`complianceSection`

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `finalBeneficialOwner` | 单选 | 本人是该证券账户最终及唯一实益拥有人，并为该证券账户最终负责发出指示的人。 | 本人是該證券帳戶最終及唯一實益擁有人，並為該證券帳戶最終負責發出指示的人。 | I am the final and sole beneficial owner of this securities account and the person ultimately responsible for giving instructions for this account. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 2 | `finalBeneficialOwnerName` | 短文本 | 最终实益拥有人姓名 | 最終實益擁有人姓名 | Name of final beneficial owner | 是 | `complianceSection.finalBeneficialOwner = No` | 请输入最终实益拥有人姓名 / 請輸入最終實益擁有人姓名 / Enter the name of final beneficial owner | 无 |
| 3 | `finalBeneficialOwnerIdNo` | 短文本 | 最终实益拥有人身份证/护照号码 | 最終實益擁有人身份證/護照號碼 | ID / Passport No. of final beneficial owner | 是 | `complianceSection.finalBeneficialOwner = No` | 请输入最终实益拥有人身份证/护照号码 / 請輸入最終實益擁有人身份證/護照號碼 / Enter the ID / Passport No. of final beneficial owner | 无 |
| 4 | `finalBeneficialOwnerPhone` | 电话号码 | 最终实益拥有人电话号码 | 最終實益擁有人電話號碼 | Phone No. of final beneficial owner | 是 | `complianceSection.finalBeneficialOwner = No` | 请输入最终实益拥有人电话号码 / 請輸入最終實益擁有人電話號碼 / Enter the Phone No. of final beneficial owner | 无 |
| 5 | `finalBeneficialOwnerAddress` | 段落 | 最终实益拥有人地址 | 最終實益擁有人地址 | Address of final beneficial owner | 是 | `complianceSection.finalBeneficialOwner = No` | 请输入最终实益拥有人地址 / 請輸入最終實益擁有人地址 / Enter the Address of final beneficial owner | 无 |
| 6 | `sfcHongKongParticipant` | 单选 | 本人是香港证监会持牌法团或注册机构或香港交易所参与者的董事、雇员、持牌人或代表。 | 本人是香港證監會持牌法團或註冊機構或香港交易所參與者的董事、僱員、持牌人或代表。 | I am a director, employee, accredited person or representative of a Hong Kong SFC licensed corporation or registered institution, or a Hong Kong Exchange Participant. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 7 | `sfcLicensedCorporationName` | 短文本 | 持牌法团/注册机构名称 | 持牌法團/註冊機構名稱 | Name of licensed corporation / registered institution | 是 | `complianceSection.sfcHongKongParticipant = Yes` | 请输入持牌法团/注册机构名称 / 請輸入持牌法團/註冊機構名稱 / Enter the Name of licensed corporation / registered institution | 无 |
| 8 | `sfcPosition` | 短文本 | 职位 | 職位 | Position | 是 | `complianceSection.sfcHongKongParticipant = Yes` | 请输入职位 / 請輸入職位 / Enter the Position | 无 |
| 9 | `sfcCeNo` | 短文本 | 中央编号（CE No.） | 中央編號（CE No.） | CE No. | 是 | `complianceSection.sfcHongKongParticipant = Yes` | 请输入中央编号（CE No.） / 請輸入中央編號（CE No.） / Enter the CE No. | 无 |
| 10 | `sfcEmployerConsentLetter` | 文件上传 | 雇主同意书 | 僱主同意書 | Employer consent letter | 是 | `complianceSection.sfcHongKongParticipant = Yes` |  | 无 |
| 11 | `sfcLicensedPerson` | 单选 | 是否为持牌人？ | 是否為持牌人？ | Are you a licensed person? | 是 | `complianceSection.sfcHongKongParticipant = Yes` |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 12 | `virtuCapitalRelationship` | 单选 | 本人与本公司或其联系公司的董事或雇员有亲属关系。 | 本人與本公司或其聯繫公司的董事或僱員有親屬關係。 | I am related to any director or employee of Virtu Capital Finance Limited or its associated companies. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 13 | `relatedDirectorEmployeeName` | 短文本 | 相关董事或雇员姓名 | 相關董事或僱員姓名 | Name of related director or employee | 是 | `complianceSection.virtuCapitalRelationship = Yes` | 请输入相关董事或雇员姓名 / 請輸入相關董事或僱員姓名 / Enter the Name of related director or employee | 无 |
| 14 | `relatedDirectorEmployeeRelationship` | 短文本 | 与相关董事或雇员的关系 | 與相關董事或僱員的關係 | Relationship with the related director or employee | 是 | `complianceSection.virtuCapitalRelationship = Yes` | 请输入与相关董事或雇员的关系 / 請輸入與相關董事或僱員的關係 / Enter the Relationship with the related director or employee | 无 |
| 15 | `usTaxResident` | 单选 | 本人是美国公民、美国税务居民、美国绿卡持有人，或具有美国相关迹象，包括出生地为美国、美国地址、美国邮政信箱或美国电话号码。 | 本人是美國公民、美國稅務居民、美國綠卡持有人，或具有美國相關跡象，包括出生地為美國、美國地址、美國郵政信箱或美國電話號碼。 | I am a U.S. citizen, U.S. resident for tax purposes, U.S. green card holder, or otherwise have U.S. indicia including U.S. place of birth, U.S. address, U.S. post office box or U.S. telephone number. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 16 | `spouseMarginAccount` | 单选 | 本人的配偶已在本公司开通相关保证金融资账户。 | 本人的配偶已在本公司開通相關保證金融資帳戶。 | My spouse has opened a related margin financing account with Virtu Capital Finance Limited. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 17 | `spouseName` | 短文本 | 配偶姓名 | 配偶姓名 | Name of spouse | 是 | `complianceSection.spouseMarginAccount = Yes` | 请输入配偶姓名 / 請輸入配偶姓名 / Enter the Name of spouse | 无 |
| 18 | `spouseAccountNo` | 短文本 | 配偶账户号码 | 配偶帳戶號碼 | Spouse Account No. | 是 | `complianceSection.spouseMarginAccount = Yes` | 请输入配偶账户号码 / 請輸入配偶帳戶號碼 / Enter the Spouse Account No. | 无 |
| 19 | `controlOtherMarginAccounts` | 单选 | 本人个人或与配偶共同控制本公司其他保证金客户账户 35% 或以上的投票权。 | 本人個人或與配偶共同控制本公司其他保證金客戶帳戶 35% 或以上的投票權。 | I, alone or jointly with my spouse, control 35% or more of the voting rights of another margin client account with Virtu Capital Finance Limited. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 20 | `controlledMarginAccountNo` | 短文本 | 受控制保证金账户号码 | 受控制保證金帳戶號碼 | Controlled Margin Account No. | 是 | `complianceSection.controlOtherMarginAccounts = Yes` | 请输入受控制保证金账户号码 / 請輸入受控制保證金帳戶號碼 / Enter the Controlled Margin Account No. | 无 |
| 21 | `amlHighRiskBusiness` | 单选 | 本人的业务性质有较高的洗黑钱风险。 | 本人的業務性質有較高的洗黑錢風險。 | The nature of my business has a high risk of money laundering. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 22 | `amlHighRiskBusinessDetails` | 短文本 | 请说明高风险业务性质<br><br>说明：抱歉，我们目前不支持该情况的用户开户注册。 | 請說明高風險業務性質<br><br>說明：抱歉，我們目前不支援該情況的用戶開戶註冊。 | Please specify the high-risk business nature<br><br>Description: Sorry, we do not currently support account registration for users in this situation. | 是 | `complianceSection.amlHighRiskBusiness = Yes` | 请说明高风险业务性质 / 請說明高風險業務性質 / Please specify the high-risk business nature | 无 |
| 23 | `politicallyExposedPerson` | 单选 | 本人或本人的直系亲属、关系密切的亲属或密切联系人是政治公众人物，或曾被委托担任重要公共职能。 | 本人或本人的直系親屬、關係密切的親屬或密切聯繫人是政治公眾人物，或曾被委託擔任重要公共職能。 | I am, or my immediate family members, close relatives or close associates are, politically exposed persons, or have been entrusted with a prominent public function. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |
| 24 | `pepName` | 短文本 | 政治公众人物姓名 | 政治公眾人物姓名 | Name of politically exposed person | 是 | `complianceSection.politicallyExposedPerson = Yes` | 请输入政治公众人物姓名 / 請輸入政治公眾人物姓名 / Enter the Name of politically exposed person | 无 |
| 25 | `pepRelationship` | 单选 | 与客户关系 | 與客戶關係 | Relationship with client | 是 | `complianceSection.politicallyExposedPerson = Yes` |  | `Self` - 本人 / 本人 / Self<br>`Others` - 其他 / 其他 / Others |
| 26 | `pepPosition` | 短文本 | 职位 | 職位 | Position | 是 | `complianceSection.politicallyExposedPerson = Yes` | 请输入职位 / 請輸入職位 / Enter the Position | 无 |
| 27 | `pepPublicBody` | 短文本 | 公共机构/机构名称 | 公共機構/機構名稱 | Name of Public Body / Institution | 是 | `complianceSection.politicallyExposedPerson = Yes` | 请输入公共机构/机构名称 / 請輸入公共機構/機構名稱 / Enter the Name of Public Body / Institution | 无 |
| 28 | `pepYearsOfService` | 短文本 | 服务年限 | 服務年限 | Year(s) of Service | 是 | `complianceSection.politicallyExposedPerson = Yes` | 请输入服务年限 / 請輸入服務年限 / Enter the Year(s) of Service | 无 |
| 29 | `pepCountry` | 国家/地区 | 国家/地区 | 國家/地區 | Country / Region | 是 | `complianceSection.politicallyExposedPerson = Yes` | 请选择国家/地区 / 請選擇國家/地區 / Select the Country / Region | 无 |
| 30 | `w8benConsent` | 单选 | 本人同意使用开户所填信息生成 W-8BEN 表格。 | 本人同意使用開戶所填資料生成 W-8BEN 表格。 | I agree to use the information filled in for account opening to generate Form W-8BEN. | 是 |  |  | `Yes` - 是 / 是 / Yes<br>`No` - 否 / 否 / No |

### 2. 直接促销

- Section ID：`notification`
- Section 标题：直接促销 / 直接促銷 / Direct Sales Marketing

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `directSalesMarketingChannels` | 多选 | 本人愿意通过以下渠道接收平台通知、直接促销材料及推广信息。如未选择任何渠道，即表示本人不愿意接收该等材料。 | 本人願意通過以下渠道接收平台通知、直接促銷材料及推廣資訊。如未選擇任何渠道，即表示本人不願意接收該等材料。 | I am willing to receive the platform's notifications, direct sales marketing materials and promotional information via the following channels. If no channel is selected, it means I do not wish to receive such materials. | 是 |  |  | `Electronic Channels` - 电子渠道 / 電子渠道 / Electronic Channels<br>`Mail` - 邮寄 / 郵寄 / Mail<br>`Personal Call` - 专人来电 / 專人來電 / Personal Call |

### 3. 风险披露内容

- Section ID：`riskDisclosureConten`
- Section 标题：风险披露内容 / 風險披露內容 / Risk Disclosure content

| 序号 | 字段 ID | 类型 | 简体中文 | 繁体中文 | 英文 | 必填 | 显示条件 | 占位符 | 选项 |
|---:|---|---|---|---|---|---|---|---|---|
| 1 | `riskDisclosureConsent` | 单选 | 本人已阅读、清楚明白、完全接受并同意遵守上述披露内容<br><br>说明： | 本人已閱讀、清楚明白、完全接受並同意遵守上述披露內容<br><br>說明： | I have read, clearly understood, fully accepted and agreed to abide by the above disclosures<br><br>Description:   | 是 |  |  | `I agree` - 本人同意 / 本人同意 / I agree |
