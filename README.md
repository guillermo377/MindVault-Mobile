# Mind Vault (Android MVP)

This is the Android mobile application version of the Mind Vault Chrome Extension.
It wraps the original HTML/JS/CSS logic in a Capacitor container to produce a native Android APK.

## 📱 Project Details
- **App Name:** Mind Vault
- **Package ID:** `com.mindvault.app`
- **Icon:** `MindVault_Logo.png`
- **Technology:** HTML5, Vanilla JS, Capacitor 5

## 🛠 Prerequisites (REQUIRED)
Before you can build the app, you **MUST** install the following tools:

1.  **Node.js (LTS Version)** - **MISSING ON YOUR SYSTEM**
    *   **Download:** [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
    *   *Why?* Required to install Capacitor and manage project dependencies (`npm`).
    *   **Verify:** After installing, restart your terminal and run `node -v` and `npm -v`.

2.  **Android Studio**
    *   **Download:** [https://developer.android.com/studio](https://developer.android.com/studio)
    *   *Why?* Required to compile the final APK file.
    *   **Setup:** Install it and ensure the "Android SDK" component is selected.

## 🚀 How to Build & Run

Once Node.js is installed:
    ```bash
    cd android_app
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Initialize Android Platform:**
    ```bash
    npx cap add android
    ```

4.  **Sync Web Assets:**
    ```bash
    npx cap sync
    ```

5.  **Open in Android Studio:**
    ```bash
    npx cap open android
    ```
    *From Android Studio, you can run the app on an Emulator or a Physical Device, or build the Signed APK via `Build > Generate Signed Bundle / APK`.*

## ✅ Verification & Guardrails

### A. SHA-256 Determinism (Critical)
The app uses the exact same logic as the extension.
**Test:**
- **Seed:** `test1234`
- **Service:** `gmail.com`
- **Expected Result:** (Should match the Chrome Extension output exactly)

### B. Copy Functionality
- Click "Generate Password".
- Click "Copy".
- Paste into another app to verify.

### C. Bilingual Support
- Tap the 🇺🇸 / 🇪🇸 flags to switch languages.
- Verify all labels update instantly.

### D. Offline Capability
- Turn on **Airplane Mode**.
- Open the App.
- Generate a password. It should work 100% offline.

### E. Donation Link
- Click "Donate via PayPal".
- It should open the system browser.

## 📂 Project Structure
- `www/`: Contains the web source code (HTML, CSS, JS).
- `capacitor.config.json`: Capacitor configuration.
- `android/`: Native Android project files (generated after `npx cap add android`).
