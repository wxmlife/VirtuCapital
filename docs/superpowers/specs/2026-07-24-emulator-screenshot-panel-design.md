# VirtuCapital Emulator Screenshot Panel Design

## Goal

Provide one desktop application that starts the existing
`VirtuCapitalFullScreen` Android Virtual Device and a small floating screenshot
panel together. Closing the emulator must also close the screenshot panel and
launcher process.

## User Experience

- The user launches `VirtuCapital模拟器.app` from the macOS Desktop.
- The launcher starts the existing AVD as an independent Android Emulator
  window, waits for Android to finish booting, and opens Virtu Capital.
- A compact always-on-top panel appears beside the emulator.
- The panel contains:
  - `截取纯 App 全屏`
  - `打开截图文件夹`
  - a status label showing the most recent result or error
- Closing the emulator automatically closes the panel.

## Screenshot Behavior

- Capture the active emulator display through ADB rather than macOS window
  capture, so the emulator title bar and toolbar are excluded.
- Remove 60 pixels from the top and 60 pixels from the bottom to exclude the
  Android status bar and gesture bar.
- Preserve the remaining pixels without rescaling or recompression artifacts.
- Save PNG files under:

  `/Users/apple/Desktop/产品策划/VC/项目截图/英文版本`

- Use filenames in the form:

  `VirtuCapital_YYYY-MM-DD_HH-mm-ss.png`

- Show a clear error when ADB is unavailable, the emulator is offline, capture
  fails, or the destination cannot be written.

## Architecture

The solution will be a small native macOS application with three components:

1. **Emulator controller**
   - Launches `VirtuCapitalFullScreen` using the existing Android SDK emulator.
   - Uses cold boot/no-snapshot options to avoid large snapshot files and stale
     state.
   - Waits for `sys.boot_completed=1`.
   - Starts `com.virtucapital.android/com.kingboat.virtu_capital.MainActivity`.
   - Observes the emulator process and terminates the application when that
     process exits.

2. **Floating panel**
   - Uses a compact, draggable, always-on-top macOS window.
   - Exposes the two user actions and status text.
   - Does not appear inside Android screenshots.

3. **Screenshot service**
   - Runs `adb shell screencap` to a temporary device file and pulls it locally.
   - Crops the image deterministically using native macOS image APIs.
   - Writes the final PNG atomically to the configured destination.

## Lifecycle

- One launcher instance owns one emulator process and one panel.
- Starting a second launcher instance focuses the existing panel instead of
  creating another emulator.
- Closing the panel alone does not kill the emulator; it hides the panel so it
  can be reopened from the launcher app.
- Closing the emulator ends the launcher and panel.
- The application does not install a persistent background daemon or login
  item.

## Verification

- Launching the desktop app opens an independent emulator window and panel.
- Virtu Capital becomes the foreground Android activity after boot.
- Clicking the capture button creates a valid 1080×2280 PNG in the destination.
- The PNG contains only App pixels, with no macOS or Android system chrome.
- Clicking `打开截图文件夹` opens the configured directory.
- Closing the emulator closes the panel and launcher.
- Failure cases display actionable messages without creating corrupt files.
