import { Artboard, FrameGrid } from "../Artboard";
import { Btn, Eyebrow, Mono } from "../wireframe/Primitives";
import { contactClose } from "@portfolio/shared/content";

export function Desktop({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="07_Contact_Close" viewport="desktop" height={760} showGrid={showGrid} fluid={fluid} cinematic>
      <div className="flex flex-col h-full" style={{ paddingTop: 96, paddingBottom: 40 }}>
        <FrameGrid viewport="desktop">
          <div style={{ gridColumn: "span 2 / span 2" }}>
            <Eyebrow>{contactClose.eyebrow}</Eyebrow>
          </div>
          <div style={{ gridColumn: "span 10 / span 10" }} className="flex flex-col gap-10">
            <h1 className="pf-h1" style={{ fontSize: 92 }}>
              {contactClose.heading[0]}<br />
              {contactClose.heading[1]}<br />
              <span className="pf-display-italic">{contactClose.heading[2]}</span>
            </h1>
            <p className="pf-lede" style={{ maxWidth: 520 }}>
              {contactClose.lede}
            </p>
            <div className="flex items-center gap-3">
              <Btn label="Send a message" arrow />
              <Btn label="Connect on LinkedIn" primary={false} />
              <Btn label="Download CV" primary={false} />
            </div>
          </div>
        </FrameGrid>

        <div style={{ marginTop: "auto", paddingTop: 48 }}>
          <div style={{ height: 1, background: "var(--pf-rule)", marginBottom: 20 }} />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div style={{ width: 8, height: 8, background: "var(--pf-signal)" }} />
              <Mono>{contactClose.footerMark}</Mono>
            </div>
            <div className="flex items-center gap-6">
              <Mono>{contactClose.footerLocation}</Mono>
              <Mono>{contactClose.footerNote}</Mono>
              <Mono>LinkedIn</Mono>
            </div>
          </div>
        </div>
      </div>
    </Artboard>
  );
}

export function Mobile({ showGrid, fluid }: { showGrid: boolean; fluid?: boolean }) {
  return (
    <Artboard name="07_Contact_Close" viewport="mobile" height={760} showGrid={showGrid} fluid={fluid} cinematic>
      <div className="flex flex-col h-full gap-8" style={{ paddingTop: 56, paddingBottom: 32 }}>
        <Eyebrow>Let&rsquo;s talk</Eyebrow>
        <h1 className="pf-h1" style={{ fontSize: 44 }}>
          {contactClose.mobileHeadingLead}{" "}
          <span className="pf-display-italic">{contactClose.mobileHeadingAccent}</span>
        </h1>
        <p className="pf-lede">{contactClose.mobileLede}</p>
        <div className="flex flex-col gap-2">
          <Btn label="Send a message" arrow />
          <Btn label="Connect on LinkedIn" primary={false} />
          <Btn label="Download CV" primary={false} />
        </div>
        <div style={{ marginTop: "auto" }}>
          <div style={{ height: 1, background: "var(--pf-rule)", marginBottom: 12 }} />
          <Mono>{contactClose.footerMark}</Mono>
        </div>
      </div>
    </Artboard>
  );
}
