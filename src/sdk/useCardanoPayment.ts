import { useState, useCallback, useRef } from "react";
import { useWallet } from "@meshsdk/react";
import {
  BlockfrostProvider,
  Transaction,
  type IInitiator,
} from "@meshsdk/core";
import type {
  CardanoPaymentConfig,
  CardanoPaymentState,
  PaymentStatus,
  CardanoNetwork,
} from "./types";
import { formatCIP20Metadata, sleep, parseWalletError } from "./utils";

export const useCardanoPayment = (config: CardanoPaymentConfig): CardanoPaymentState => {
  const { 
    merchantAddress, 
    amountLovelace, 
    nativeTokens = [], 
    metadata = {}, 
    confirmationsRequired = 1,
    provider: configProvider,
    onSuccess,
    onError 
  } = config;

  const { wallet, connected } = useWallet();
  
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [confirmations, setConfirmations] = useState<number>(0);
  const [network, setNetwork] = useState<CardanoNetwork>("mainnet");
  
  const isPolling = useRef(false);

  const reset = useCallback(() => {
    setStatus("idle");
    setTxHash(null);
    setError(null);
    setConfirmations(0);
    isPolling.current = false;
  }, []);

  const getProvider = useCallback(() => {
    if (configProvider) return configProvider;
    const apiKey = import.meta.env?.VITE_BLOCKFROST_API_KEY || "";
    
    // Detect network from API key
    if (apiKey.startsWith("preprod")) setNetwork("preprod");
    else if (apiKey.startsWith("preview")) setNetwork("preview");
    else setNetwork("mainnet");

    return new BlockfrostProvider(apiKey);
  }, [configProvider]);

  const pollForConfirmation = useCallback(async (hash: string) => {
    if (isPolling.current) return;
    isPolling.current = true;
    
    const provider = getProvider();
    let currentConfirmations = 0;
    setStatus("confirming");

    try {
      while (currentConfirmations < confirmationsRequired) {
        const txStatus = await provider.fetchTxInfo(hash);
        
        if (txStatus) {
          currentConfirmations = 1; 
          setConfirmations(currentConfirmations);
          
          if (currentConfirmations >= confirmationsRequired) {
            setStatus("confirmed");
            onSuccess?.(hash, {
              txHash: hash,
              status: "confirmed",
              confirmations: currentConfirmations,
              block: txStatus.blockHeight?.toString() || "Unknown",
              slot: Number(txStatus.slot) || 0,
            });
            break;
          }
        }
        
        await sleep(15000);
      }
    } catch (e) {
      console.error("Polling error:", e);
    } finally {
      isPolling.current = false;
    }
  }, [confirmationsRequired, getProvider, onSuccess]);

  const initiatePayment = useCallback(async () => {
    if (!connected || !wallet) {
      const err = new Error("Wallet not connected");
      setError(err);
      onError?.(err);
      return;
    }

    try {
      setError(null);
      setStatus("preparing");

      getProvider();
      const meshMetadata = formatCIP20Metadata(metadata);

      // Cast wallet to IInitiator — MeshCardanoBrowserWallet satisfies the interface
      // at runtime but the beta types have a minor getCollateral() mismatch.
      const tx = new Transaction({ initiator: wallet as unknown as IInitiator })
        .sendLovelace(merchantAddress, amountLovelace.toString());
      
      nativeTokens.forEach(token => {
        tx.sendAssets(merchantAddress, [token]);
      });

      if (meshMetadata["674"].msg.length > 0) {
        tx.setMetadata(674, meshMetadata["674"].msg);
      }

      setStatus("signing");
      const unsignedTx = await tx.build();
      const signedTx = await wallet.signTx(unsignedTx, false);
      
      setStatus("submitting");
      const hash = await wallet.submitTx(signedTx);
      
      setTxHash(hash);
      setStatus("submitted");
      
      pollForConfirmation(hash);

    } catch (e: unknown) {
      const friendlyError = new Error(parseWalletError(e));
      setError(friendlyError);
      setStatus("error");
      onError?.(friendlyError);
    }
  }, [
    connected, 
    wallet, 
    merchantAddress, 
    amountLovelace, 
    nativeTokens, 
    metadata, 
    onError, 
    getProvider, 
    pollForConfirmation
  ]);

  return {
    status,
    txHash,
    error,
    confirmations,
    network,
    isProcessing: ["preparing", "signing", "submitting", "confirming"].includes(status),
    initiatePayment,
    reset
  };
};
