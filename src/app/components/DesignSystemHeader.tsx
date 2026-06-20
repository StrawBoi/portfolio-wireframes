const SWATCHES_LIGHT = [
  { name: "Sand · paper", v: "#F0EDE4", hex: "#F0EDE4" },
  { name: "Card", v: "#F7F5EE", hex: "#F7F5EE" },
  { name: "Ink", v: "#0A0F0E", hex: "#0A0F0E" },
  { name: "Cyprus · structural", v: "#004741", hex: "#004741" },
  { name: "Volcanico · motion", v: "#FF4103", hex: "#FF4103" },
];
const SWATCHES_DARK = [
  { name: "Noturno · paper", v: "#001621", hex: "#001621" },
  { name: "Card", v: "#062A38", hex: "#062A38" },
  { name: "Sand · text", v: "#F0EDE4", hex: "#F0EDE4" },
  { name: "Cyprus · lifted", v: "#2BC9B7", hex: "#2BC9B7" },
  { name: "Volcanico · motion", v: "#FF4103", hex: "#FF4103" },
];

export function DesignSystemHeader() {
  return (
    <section
      id="design-system"
      style={{
        background: "var(--pf-card)",
        border: "1px solid var(--pf-rule)",
        padding: 40,
        minWidth: 1344,
      }}
      className="flex flex-col gap-8 shrink-0"
    >
      <div className="flex items-end justify-between">
        <div className="flex flex-col gap-3">
          <span className="pf-eyebrow">Design System · v0.2</span>
          <h2 className="pf-h2" style={{ fontSize: 44 }}>
            Editorial body. <span className="pf-display-italic" style={{ color: "var(--pf-hot)" }}>Cinematic</span> intro &amp; close.
          </h2>
        </div>
        <span className="pf-mono">Dual-mode · Cyprus structural · Volcanico motion</span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Typography */}
        <div className="col-span-5 flex flex-col gap-4" style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 16 }}>
          <span className="pf-mono">Typography</span>
          <div className="flex flex-col gap-3">
            <span className="pf-display" style={{ fontSize: 72 }}>
              Bricolage<span className="pf-display-italic" style={{ color: "var(--pf-hot)" }}> Grotesque.</span>
            </span>
            <span className="pf-body" style={{ color: "var(--pf-ink)" }}>
              Inter Tight — body. Marketing-confident tracking for paragraphs, UI, nav.
            </span>
            <span className="pf-mono">JetBrains Mono — labels · meta · numerals</span>
          </div>
        </div>

        {/* Palette — dual system */}
        <div className="col-span-4 flex flex-col gap-4" style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 16 }}>
          <span className="pf-mono">Palette · editorial body</span>
          <div className="grid grid-cols-5 gap-2">
            {SWATCHES_LIGHT.map((s) => (
              <div key={s.name} className="flex flex-col gap-1">
                <div style={{ background: s.v, height: 48, border: "1px solid var(--pf-rule)" }} />
                <span className="pf-mono-num" style={{ fontSize: 10 }}>{s.name}</span>
                <span className="pf-mono-num" style={{ opacity: 0.6, fontSize: 10 }}>{s.hex}</span>
              </div>
            ))}
          </div>
          <span className="pf-mono">Palette · cinematic dark</span>
          <div className="grid grid-cols-5 gap-2">
            {SWATCHES_DARK.map((s) => (
              <div key={s.name} className="flex flex-col gap-1">
                <div style={{ background: s.v, height: 48, border: "1px solid var(--pf-rule)" }} />
                <span className="pf-mono-num" style={{ fontSize: 10 }}>{s.name}</span>
                <span className="pf-mono-num" style={{ opacity: 0.6, fontSize: 10 }}>{s.hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Components */}
        <div className="col-span-3 flex flex-col gap-4" style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 16 }}>
          <span className="pf-mono">Components</span>
          <div className="flex flex-col gap-3 items-start">
            <button className="pf-btn">Primary action</button>
            <button className="pf-btn pf-btn-ghost">Ghost</button>
            <a className="pf-btn-link pf-link-arrow">Inline link</a>
            <span className="pf-tag">Section tag</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-6" style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 16 }}>
        <span className="pf-mono">Rhythm</span>
        <span className="pf-mono-num">4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128</span>
        <div style={{ width: 1, height: 14, background: "var(--pf-rule)" }} />
        <span className="pf-mono">Grid</span>
        <span className="pf-mono-num">desktop 1440 / 12col / 96 margin / 24 gutter</span>
        <div style={{ width: 1, height: 14, background: "var(--pf-rule)" }} />
        <span className="pf-mono-num">mobile 390 / 4col / 20 margin / 16 gutter</span>
      </div>
    </section>
  );
}
