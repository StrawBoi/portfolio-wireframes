import { ReactNode } from "react";

/* Visual primitives for the styled portfolio blueprint. */

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="pf-eyebrow">{children}</span>;
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="pf-tag">{children}</span>;
}

export function Mono({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`pf-mono ${className}`}>{children}</span>;
}

export function Num({ children }: { children: ReactNode }) {
  return <span className="pf-num">{children}</span>;
}

export function Btn({
  label,
  primary = true,
  arrow = false,
}: {
  label: string;
  primary?: boolean;
  arrow?: boolean;
}) {
  return (
    <button className={primary ? "pf-btn" : "pf-btn pf-btn-ghost"}>
      {label}
      {arrow && <span>→</span>}
    </button>
  );
}

export function LinkArrow({ label }: { label: string }) {
  return <a className="pf-btn-link pf-link-arrow">{label}</a>;
}

export function Rule({ className = "" }: { className?: string }) {
  return <div className={`pf-hr ${className}`} />;
}

/* Lo-fi placeholder hero/case visuals, but composed with system rules so they
   still feel intentional rather than gray boxes. */
export function HeroVisual({ className = "", height = 420 }: { className?: string; height?: number }) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        height,
        background: "var(--pf-paper-2)",
        border: "1px solid var(--pf-rule)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 600 420">
        <defs>
          <pattern id="dots" width="14" height="14" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--pf-rule-strong)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" opacity="0.5" />
        {/* Diagram fragment: nodes + connectors */}
        <g stroke="var(--pf-ink)" strokeWidth="1" fill="none">
          <rect x="60" y="80" width="140" height="60" />
          <rect x="260" y="80" width="140" height="60" />
          <rect x="160" y="220" width="140" height="60" />
          <rect x="360" y="220" width="180" height="80" />
          <line x1="200" y1="110" x2="260" y2="110" />
          <line x1="330" y1="140" x2="230" y2="220" />
          <line x1="300" y1="250" x2="360" y2="260" />
        </g>
        <g fill="var(--pf-signal)">
          <circle cx="60" cy="80" r="3" />
          <circle cx="540" cy="300" r="3" />
        </g>
        <g fontFamily="var(--pf-font-mono)" fontSize="9" fill="var(--pf-ink-2)" letterSpacing="1">
          <text x="68" y="100">RESEARCH</text>
          <text x="268" y="100">SYNTHESIS</text>
          <text x="168" y="240">STRATEGY</text>
          <text x="368" y="244">OUTCOME</text>
        </g>
      </svg>
      <div className="absolute bottom-3 right-3">
        <Mono>fig.01 — system map</Mono>
      </div>
    </div>
  );
}

export function CaseVisual({
  label,
  height = 360,
  className = "",
}: {
  label?: string;
  height?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        height,
        background: "var(--pf-paper-2)",
        border: "1px solid var(--pf-rule)",
      }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 360">
        <g stroke="var(--pf-rule-strong)" strokeWidth="0.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1={(800 / 12) * i} y1="0" x2={(800 / 12) * i} y2="360" />
          ))}
        </g>
        <g stroke="var(--pf-ink)" fill="none" strokeWidth="1">
          <rect x="48" y="48" width="320" height="80" />
          <rect x="48" y="148" width="200" height="200" opacity="0.85" />
          <rect x="272" y="148" width="200" height="96" />
          <rect x="496" y="48" width="256" height="300" />
        </g>
        <g fill="var(--pf-signal)">
          <rect x="496" y="48" width="40" height="6" />
        </g>
      </svg>
      {label && (
        <div className="absolute bottom-4 left-4">
          <Mono>{label}</Mono>
        </div>
      )}
    </div>
  );
}
