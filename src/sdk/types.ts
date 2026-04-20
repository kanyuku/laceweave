import type { Asset, BlockfrostProvider } from "@meshsdk/core";

export type CardanoNetwork = "mainnet" | "preprod" | "preview";

export type PaymentStatus = 
  | "idle"
  | "preparing"
  | "signing"
  | "submitting"
  | "submitted"
  | "confirming"
  | "confirmed"
  | "error";

export interface PaymentMetadata {
  orderId?: string;
  description?: string;
  externalRef?: string;
  [key: string]: string | number | boolean | undefined | string[] | Record<string, unknown>;
}

export interface CardanoPaymentConfig {
  merchantAddress: string;
  amountLovelace: bigint;
  nativeTokens?: Asset[];
  metadata?: PaymentMetadata;
  confirmationsRequired?: number;
  provider?: BlockfrostProvider;
  onSuccess?: (txHash: string, details: PaymentResult) => void;
  onError?: (error: Error) => void;
}

export interface PaymentResult {
  txHash: string;
  block?: string;
  slot?: number;
  fee?: string;
  status: PaymentStatus;
  confirmations: number;
}

export interface CardanoPaymentState {
  status: PaymentStatus;
  txHash: string | null;
  error: Error | null;
  confirmations: number;
  network: CardanoNetwork;
  isProcessing: boolean;
  initiatePayment: () => Promise<void>;
  reset: () => void;
}
