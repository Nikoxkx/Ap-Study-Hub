export function SkyLoader({ label = "Clearing the horizon…" }: { label?: string }) {
  return (
    <div className="sky-loader" role="status" aria-live="polite" aria-label={label}>
      <div className="sky-loader__visual">
        <div className="sky-loader__wrapper">
          <div className="sky-loader__circle" />
          <div className="sky-loader__circle" />
          <div className="sky-loader__circle" />
          <div className="sky-loader__shadow" />
          <div className="sky-loader__shadow" />
          <div className="sky-loader__shadow" />
        </div>
      </div>
      <span className="sky-loader__label">{label}</span>
    </div>
  );
}

export function SkyLoaderCard() {
  return (
    <div className="glass-card" style={{ display: "grid", placeItems: "center", minHeight: 220 }}>
      <SkyLoader />
    </div>
  );
}
