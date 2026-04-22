import { useState } from "react";
import { MeshProvider, CardanoWallet } from "@meshsdk/react";
import { motion } from "framer-motion";
import { Shield, Smartphone, Zap, CheckCircle2 } from "lucide-react";
import { useCardanoPayment, CardanoPaymentButton } from "./sdk";
import { DeveloperGuide } from "./DeveloperGuide";
import logo from "./assets/logo.png";

// ─── Live payment demo (kept intact) ────────────────────────────────────────
const PaymentPage = () => {
  const [selectedProduct] = useState({
    name: "LaceWeave Pro Signature",
    priceLovelace: 65000000n,
    id: "LW-PRO-2026",
    features: [
      "Hardware-grade security",
      "Instant network settlement",
      "Priority protocol access",
    ],
  });

  const payment = useCardanoPayment({
    merchantAddress:
      "addr_test1qpv09cujd0g2e74p8p0m6f94m88e3v96n6f7y96n6f7y96n6f7y96n6f7y96n6f7y96qh2p9",
    amountLovelace: selectedProduct.priceLovelace,
    metadata: {
      orderId: selectedProduct.id,
      description: `Purchase of ${selectedProduct.name}`,
    },
  });

  return (
    <div className="flex flex-col items-center w-full max-w-6xl mx-auto min-h-screen">
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full flex justify-between items-center py-8 px-6 border-b border-white/5"
      >
        <img src={logo} alt="LaceWeave" className="h-10 md:h-12 w-auto object-contain" />
        <div className="hidden md:flex gap-6 text-sm font-medium opacity-60">
          <a href="#" className="hover:text-white transition-colors">Documentation</a>
          <a href="#" className="hover:text-white transition-colors">Developers</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
        <CardanoWallet label="Connect" isDark={true} />
      </motion.header>

      <main className="flex-1 w-full flex flex-col lg:flex-row gap-12 py-16 px-6 items-center lg:items-start justify-center">
        <motion.section
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex-1 flex flex-col gap-8 max-w-lg"
        >
          <div className="flex flex-col gap-4">
            <span className="text-cyan-400 font-bold text-xs uppercase tracking-widest px-3 py-1 bg-cyan-400/10 rounded-full w-fit border border-cyan-400/20">
              Limited Edition
            </span>
            <h1 className="text-5xl font-black tracking-tight text-white leading-tight">
              Secure your{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Digital Future
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              Experience the next generation of Cardano payments. Seamless,
              secure, and woven into the ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {selectedProduct.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-medium text-white/70">
                <div className="p-1.5 bg-emerald-500/20 rounded-md">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                {feature}
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm flex flex-col gap-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">
                  Selected Plan
                </span>
                <span className="text-lg font-bold">{selectedProduct.name}</span>
              </div>
              <div className="text-right flex flex-col">
                <span className="text-[10px] font-bold uppercase opacity-30 tracking-widest">
                  Total Price
                </span>
                <span className="text-2xl font-black tracking-tighter">
                  {Number(selectedProduct.priceLovelace) / 1_000_000} ADA
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="w-full max-w-md flex flex-col gap-8"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400/10 blur-3xl rounded-full" />

            <div className="flex flex-col gap-2 relative z-10">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <p className="text-sm text-white/40">
                Complete your transaction securely via LaceWeave SDK.
              </p>
            </div>

            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex flex-col gap-4 p-4 rounded-xl bg-black/20 border border-white/5">
                <div className="flex justify-between text-sm">
                  <span className="opacity-40">Subtotal</span>
                  <span>{Number(selectedProduct.priceLovelace) / 1_000_000} ADA</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-40">Network Fee</span>
                  <span>~0.17 ADA</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-30">
                  <Shield className="w-3 h-3" /> Secure Payment
                </div>
                <CardanoPaymentButton payment={payment} label="Complete Purchase" />
              </div>
            </div>

            <div className="flex justify-center gap-4 py-4 border-t border-white/5 relative z-10 mt-4">
              <div className="flex items-center gap-1.5 opacity-20 grayscale brightness-200">
                <Zap className="w-3 h-3" />
                <span className="text-[10px] font-bold">MESH SDK</span>
              </div>
              <div className="flex items-center gap-1.5 opacity-20 grayscale brightness-200">
                <Smartphone className="w-3 h-3" />
                <span className="text-[10px] font-bold">LACE READY</span>
              </div>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="w-full py-12 px-6 flex flex-col md:flex-row justify-between items-center border-t border-white/5 gap-6 text-[10px] uppercase font-bold tracking-[0.3em] opacity-20 mt-12">
        <span>© 2026 LaceWeave Protocol</span>
        <div className="flex gap-8">
          <span>Mainnet</span>
          <span>Security Audit: Passed</span>
        </div>
      </footer>
    </div>
  );
};

// ─── Page switcher tabs ──────────────────────────────────────────────────────
const TabBar = ({
  view,
  setView,
}: {
  view: "guide" | "demo";
  setView: (v: "guide" | "demo") => void;
}) => (
  <div
    style={{
      position: "fixed",
      bottom: "1.5rem",
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 100,
      display: "flex",
      gap: "0.25rem",
      background: "rgba(10,11,30,0.92)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "9999px",
      padding: "0.35rem",
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
    }}
  >
    {(["guide", "demo"] as const).map((v) => (
      <button
        key={v}
        id={`tab-${v}`}
        onClick={() => setView(v)}
        style={{
          padding: "0.45rem 1.1rem",
          borderRadius: "9999px",
          border: "none",
          cursor: "pointer",
          fontSize: "0.8125rem",
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          letterSpacing: "0.01em",
          transition: "all 0.2s",
          background: view === v ? "#00f2ff" : "transparent",
          color: view === v ? "#02020a" : "rgba(255,255,255,0.5)",
        }}
      >
        {v === "guide" ? "Developer Guide" : "Live Demo"}
      </button>
    ))}
  </div>
);

// ─── Root ────────────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState<"guide" | "demo">("guide");

  return (
    <MeshProvider>
      {view === "guide" ? <DeveloperGuide /> : <PaymentPage />}
      <TabBar view={view} setView={setView} />
    </MeshProvider>
  );
}

