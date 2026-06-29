type Props = {
  total: number;
  classPrefix?: string;
  gradientId?: string;
};

export function ScrollMeter({
  total,
  classPrefix = "dossier-meter",
  gradientId = "dossier-meter-gradient",
}: Props) {
  return (
    <>
      <div className={classPrefix} aria-hidden>
        <svg className={`${classPrefix}__svg`} viewBox="0 0 24 120" preserveAspectRatio="xMidYMid meet">
          <line x1="12" y1="6" x2="12" y2="114" className={`${classPrefix}__ghost`} />
          <line
            x1="12"
            y1="6"
            x2="12"
            y2="114"
            className={`${classPrefix}__ink`}
            pathLength="1"
          />
        </svg>
        <span className={`${classPrefix}__readout pf-mono`}>
          <span className={`${classPrefix}__current`}>01</span>
          <span className={`${classPrefix}__sep`}>/</span>
          <span className={`${classPrefix}__total`}>{String(total).padStart(2, "0")}</span>
        </span>
      </div>
      <svg className={`${classPrefix}__defs`} aria-hidden width="0" height="0">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(38, 28, 20, 0.5)" />
            <stop offset="72%" stopColor="rgba(38, 28, 20, 0.32)" />
            <stop offset="100%" stopColor="rgba(255, 65, 3, 0.85)" />
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
