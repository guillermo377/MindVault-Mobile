# 🧠 MindVault - Stateless Password Generator (Android)

> "Your mind is your fortress."

**MindVault** is a secure Android application that generates unbreakable, unique passwords using SHA-256 cryptography. It is completely **stateless**, meaning it never stores, saves, or transmits your passwords to any cloud server.

<p align="center">
  <img src="www/assets/MindVault_128.png" alt="MindVault Logo">
</p>



## 🛡️ Why MindVault?
Traditional password managers store your keys in a database (cloud or local). If that database is hacked, your secrets are exposed.

**MindVault works differently:**

*   **No Database:** Passwords are calculated mathematically on-the-fly.
*   **No Cloud:** Everything happens locally on your device using the Web Crypto API.
*   **Deterministic:** `Master Seed` + `Service Name` will always generate the same password.

## ✨ Key Features

*   **Cloudless Sync:** Access your passwords on any device without internet. Since the math is deterministic, you get the same password everywhere just by knowing your secret phrase.
*   **Physical Entry Mode:** Toggle a special "Big Text" display mode designed for manually typing passwords into other devices (like consoles, smart TVs, or air-gapped PCs).
*   **Military-Grade Encryption:** Uses **SHA-256** to hash your inputs.
*   **Stateless & Offline:** Zero data storage. It works completely offline (Airplane mode friendly).
*   **"Safe Set" Characters:** Generates passwords compatible with 99% of websites (letters, numbers, and symbols like `!@#$%*-_+=`).
*   **Anti-Typo Safety:** Includes a visibility toggle that auto-hides after 5 seconds to prevent shoulder surfing.
*   **Multi-Language:** Native support for English 🇺🇸 and Spanish 🇪🇸 (Auto-detects device language).

## 🚀 Installation

### 📲 Google Play Store
[**Download on Google Play**](https://play.google.com/store/apps/details?id=com.mindvault.app) *(Link coming soon!)*

### 🛠️ Manual Installation (APK)
1.  Download the latest `.apk` from the [Releases](https://github.com/guillermo377/MindVault-Mobile/releases) page.
2.  Open the file on your Android device.
3.  Allow installation from "Unknown Sources" if prompted.

## 🛠️ How it Works (The Math)
The generation process is transparent and auditable:

1.  **Input:** Takes your Master Seed and the Service Name (e.g., "gmail.com").
2.  **Salting:** Concatenates them: `Seed` || `Service`.
3.  **Hashing:** Applies **SHA-256** to the result string.
4.  **Mapping:** Converts the resulting hash bytes into a human-readable string using a custom "Safe Character Set" to ensure strong entropy.

## 🧠 Advanced Security Arguments
MindVault is built to defend against modern vulnerabilities:

*   **2FA is Not Enough:** Two-Factor Authentication (2FA) via SMS can be compromised (SIM swapping). Your complex, unique password remains the crucial first line of defense.
*   **Biometrics are Permanent:** You cannot change your fingerprint if it is compromised. MindVault allows you to change your Master Seed instantly if a breach is suspected, offering **revocable security**.

## 🔒 Security Architecture
*   **Permissions:** The app requests minimal permissions. Note that the `INTERNET` permission is technically required by the underlying Android WebView component to render the UI, but **no data is ever sent** by the application logic.
*   **Local Processing:** All logic runs locally in JavaScript.
*   **Memory Hygiene:** The app does not cache passwords in persistent storage. Once you close the app, the data is gone.

## ☕ Support the Project
MindVault is free and open source. If you find it useful, you can support its development:

[💙 Donate via PayPal](https://paypal.me/MindVaultDev)

## 📄 License
This project is licensed under the **GPLv3 License** - see the LICENSE file for details.

---
*Created with ❤️ for privacy enthusiasts.*
