# Virtu Capital APK 技术栈与开发者分析指南

本文记录本次 APK 分析的方法、命令、环境、动态登录过程和可复用的开发者检查清单。

## 1. 分析目标

- APK：`/Users/apple/Downloads/app-release-3030c701-20260707041036.apk`
- 工作目录：`/Users/apple/Documents/VirtuCapital`
- 输出目录：`/Users/apple/Documents/VirtuCapital/docs`
- 截图目录：`/Users/apple/Documents/VirtuCapital/docs/assets`

分析范围：

- 静态拆包：Manifest、权限、SDK、资源、Flutter assets、AOT 字符串、接口路径、路由和页面名。
- 动态运行：Android Emulator 安装 APK，使用测试手机号/验证码登录，验证主要页面和入口。
- 文档化：功能树、开发者指南、用户指南和截图资产。

## 2. APK 基本信息

```text
application-label: Virtu Capital
package: com.virtucapital.android
versionName: 1.0.2
versionCode: 8
minSdkVersion: 24
targetSdkVersion: 36
main activity: com.kingboat.virtu_capital.MainActivity
framework: Flutter
```

主要原生库：

```text
lib/arm64-v8a/libapp.so
lib/arm64-v8a/libflutter.so
lib/arm64-v8a/libdartjni.so
lib/arm64-v8a/libtensorflowlite_jni.so
lib/arm64-v8a/libtoolChecker.so
```

主要资源特征：

```text
assets/flutter_assets/
assets/face_detection_short_range.tflite
assets/images/app_icon.png
assets/images/app_splash_image.png
assets/images/login_background_cp.png
assets/images/portfolio_background.png
assets/images/watchlist_icon.png
```

## 3. 技术栈判断

### 3.1 客户端框架

- Flutter：存在 `libflutter.so`、`libapp.so`、`assets/flutter_assets`、`FontManifest.json`、`AssetManifest.bin`。
- Dart AOT：业务字符串、路由、DTO、Repository、Provider 名称主要出现在 `libapp.so`。
- 状态管理/架构痕迹：Riverpod / Provider / Notifier / Repository / DTO / Model。
- 路由：GoRouter 痕迹，如 `GoRouterHelper`、`/deposit`、`/withdrawal`、`/stock-transfers/:id`。

### 3.2 Android 原生组件

Manifest 中发现：

```text
MainActivity: com.kingboat.virtu_capital.MainActivity
WebView: io.flutter.plugins.urllauncher.WebViewActivity
KYC: com.sumsub.sns.internal.features.presentation.main.SNSAppActivity
ImagePickerFileProvider: io.flutter.plugins.imagepicker.ImagePickerFileProvider
ML Kit provider/service
CameraX MetadataHolderService
GoogleApiActivity
```

### 3.3 第三方 SDK / 插件

- Sumsub / Idensic KYC：`flutter_idensic_mobile_sdk_plugin`、`sumsub.com/flutter_idensic_mobile_sdk_plugin`
- Google ML Kit Face Detection：`play-services-mlkit-face-detection`、`face_detection_short_range.tflite`
- CameraX：`androidx.camera_*`
- WebView：`webview_flutter_android`
- URL launcher：`url_launcher`
- Image picker / File picker
- Flutter Secure Storage
- SharedPreferences
- Dio / HTTP client 痕迹
- PointyCastle / cryptography / crypto
- Picasso

### 3.4 网络/API

静态字符串中发现基址：

```text
https://staging-app.virtu-capital.com/api/
```

典型接口族：

```text
auth/login
auth/me
auth/refresh
auth/send-code
auth/verify-code
account/open-status
account/kyc/access-token
account/opening-agreements
market-data/quote
market-data/index
market-data/stocks/search
trade/orders
trade/orders/today
trade/transactions
assets/deposit-config
assets/withdrawal-config
assets/deposits
assets/withdrawals
stock-transfers
inbound-stock-transfers
outbound-stock-transfers
statements/export
messages/unread-count
account/feedback
```

## 4. 权限清单

Manifest 权限：

```text
android.permission.INTERNET
android.permission.CAMERA
android.permission.ACCESS_COARSE_LOCATION
android.permission.ACCESS_FINE_LOCATION
android.permission.ACCESS_NETWORK_STATE
android.permission.NFC
android.permission.RECORD_AUDIO
android.permission.READ_EXTERNAL_STORAGE
android.permission.WRITE_EXTERNAL_STORAGE
android.permission.WRITE_SETTINGS
com.virtucapital.android.DYNAMIC_RECEIVER_NOT_EXPORTED_PERMISSION
```

权限用途推断：

