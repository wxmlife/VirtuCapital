# VirtuCapital Emulator Screenshot Panel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a desktop macOS application that starts the independent VirtuCapital Android Emulator and an always-on-top pure-App screenshot panel, then exits when the emulator exits.

**Architecture:** A Swift Package produces one AppKit executable. `EmulatorController` owns the emulator and ADB lifecycle, `ScreenshotService` captures and crops PNG images using CoreGraphics, and `PanelController` presents the floating controls. A packaging script creates `VirtuCapital模拟器.app` on the Desktop.

**Tech Stack:** Swift 6, AppKit, CoreGraphics, ImageIO, Swift Package Manager, XCTest, Android Emulator CLI, ADB.

## Global Constraints

- Use `/Users/apple/Library/Android/sdk/emulator/emulator` and `/Users/apple/Library/Android/sdk/platform-tools/adb`.
- Launch AVD `VirtuCapitalFullScreen` as an independent window with `-no-snapshot -no-boot-anim -gpu swiftshader_indirect`.
- Start `com.virtucapital.android/com.kingboat.virtu_capital.MainActivity` after `sys.boot_completed=1`.
- Save 1080×2280 PNG images to `/Users/apple/Desktop/产品策划/VC/项目截图/英文版本`.
- Crop exactly 60 pixels from the top and 60 pixels from the bottom without rescaling.
- Use filenames `VirtuCapital_YYYY-MM-DD_HH-mm-ss.png`.
- Do not install a login item or persistent background daemon.
- Closing the owned emulator process must close the panel and launcher.

---

### Task 1: Screenshot Service

**Files:**
- Create: `tools/emulator-screenshot-panel/Package.swift`
- Create: `tools/emulator-screenshot-panel/Sources/VirtuCapitalLauncher/ScreenshotService.swift`
- Create: `tools/emulator-screenshot-panel/Tests/VirtuCapitalLauncherTests/ScreenshotServiceTests.swift`

**Interfaces:**
- Produces: `ScreenshotService.capture(deviceSerial:) async throws -> URL`
- Produces: `ScreenshotService.cropPureApp(source:destination:) throws`

- [ ] **Step 1: Create the Swift package and write failing crop tests**

Create an executable target plus test target. The test generates a 1080×2400 image with distinct 60-pixel top and bottom bands, calls `cropPureApp`, then asserts the output is 1080×2280 and contains neither band.

- [ ] **Step 2: Run the test and verify the missing service fails compilation**

Run:

```bash
cd tools/emulator-screenshot-panel
swift test
```

Expected: FAIL because `ScreenshotService` is not defined.

- [ ] **Step 3: Implement deterministic ADB capture and CoreGraphics crop**

Implement:

```swift
struct ScreenshotService {
    let adbURL: URL
    let destinationDirectory: URL

    func capture(deviceSerial: String) async throws -> URL
    func cropPureApp(source: URL, destination: URL) throws
}
```

Capture to `/sdcard/.virtucapital-capture.png`, pull to a temporary file, crop `CGRect(x: 0, y: 60, width: width, height: height - 120)`, and atomically move the final PNG into the destination.

- [ ] **Step 4: Run screenshot service tests**

Run:

```bash
swift test --filter ScreenshotServiceTests
```

Expected: PASS with a 1080×2280 output assertion.

- [ ] **Step 5: Commit the service**

```bash
git add tools/emulator-screenshot-panel
git commit -m "feat: add pure app screenshot service"
```

### Task 2: Emulator Lifecycle Controller

**Files:**
- Create: `tools/emulator-screenshot-panel/Sources/VirtuCapitalLauncher/EmulatorController.swift`
- Create: `tools/emulator-screenshot-panel/Tests/VirtuCapitalLauncherTests/EmulatorControllerTests.swift`

**Interfaces:**
- Produces: `EmulatorController.start() async throws`
- Produces: `EmulatorController.stop()`
- Produces: `EmulatorController.onTermination: (() -> Void)?`
- Consumes: Android SDK executable paths and the AVD/activity constants from Global Constraints.

- [ ] **Step 1: Write failing command-construction and boot-polling tests**

Use a `CommandRunning` protocol with a fake runner. Assert that `start()` constructs the exact emulator arguments, polls `getprop sys.boot_completed`, disables the on-screen keyboard, and starts the required activity.

- [ ] **Step 2: Run controller tests and confirm failure**

Run:

```bash
swift test --filter EmulatorControllerTests
```

Expected: FAIL because `EmulatorController` and `CommandRunning` are absent.

- [ ] **Step 3: Implement process ownership and ADB readiness**

Launch the emulator with `Process`, poll ADB every second for up to 120 seconds, start Virtu Capital, and attach a termination handler that invokes `onTermination` on the main queue.

- [ ] **Step 4: Run controller tests**

Run:

```bash
swift test --filter EmulatorControllerTests
```

Expected: PASS for command arguments, boot polling, activity launch, timeout, and termination callback.

- [ ] **Step 5: Commit the controller**

```bash
git add tools/emulator-screenshot-panel
git commit -m "feat: manage standalone emulator lifecycle"
```

### Task 3: Floating Panel and Desktop App Packaging

**Files:**
- Create: `tools/emulator-screenshot-panel/Sources/VirtuCapitalLauncher/AppDelegate.swift`
- Create: `tools/emulator-screenshot-panel/Sources/VirtuCapitalLauncher/PanelController.swift`
- Create: `tools/emulator-screenshot-panel/Sources/VirtuCapitalLauncher/main.swift`
- Create: `tools/emulator-screenshot-panel/scripts/build-app.sh`
- Create: `tools/emulator-screenshot-panel/Resources/Info.plist`

**Interfaces:**
- Consumes: `EmulatorController` and `ScreenshotService`.
- Produces: `/Users/apple/Desktop/VirtuCapital模拟器.app`

- [ ] **Step 1: Implement the always-on-top AppKit panel**

Create a compact utility window with:

- `截取纯 App 全屏`
- `打开截图文件夹`
- a status label

Set `level = .floating`, allow dragging by the background, place it near the right side of the main screen, and keep the screenshot action disabled until ADB is ready.

- [ ] **Step 2: Wire application lifecycle**

On application launch, start the emulator controller. Enable capture after boot, show actionable errors in the status label, and terminate `NSApplication` from the emulator termination callback.

- [ ] **Step 3: Add deterministic `.app` packaging**

The build script must run:

```bash
swift build -c release
```

Then create the application bundle, copy the executable and `Info.plist`, sign it ad hoc with:

```bash
codesign --force --deep --sign - /Users/apple/Desktop/VirtuCapital模拟器.app
```

- [ ] **Step 4: Run unit and packaging verification**

Run:

```bash
swift test
bash scripts/build-app.sh
codesign --verify --deep --strict /Users/apple/Desktop/VirtuCapital模拟器.app
```

Expected: all tests pass, the application bundle exists, and code-signature verification exits 0.

- [ ] **Step 5: Run end-to-end validation**

Launch the app, confirm an independent emulator process without `-qt-hide-window`, wait for Virtu Capital to reach the foreground, click the capture button, and verify a valid 1080×2280 PNG appears in the configured folder. Close the emulator and confirm the panel process exits.

- [ ] **Step 6: Commit the completed application**

```bash
git add tools/emulator-screenshot-panel
git commit -m "feat: add emulator screenshot launcher app"
```
