# Playwright-Maestro
A scalable and efficient automation framework orchestrating seamless UI testing with Playwright.

# 🚀 Ethereum Gas Tracker  

![Ethereum Gas Tracker](https://img.shields.io/badge/Status-Active-brightgreen)  
A Playwright TypeScript project that fetches Ethereum gas prices using the Etherscan API and sends email alerts when gas fees drop below a specified threshold.  

---

## 📌 **Project Overview**  
Ethereum gas prices fluctuate constantly, affecting transaction costs. This project automates:  
✅ Fetching **real-time gas prices** from Etherscan  
✅ Comparing against a **predefined threshold**  
✅ Sending **email alerts** when gas fees are low  

Deployed using **GitHub Actions**, running on a **cron schedule** to notify users efficiently.  

---

## 🛠️ **Tech Stack**  

| Tech         | Purpose                                    |
|-------------|--------------------------------------------|
| **TypeScript** | Strongly typed scripting language       |
| **Playwright** | API automation & HTTP requests         |
| **Node.js**  | Runtime for JavaScript execution         |
| **Etherscan API** | Fetches Ethereum gas prices        |
| **Nodemailer** | Sends email notifications             |
| **GitHub Actions** | Automates script execution        |
| **dotenv**  | Manages environment variables locally    |

---

## 🏗️ **Project Architecture**  
```mermaid
graph TD;
    A[GitHub Actions] -->|Runs on schedule| B[Node.js Script]
    B -->|Fetches Gas Prices| C[Etherscan API]
    B -->|Reads Threshold from| D[.env File]
    B -->|Sends Email Alert| E[Nodemailer]
    E -->|Email Sent| F[User Inbox]