import type { ReactNode, Ref } from "react";

type Props = {
  id: string;
  label: string;
  curator: string;
  children: ReactNode;
  className?: string;
  sectionRef?: Ref<HTMLElement>;
  headingId?: string;
};

export function DossierSection({
  id,
  label,
  curator,
  children,
  className = "",
  sectionRef,
  headingId,
}: Props) {
  const resolvedHeadingId = headingId ?? `${id}-heading`;

  return (
    <section
      ref={sectionRef}
      id={id}
      className={["dossier-section", className].filter(Boolean).join(" ")}
      aria-labelledby={resolvedHeadingId}
    >
      <div className="dossier-section__inner">
        <header className="dossier-section__header" data-cursor-block>
          <p id={resolvedHeadingId} className="dossier-section__label pf-mono">
            {label}
          </p>
          <p className="dossier-section__curator">{curator}</p>
        </header>
        {children}
      </div>
    </section>
  );
}