- 网络：登录、行情、交易、资金接口。
- 相机/文件：KYC、拍照、凭证上传、反馈图片。
- 定位：KYC/风控/地区合规。
- NFC：证件读取或 KYC SDK 支持能力。
- 麦克风：视频认证或 KYC SDK。
- 外部存储：上传/下载 PDF、结单、申请表、凭证。

## 5. 静态分析命令

### 5.1 基础检查

```bash
ls -lh /Users/apple/Downloads/app-release-3030c701-20260707041036.apk
file /Users/apple/Downloads/app-release-3030c701-20260707041036.apk
zipinfo -1 /Users/apple/Downloads/app-release-3030c701-20260707041036.apk
```

### 5.2 查找可用 Android 工具

```bash
find /Users/apple/Library/Android/sdk -name aapt -o -name aapt2 -o -name dexdump
```

本机可用：

```text
/Users/apple/Library/Android/sdk/build-tools/37.0.0/aapt
/Users/apple/Library/Android/sdk/platform-tools/adb
/Users/apple/Library/Android/sdk/emulator/emulator
/Users/apple/Library/Android/sdk/cmdline-tools/latest/bin/avdmanager
/Users/apple/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager
```

### 5.3 Manifest / 权限 / Badging

```bash
/Users/apple/Library/Android/sdk/build-tools/37.0.0/aapt dump badging \
  /Users/apple/Downloads/app-release-3030c701-20260707041036.apk

/Users/apple/Library/Android/sdk/build-tools/37.0.0/aapt dump permissions \
  /Users/apple/Downloads/app-release-3030c701-20260707041036.apk

/Users/apple/Library/Android/sdk/build-tools/37.0.0/aapt dump xmltree \
  /Users/apple/Downloads/app-release-3030c701-20260707041036.apk AndroidManifest.xml
```

### 5.4 Flutter assets

```bash
unzip -p /Users/apple/Downloads/app-release-3030c701-20260707041036.apk \
  assets/flutter_assets/AssetManifest.bin | strings -a
```

### 5.5 Dart AOT 字符串分析

提取业务关键词：

```bash
unzip -p /Users/apple/Downloads/app-release-3030c701-20260707041036.apk \
  lib/arm64-v8a/libapp.so |
  strings -a |
  rg -i "login|account|portfolio|watch|market|stock|order|deposit|withdraw|transfer|statement|kyc|sumsub|trade|quote|balance|asset|bank|face|risk|password|phone|sms|code|http"
```

提取接口/路由：

```bash
unzip -p /Users/apple/Downloads/app-release-3030c701-20260707041036.apk \
  lib/arm64-v8a/libapp.so |
  strings -a |
  rg "(/api/|market-data/|trade/|account/|auth/|stock-transfers|withdrawal|deposit|statements|feedback|watchlist|portfolio|kyc|application-form|position-transfer)"
```

提取 Dart 包路径：

```bash
unzip -p /Users/apple/Downloads/app-release-3030c701-20260707041036.apk \
  lib/arm64-v8a/libapp.so |
  strings -a |
  rg "package:virtu_capital/(features|data)/[A-Za-z0-9_/.-]+\\.dart"
```

提取域名：

```bash
unzip -p /Users/apple/Downloads/app-release-3030c701-20260707041036.apk \
  lib/arm64-v8a/libapp.so |
  strings -a |
  rg "https?://|wss?://|[a-zA-Z0-9_.-]+\\.(com|cn|hk|net|org|io)"
```

## 6. 模拟器创建与动态分析流程

### 6.1 检查设备与 AVD

```bash
adb devices
/Users/apple/Library/Android/sdk/emulator/emulator -list-avds
```

如果没有 AVD，需要安装系统镜像并创建虚拟设备。

### 6.2 安装系统镜像

```bash
/Users/apple/Library/Android/sdk/cmdline-tools/latest/bin/sdkmanager \
  "system-images;android-36;google_apis;arm64-v8a"
```

### 6.3 创建 AVD

```bash
/Users/apple/Library/Android/sdk/cmdline-tools/latest/bin/avdmanager create avd \
  -n VirtuCapitalTest \
  -k "system-images;android-36;google_apis;arm64-v8a" \
  -d pixel_8 \
  --force
```

### 6.4 启动模拟器

```bash
/Users/apple/Library/Android/sdk/emulator/emulator \
  -avd VirtuCapitalTest \
  -no-snapshot \
  -no-audio
```

等待开机：

```bash
adb wait-for-device shell 'while [ "$(getprop sys.boot_completed)" != "1" ]; do sleep 1; done; echo booted'
```

### 6.5 安装 APK

