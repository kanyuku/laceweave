import { useState } from "react";
import { motion } from "framer-motion";
import logo from "./assets/logo.png";

// ─── Syntax highlighted fake code block ─────────────────────────────────────

const KW = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#c792ea" }}>{children}</span>
);
const STR = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#c3e88d" }}>{children}</span>
);
const FN = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#82aaff" }}>{children}</span>
);
const CMT = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#546e7a", fontStyle: "italic" }}>{children}</span>
);
const NUM = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#f78c6c" }}>{children}</span>
);
const PROP = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#89ddff" }}>{children}</span>
);
const TYPE = ({ children }: { children: React.ReactNode }) => (
  <span style={{ color: "#ffcb6b" }}>{children}</span>
);

// ─── Mini live widget ────────────────────────────────────────────────────────

const TryWidget = () => {
  const [connected, setConnected] = useState(false);
  const [status, setStatus] = useState<"idle" | "signing" | "done">("idle");

  const handleConnect = () => setConnected(true);
  const handlePay = () => {
    if (!connected) return;
    setStatus("signing");
    setTimeout(() => setStatus("done"), 1800);
  };

  return (
    <div className="lw-widget">
      <div className="lw-widget-header">
        <span className="lw-widget-title">Try the LaceWeave SDK</span>
        <span className="lw-widget-sub">Live on this page</span>
      </div>

      <div className="lw-widget-row">
        <div className="lw-widget-field">
          <code className="lw-tag">merchantAddress</code>
          <span className="lw-tag-desc">Your Cardano address</span>
        </div>
        <button
          className={`lw-toggle ${connected ? "active" : ""}`}
          onClick={handleConnect}
        />
      </div>

      <div className="lw-widget-row">
        <div className="lw-widget-field">
          <code className="lw-tag">amountLovelace</code>
          <span className="lw-tag-desc">Payment amount in lovelace</span>
        </div>
        <div className="lw-select-wrap">
          <span className="lw-select-val">5000000 ₳</span>
        </div>
      </div>

      <div className="lw-widget-row">
        <div className="lw-widget-field">
          <code className="lw-tag">onSuccess</code>
          <span className="lw-tag-desc">Callback on confirmation</span>
        </div>
        <button
          className={`lw-toggle ${status === "done" ? "active" : ""}`}
          onClick={handlePay}
        />
      </div>

      {status === "signing" && (
        <div className="lw-widget-status signing">Awaiting wallet signature…</div>
      )}
      {status === "done" && (
        <div className="lw-widget-status done">Transaction confirmed!</div>
      )}
    </div>
  );
};

// ─── Code block component ────────────────────────────────────────────────────

const CodeBlock = ({
  filename,
  icon,
  label,
  children,
}: {
  filename: string;
  icon: string;
  label: string;
  children: React.ReactNode;
}) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="lw-codeblock">
      <div className="lw-codeblock-header">
        <span className="lw-codeblock-icon">{icon}</span>
        <span className="lw-codeblock-filename">{filename}</span>
        <button className="lw-copy-btn" onClick={handleCopy}>
          {copied ? "✓" : "⧉"}
        </button>
      </div>
      <pre className="lw-code">{children}</pre>
      <div className="lw-codeblock-footer">{label}</div>
    </div>
  );
};

// ─── Feature card ────────────────────────────────────────────────────────────

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="lw-feature-card">
    <div className="lw-feature-icon">{icon}</div>
    <h3 className="lw-feature-title">{title}</h3>
    <p className="lw-feature-desc">{description}</p>
  </div>
);

// ─── Main Guide ──────────────────────────────────────────────────────────────

