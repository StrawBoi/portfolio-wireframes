type Props = {
  isDark: boolean;
  onToggle: () => void;
};

export function DarkModeToggle({ isDark, onToggle }: Props) {
  return (
    <button
      type="button"
      className="pf-dark-toggle pf-mono"
      onClick={onToggle}
      data-cursor="hover"
      aria-pressed={isDark}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