```bash
adb install -r /Users/apple/Downloads/app-release-3030c701-20260707041036.apk
```

### 6.6 启动 App

```bash
adb shell am start -n com.virtucapital.android/com.kingboat.virtu_capital.MainActivity
```

### 6.7 登录流程

测试账号：

```text
手机号：147258369
国家/地区码：+852（App 默认）
验证码：8888
```

流程：

```text
Get started
输入手机号
点击 Get code
等待验证码发送成功
输入 8888
进入 App 首页
```

### 6.8 截图与拉取

```bash
adb shell screencap -p /sdcard/vc_assets.png
adb pull /sdcard/vc_assets.png docs/assets/03_assets.png
```

### 6.9 坐标点击注意事项

模拟器原生分辨率为 `1080x2400`，截图在 Codex 里展示时会缩放。点击时要使用原生坐标：

```text
底部 Watchlist: x=135, y=2260
底部 Market:    x=405, y=2260
底部 Assets:    x=675, y=2260
底部 Profile:   x=945, y=2260
返回按钮:        x=70,  y=210
```

常用资产页入口坐标：

```text
Deposit:           x=230, y=835
Withdraw:          x=540, y=835
Statement:         x=850, y=835
Orders:            x=230, y=965
Stock Transfer:    x=540, y=965
Position Transfer: x=850, y=965
```

### 6.10 关闭模拟器

```bash
adb emu kill
```

## 7. 截图资产清单

```text
docs/assets/01_watchlist.png
docs/assets/02_market.png
docs/assets/03_assets.png
docs/assets/04_profile.png
docs/assets/05_deposit.png
docs/assets/06_withdraw.png
docs/assets/07_statement.png
docs/assets/08_orders.png
docs/assets/09_stock_transfer.png
docs/assets/10_position_transfer.png
docs/assets/11_account_info.png
docs/assets/12_feedback.png
docs/assets/13_settings.png
docs/assets/14_stock_detail.png
```

## 8. 代码/架构线索

静态字符串中的典型目录：

```text
package:virtu_capital/features/auth/login_page.dart
package:virtu_capital/features/auth/register_phone_page.dart
package:virtu_capital/features/home/watchlist/watchlist_page.dart
package:virtu_capital/features/home/market/market_page.dart
package:virtu_capital/features/home/portfolio/portfolio_page.dart
package:virtu_capital/features/home/portfolio/deposit/deposit_page.dart
package:virtu_capital/features/home/portfolio/withdrawal/withdrawal_page.dart
package:virtu_capital/features/home/portfolio/orders/orders_page.dart
package:virtu_capital/features/home/portfolio/stock_transfer/stock_transfer_page.dart
package:virtu_capital/features/home/portfolio/external_stock_transfer/external_stock_transfer_page.dart
package:virtu_capital/features/home/profile/profile_page.dart
package:virtu_capital/features/home/profile/feedback/feedback_page.dart
package:virtu_capital/features/home/profile/setting/settings_page.dart
package:virtu_capital/features/account_opening/account_opening_type_selection_page.dart
package:virtu_capital/shared/kyc_verification_launcher.dart
```

典型分层：

```text
features/       页面与 ViewModel
data/dto/       接口 DTO
data/models/    领域模型
data/repositories/ 网络仓储
shared/         通用组件、KYC launcher、widgets
core/utils/     市场日历、数值格式化等工具
```

## 9. 安全和合规观察

- `usesCleartextTraffic=true`：Manifest 允许明文流量，建议确认生产构建是否仍开启。
- 使用 staging API：APK 内出现 `https://staging-app.virtu-capital.com/api/`，建议确认是否为测试包。
- 金融类高敏功能：交易、出入金、KYC、转仓、交易密码、账户删除均应有完整审计、风控、日志和服务端权限校验。
- KYC SDK 权限较多：相机、麦克风、NFC、定位、文件均与身份认证场景匹配，但隐私政策和权限弹窗需清晰说明。
- 本次分析未做逆向破解、绕过登录、密钥提取或接口攻击，仅做授权功能拆解和页面确认。

## 10. 开发者复现清单

1. 准备 APK 和 Android SDK。
2. 用 `aapt dump badging/permissions/xmltree` 提取包信息。
3. 用 `zipinfo` 和 `unzip -p ... | strings` 提取 Flutter assets、接口、路由、页面名。
4. 创建或启动 AVD。
5. `adb install -r` 安装 APK。
6. `adb shell am start` 启动 MainActivity。
7. 使用测试手机号和验证码登录。
8. 按四个 Tab 和二级入口抓截图。
9. 把截图放入 `docs/assets`。
10. 将动态截图与静态功能树交叉核对。
