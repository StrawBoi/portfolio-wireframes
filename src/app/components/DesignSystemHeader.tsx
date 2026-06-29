const SWATCHES_LIGHT = [
  { name: "Paper", v: "#F0EEE9", hex: "#F0EEE9" },
  { name: "Card", v: "#F5F3EC", hex: "#F5F3EC" },
  { name: "Ink", v: "#1A2328", hex: "#1A2328" },
  { name: "Teal · signal", v: "#1B6B5A", hex: "#1B6B5A" },
  { name: "Ember · motion", v: "#D4622A", hex: "#D4622A" },
];
const SWATCHES_DARK = [
  { name: "Forest ink", v: "#0C1218", hex: "#0C1218" },
  { name: "Card", v: "#18222C", hex: "#18222C" },
  { name: "Sand · text", v: "#E9E5DC", hex: "#E9E5DC" },
  { name: "Teal · signal", v: "#2A8F7A", hex: "#2A8F7A" },
  { name: "Ember · motion", v: "#D4622A", hex: "#D4622A" },
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
        <span className="pf-mono">Dossier Signal · teal structure · ember motion</span>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Typography */}
        <div className="col-span-5 flex flex-col gap-4" style={{ borderTop: "1px solid var(--pf-rule)", paddingTop: 16 }}>
          <span className="pf-mono">Typography</span>
          <div className="flex flex-col gap-3">
            <span className="pf-display" style={{ fontSize: 72 }}>
              Instrument<span className="pf-display-italic" style={{ color: "var(--pf-hot)" }}> Serif.</span>
            </span>
            <span className="pf-body" style={{ color: "var(--pf-ink)" }}>
              Instrument Sans — body, UI, nav. Editorial authority without grotesque noise.
            </span>
            <span className="pf-mono">IBM Plex Mono — labels · meta · data layer</span>
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
