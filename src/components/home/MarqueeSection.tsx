type Props = { items: string[] };

export function MarqueeSection({ items }: Props) {
  const doubled = [...items, ...items];

  return (
    <div style={{ background: "#1a2840", overflow: "hidden", padding: "1rem 0", borderTop: "0.5px solid rgba(143,184,188,0.2)", borderBottom: "0.5px solid rgba(143,184,188,0.2)" }}>
      <div className="flex whitespace-nowrap marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center">
            <span
              style={{
                fontFamily: "var(--font-jost)",
                fontSize: "0.7rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#fdfcfa",
                fontWeight: 400,
                padding: "0 2.5rem",
              }}
            >
              {item}
            </span>
            <span style={{ color: "#b89a6a", fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
