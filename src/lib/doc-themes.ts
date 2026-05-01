type DocThemeKey = "solar-system" | "protoplanetary" | "asteroid-belt" | "nebula" | "green-starfield" | "pulsar" | "binary-star" | "wormhole" | "red-dwarf";

export interface DocTheme {
  key: DocThemeKey;
  label: string;
  c1: string;
  c2: string;
  c3: string;
}

export const DOC_THEMES: Record<string, DocTheme> = {
  "getting-started": {
    key: "solar-system",
    label: "Solar System",
    c1: "#ffd27a",
    c2: "#ff7a18",
    c3: "#5a1a00",
  },
  "adding-a-content-collection": {
    key: "protoplanetary",
    label: "Protoplanetary Disk",
    c1: "#f4c47a",
    c2: "#a86a2e",
    c3: "#2a1608",
  },
  "rebranding-via-tokens": {
    key: "nebula",
    label: "Carina Nebula",
    c1: "#f472b6",
    c2: "#14b8a6",
    c3: "#1e1b4b",
  },
  "wiring-rss": {
    key: "pulsar",
    label: "Pulsar Beacon",
    c1: "#a78bfa",
    c2: "#6366f1",
    c3: "#0a0a23",
  },
  "seo-checklist": {
    key: "binary-star",
    label: "Binary Star",
    c1: "#fbbf24",
    c2: "#e0e7ff",
    c3: "#1c1917",
  },
  "design-decisions": {
    key: "green-starfield",
    label: "Green Starfield",
    c1: "#d1fae5",
    c2: "#22c55e",
    c3: "#020a06",
  },
  deployment: {
    key: "asteroid-belt",
    label: "Asteroid Belt",
    c1: "#94a3b8",
    c2: "#22d3ee",
    c3: "#0b1220",
  },
  "recommended-integrations": {
    key: "red-dwarf",
    label: "Red Dwarf",
    c1: "#fee2e2",
    c2: "#dc2626",
    c3: "#1a0507",
  },
};

export const FALLBACK_DOC_THEME: DocTheme = {
  key: "nebula",
  label: "Deep Space",
  c1: "#a78bfa",
  c2: "#22d3ee",
  c3: "#0a0a23",
};

export function themeForDoc(slug: string): DocTheme {
  return DOC_THEMES[slug] ?? FALLBACK_DOC_THEME;
}
