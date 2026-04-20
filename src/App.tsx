import { useState } from "react";
import { MeshProvider, CardanoWallet } from "@meshsdk/react";
import { useCardanoPayment, CardanoPaymentButton } from "./sdk";

const PaymentPage = () => {
  const [selectedProduct] = useState({
    name: "Quantum Ledger S",
    priceLovelace: 45000000n,
    id: "QL-S-2026"
  });

  const payment = useCardanoPayment({
    merchantAddress: "addr_test1qpv09cujd0g2e74p8p0m6f94m88e3v96n6f7y96n6f7y96n6f7y96n6f7y96n6f7y96qh2p9",
    amountLovelace: selectedProduct.priceLovelace,
    metadata: {
      orderId: selectedProduct.id,
      description: `Purchase of ${selectedProduct.name}`,
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-3xl font-bold text-white">Checkout</h1>
        <p className="text-white/60 max-w-sm">
          Connect your wallet and complete your payment on the Cardano Ledger.
        </p>
      </div>

      <CardanoWallet label="Connect Wallet" />

      <CardanoPaymentButton 
        payment={payment} 
        label={`Pay ${Number(selectedProduct.priceLovelace) / 1000000} ADA`} 
      />
    </div>
  );
};

export default function App() {
  return (
    <MeshProvider>
      <PaymentPage />
    </MeshProvider>
  );
}
