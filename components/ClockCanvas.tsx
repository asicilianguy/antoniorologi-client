"use client";
import React, { useState, useEffect, useRef } from "react";
import { useClockCanvas } from "../hooks/useClockCanvas";

interface Props {
  imageLink:  string;
  numBase?:   number;
  className?: string;
  style?:     React.CSSProperties;
  onClick?:   () => void;
}

export default function ClockCanvas({
  imageLink, numBase = 7, className = "", style, onClick,
}: Props) {
  const { stableSrc, loading, aspect } = useClockCanvas(imageLink, numBase);

  const [shown,   setShown]   = useState<string | null>(null);
  const [prev,    setPrev]    = useState<string | null>(null);
  const [fading,  setFading]  = useState(false);
  // Count how many times this img has errored — used to trigger re-composite
  const errCount = useRef(0);
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    if (!stableSrc || stableSrc === shown) return;
    if (shown) {
      setPrev(shown);
      setFading(true);
    }
    setShown(stableSrc);
    errCount.current = 0; // reset error count on new src
  }, [stableSrc]); // eslint-disable-line

  if (!imageLink || imageLink.length < 2) return null;

  return (
    <div
      className={`cc-root ${className}`}
      style={{ position: "relative", width: "100%", aspectRatio: aspect,
               overflow: "hidden", ...style }}
      onClick={onClick}
    >
      {/* Shimmer — only before the very first image */}
      {loading && !shown && <div className="cc-shimmer" />}

      {/* Previous image — visible during cross-fade */}
      {fading && prev && (
        <img src={prev} alt=""
          style={{ position:"absolute", inset:0, width:"100%", height:"100%",
                   objectFit:"contain" }} />
      )}

      {/* Current image */}
      {shown && (
        <img
          key={`${shown}__${retryKey}`}
          src={shown}
          alt="Orologio"
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%",
            objectFit: "contain",
            animation: fading ? "cc-xfade .35s ease forwards" : "none",
          }}
          onAnimationEnd={() => { setPrev(null); setFading(false); }}
          onError={() => {
            // Blob evicted by mobile browser — clear from DOM and show shimmer,
            // the hook will recomposite on next render via retryKey change.
            if (errCount.current < 2) {
              errCount.current++;
              // Small delay to avoid tight retry loop
              setTimeout(() => setRetryKey(k => k + 1), 300);
            }
            setShown(null);
          }}
        />
      )}

      {/* Subtle spinner while loading a new version (old image still visible) */}
      {loading && shown && <div className="cc-ring" />}

      <style>{`
        .cc-shimmer {
          position:absolute; inset:0;
          background:linear-gradient(
            110deg,
            rgba(136,120,111,.12) 30%,
            rgba(136,120,111,.22) 50%,
            rgba(136,120,111,.12) 70%
          );
          background-size:200% 100%;
          animation:cc-shim 1.4s ease-in-out infinite;
        }
        .cc-ring {
          position:absolute; bottom:.75rem; right:.75rem;
          width:18px; height:18px; border-radius:50%;
          border:2px solid rgba(255,255,255,.2);
          border-top-color:rgba(255,255,255,.6);
          animation:cc-spin .7s linear infinite;
          pointer-events:none;
        }
        @keyframes cc-shim { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        @keyframes cc-spin  { to{transform:rotate(360deg)} }
        @keyframes cc-xfade { from{opacity:0} to{opacity:1} }
      `}</style>
    </div>
  );
}
