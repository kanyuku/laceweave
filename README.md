# Cardano Payment SDK

A production-ready, highly modular Cardano Payment SDK for web dApps using **MeshJS**. This SDK provides a streamlined way to integrate ADA and native token payments with real-time confirmation tracking.

## 🚀 Features

- **useCardanoPayment Hook**: A stateful hook that manages the entire transaction lifecycle (Preparing → Signing → Submitting → Confirming).
- **CardanoPaymentButton Component**: A premium, accessible UI component with built-in loading states and transaction tracking.
- **CIP-20 Support**: Automatic metadata formatting for order tracking and messages.
- **Multi-Asset Payments**: Full support for native tokens alongside ADA.
- **Environment Driven**: configurable via `.env` for Blockfrost API keys and network selection.
- **Accessible Design**: ARIA-compliant components for screen reader support.

## 📦 Installation

This SDK is designed to be integrated directly into your React project. Ensure you have the required dependencies installed:

```bash
npm install @meshsdk/core @meshsdk/react lucide-react framer-motion
```

## 🛠️ Configuration

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Add your **Blockfrost API Key**:
   ```env
   VITE_BLOCKFROST_API_KEY=your_project_id_here
   ```

## 💻 Usage

### 1. Wrap your Application
Ensure your app is wrapped with `MeshProvider`:

```tsx
import { MeshProvider } from "@meshsdk/react";

function App() {
  return (
    <MeshProvider>
      <YourCheckoutPage />
    </MeshProvider>
  );
}
```

### 2. Implement the Payment Logic
Use the `useCardanoPayment` hook and `CardanoPaymentButton` component:

```tsx
import { useCardanoPayment, CardanoPaymentButton } from "./sdk";

const Checkout = () => {
  const payment = useCardanoPayment({
    merchantAddress: "addr1...",
    amountLovelace: 5000000n, // 5 ADA
    metadata: {
      orderId: "INV-001",
      description: "Service Payment"
    }
  });

  return (
    <div>
      <h1>Complete your purchase</h1>
      <CardanoPaymentButton payment={payment} label="Secure Checkout" />
    </div>
  );
};
```

## 📂 Project Structure

- `src/sdk/index.ts`: Public API entry point.
- `src/sdk/useCardanoPayment.ts`: Core payment logic and blockchain polling.
- `src/sdk/CardanoPaymentButton.tsx`: UI component with animated states.
- `src/sdk/types.ts`: TypeScript interfaces and payment statuses.
- `src/sdk/utils.ts`: Internal helpers for lovelace and metadata.

## 🛡️ Security

This SDK is built using **MeshJS**, following industry standards for transaction building and signing. Ensure that your merchant address and environment variables are managed securely in production environments.

## 📄 License

MIT © 2026 Cardano Payment SDK
