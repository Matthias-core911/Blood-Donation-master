const CITIES = [
  { name: "Eldoret", x: 22, y: 30 },
  { name: "Kisumu", x: 14, y: 47 },
  { name: "Nakuru", x: 38, y: 43 },
  { name: "Nairobi", x: 55, y: 58 },
  { name: "Nyeri", x: 52, y: 40 },
  { name: "Mombasa", x: 84, y: 84 },
  { name: "Machakos", x: 64, y: 66 },
  { name: "Garissa", x: 82, y: 47 },
];

const LINKS: Array<[number, number]> = [
  [3, 2],
  [2, 1],
  [3, 6],
  [6, 5],
  [3, 4],
  [2, 0],
  [3, 7],
];

/**
 * Stylised proximity graph: donors and requests connected by the lifeline.
 * Decorative - the accessible summary lives beside it in the section copy.
 */
export function ProximityMap() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-auto w-full"
      role="img"
      aria-label="Stylised map of Kenya showing donor and request connections between Eldoret, Kisumu, Nakuru, Nairobi, Nyeri, Machakos, Garissa and Mombasa."
    >
      <defs>
        <linearGradient id="lifeline-link" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.9" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {LINKS.map(([a, b], i) => {
        const from = CITIES[a]!;
        const to = CITIES[b]!;
        const mx = (from.x + to.x) / 2;
        const my = (from.y + to.y) / 2 - 9;
        return (
          <path
            key={`${a}-${b}`}
            d={`M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`}
            fill="none"
            stroke="url(#lifeline-link)"
            strokeWidth="0.6"
            strokeLinecap="round"
            className="trace-draw text-primary"
            style={{ animationDelay: `${i * 220}ms` }}
          />
        );
      })}

      {CITIES.map((c, i) => (
        <g key={c.name}>
          <circle cx={c.x} cy={c.y} r={i === 3 ? 2.1 : 1.2} className="fill-primary" />
          <circle
            cx={c.x}
            cy={c.y}
            r={i === 3 ? 4.6 : 3}
            className="fill-primary/15"
            style={{ transformOrigin: `${c.x}px ${c.y}px` }}
          />
          <text
            x={c.x + 3.4}
            y={c.y + 1.2}
            className="fill-current text-[2.6px] font-medium opacity-70"
          >
            {c.name}
          </text>
        </g>
      ))}
    </svg>
  );
}