export const DeveloperGuide = () => {
  return (
    <div className="lw-guide">
      {/* Nav */}
      <nav className="lw-nav">
        <div className="lw-nav-inner">
          <div className="lw-nav-left">
            <img src={logo} alt="LaceWeave" className="lw-nav-logo" />
            <a href="#" className="lw-nav-link active">Docs</a>
          </div>
          <div className="lw-nav-right">
            <div className="lw-search">
              <span className="lw-search-icon">⌕</span>
              <span className="lw-search-placeholder">Search…</span>
              <kbd className="lw-kbd">/</kbd>
            </div>
            <a href="#" className="lw-nav-btn outline">Feedback</a>
            <a href="https://github.com" className="lw-nav-btn filled">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="lw-hero">
        <div className="lw-hero-inner">
          <motion.div
            className="lw-hero-text"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="lw-hero-headline">
              The Cardano<br />payment toolkit
            </h1>
            <p className="lw-hero-subtitle">
              LaceWeave is a free, open-source SDK for accepting ADA and native
              token payments in React apps. Built on MeshJS.
            </p>
            <div className="lw-hero-actions">
              <a href="#setup" className="lw-btn-primary">Get Started</a>
              <div className="lw-install-cmd">
                <span className="lw-install-prefix">$</span>
                <code>npm i laceweave</code>
                <button className="lw-copy-inline">⧉</button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <TryWidget />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="lw-section">
        <div className="lw-section-inner">
          <h2 className="lw-section-title">Payments as code</h2>
          <p className="lw-section-sub">
            The SDK sits between your React app and the Cardano blockchain,
            handling wallet connections, transaction building, and confirmation
            polling automatically.
          </p>

          <div className="lw-features">
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                </svg>
              }
              title="Works with any wallet"
              description="Nami, Flint, Eternl, Lace, Vespr — use any CIP-30 compatible wallet with zero extra config."
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                </svg>
              }
              title="Effortless integration"
              description="One hook, one button. Drop useCardanoPayment and CardanoPaymentButton into any React component."
            />
            <FeatureCard
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              }
              title="On-chain confirmation"
              description="Built-in polling via Blockfrost. Get real-time status updates from idle to confirmed."
            />
          </div>
        </div>
      </section>

      {/* Code Setup */}
      <section className="lw-section lw-section-alt" id="setup">
        <div className="lw-section-inner">
          <div className="lw-setup-header">
            <h2 className="lw-section-title">Effortless setup</h2>
            <a href="#" className="lw-read-docs">Read the Docs →</a>
          </div>
          <p className="lw-section-sub">
            A simple declarative API to configure and trigger Cardano payments.
          </p>

          <div className="lw-code-pair">
            <CodeBlock filename="payment.ts" icon="⬡" label="Configuring a payment">
              <CMT>{"// 1. Import the hook"}</CMT>
              {"\n"}
              <KW>import</KW>{" { "}<TYPE>useCardanoPayment</TYPE>{" } from "}<STR>'laceweave'</STR>{";"}
              {"\n\n"}
              <CMT>{"// 2. Declare your payment config"}</CMT>
              {"\n"}
              <KW>const</KW>{" payment = "}<FN>useCardanoPayment</FN>{"({"}
              {"\n  "}<PROP>merchantAddress</PROP>{": "}
              <STR>"addr1qx...your_address"</STR>{","}
              {"\n  "}<PROP>amountLovelace</PROP>{": "}<NUM>5000000n</NUM>{","}
              {"\n  "}<PROP>metadata</PROP>{": {"}
              {"\n    "}<PROP>orderId</PROP>{": "}<STR>"ORDER-001"</STR>{","}
              {"\n    "}<PROP>description</PROP>{": "}<STR>"Pro Subscription"</STR>{","}
              {"\n  "},{"}}"}
              {"\n  "}<PROP>onSuccess</PROP>{": (txHash) => {"}
              {"\n    "}<FN>console</FN>{"."}<FN>log</FN>{"("}<STR>"Confirmed:"</STR>{", txHash);"}
              {"\n  "},{"}"}{","} 
              {"\n"}{"}"}{")"}{";"}
            </CodeBlock>

            <CodeBlock filename="app/page.tsx" icon="⬡" label="Rendering the payment button">
              <CMT>{"// 3. Import the button component"}</CMT>
              {"\n"}
              <KW>import</KW>{" { "}
              <TYPE>CardanoPaymentButton</TYPE>
              {" } from "}<STR>'laceweave'</STR>{";"}
              {"\n"}
              <KW>import</KW>{" { "}<TYPE>CardanoWallet</TYPE>{" } from "}<STR>'@meshsdk/react'</STR>{";"}
              {"\n\n"}
              <KW>export default function</KW>{" "}<FN>Page</FN>{"() {"}
              {"\n  "}<KW>return</KW>{" ("}
              {"\n    "}<PROP>{"<div>"}</PROP>
              {"\n      "}<CMT>{"{"}<STR>{"/* Let users connect their wallet */"}</STR>{"}"}</CMT>
              {"\n      "}<PROP>{"<CardanoWallet"}</PROP>{" "}
              <PROP>label</PROP>{"="}<STR>{"\"Connect\""}</STR>{" "}
              <PROP>isDark</PROP>{" />"}
              {"\n\n      "}<CMT>{"{"}<STR>{"/* Trigger the payment */"}</STR>{"}"}</CMT>
              {"\n      "}<PROP>{"<CardanoPaymentButton"}</PROP>
              {"\n        "}<PROP>payment</PROP>{"={payment}"}
              {"\n        "}<PROP>label</PROP>{"="}<STR>{"\"Pay with ADA\""}</STR>
              {"\n      "}<PROP>{"/>"}</PROP>
              {"\n    "}<PROP>{"</div>"}</PROP>
              {"\n  );"}
              {"\n}"}
            </CodeBlock>
          </div>
        </div>
      </section>

      {/* Status lifecycle */}
      <section className="lw-section">
        <div className="lw-section-inner">
          <h2 className="lw-section-title">Full payment lifecycle</h2>
          <p className="lw-section-sub">
            Track every stage of a transaction via the <code className="lw-inline-code">status</code> field returned by the hook.
          </p>

          <div className="lw-lifecycle">
            {[
              { status: "idle", desc: "Waiting for user to initiate payment" },
              { status: "preparing", desc: "Building the transaction object" },
              { status: "signing", desc: "Awaiting wallet signature from user" },
              { status: "submitting", desc: "Broadcasting to the Cardano network" },
              { status: "submitted", desc: "In mempool, awaiting confirmation" },
              { status: "confirming", desc: "Polling Blockfrost for block inclusion" },
              { status: "confirmed", desc: "On-chain and finalized" },
              { status: "error", desc: "An error occurred at any stage" },
            ].map((item, i) => (
              <div className="lw-lifecycle-item" key={i}>
                <code className={`lw-status-badge lw-status-${item.status}`}>{item.status}</code>
                <span className="lw-lifecycle-desc">{item.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="lw-section lw-section-alt">
        <div className="lw-section-inner">
          <h2 className="lw-section-title">What devs are saying</h2>
          <div className="lw-testimonials">
            {[
              {
                quote: "Dropped it into our dApp in under 10 minutes. The status lifecycle made UX a breeze.",
                author: "@ada_builder",
                role: "DeFi Protocol Dev",
              },
              {
                quote: "Finally a payment SDK for Cardano that doesn't make me wrangle UTxOs manually.",
                author: "@cardano_dev",
                role: "Full-stack Developer",
              },
              {
                quote: "The CIP-20 metadata support and Blockfrost polling are exactly what I needed.",
                author: "@mesh_enjoyer",
                role: "Open Source Contributor",
              },
            ].map((t, i) => (
              <div className="lw-testimonial" key={i}>
                <p className="lw-testimonial-quote">"{t.quote}"</p>
                <div className="lw-testimonial-author">
                  <div className="lw-author-avatar">
                    {t.author.slice(1, 3).toUpperCase()}
                  </div>
                  <div>
                    <div className="lw-author-name">{t.author}</div>
                    <div className="lw-author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lw-footer">
        <div className="lw-footer-inner">
          <img src={logo} alt="LaceWeave" className="lw-footer-logo" />
          <div className="lw-footer-links">
            <a href="#">Documentation</a>
            <a href="#">GitHub</a>
            <a href="#">Changelog</a>
            <a href="#">License</a>
          </div>
          <span className="lw-footer-copy">© 2026 LaceWeave Protocol. MIT License.</span>
        </div>
      </footer>
    </div>
  );
};
