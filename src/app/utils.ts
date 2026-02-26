export function checkTimelineDatabase(
  _name: string,
  year: number,
  abortSignal?: AbortSignal,
): Promise<boolean> {
  return new Promise(function (resolve, reject) {
    const timeoutId = setTimeout(function () {
      resolve(year === 2026);
    }, 600);

    if (abortSignal) {
      abortSignal.addEventListener("abort", function () {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
}

export function calculateQuantumFlux(year: number): number {
  const baseline = Math.abs(year - 2024) * 1.21;

  let burn = 0;
  for (let i = 0; i < 80000; i += 1) {
    burn += i % 7;
  }

  return Number((baseline + burn * 0.000001).toFixed(2));
}

export const CONGESTION_LEVEL = {
  CLEAR: "CLEAR",
  LIGHT: "LIGHT",
  MODERATE: "MODERATE",
  HEAVY: "HEAVY",
} as const;

export type CongestionLevel = keyof typeof CONGESTION_LEVEL;

export type CongestionInfo = {
  level: CongestionLevel;
  /** Deterministic traveller count for this year (1–8). */
  count: number;
  icon: string;
  label: string;
};

const CLEAR_LABELS = [
  "Clear — no registered jumpers in this era",
  "Clear — timeline vacant, safe passage confirmed",
  "Clear — zero temporal signatures detected",
  "Clear — chrono-lane empty, jump at will",
  "Clear — no overlapping trajectories on record",
  "Clear — pristine timeline, zero interference",
  "Clear — temporal airspace unoccupied",
  "Clear — no causal footprints in this epoch",
  "Clear — quantum corridor wide open",
  "Clear — all bands free, smooth transit expected",
  "Clear — dead silence on the chronowave",
  "Clear — era untouched by travellers",
  "Clear — green across all temporal bands",
  "Clear — no wakes in the timestream",
  "Clear — jump window uncontested",
];

const LIGHT_LABELS = [
  "Light — {n} travellers detected",
  "Light — {n} faint signatures on scope",
  "Light — {n} registered, minimal disruption",
  "Light — {n} in-era, low interference",
  "Light — {n} chrononauts logged, lanes mostly free",
  "Light — {n} blips on temporal radar",
  "Light — {n} active jumpers, proceed normally",
  "Light — {n} travellers, standard caution advised",
  "Light — {n} time-prints found, negligible overlap",
  "Light — {n} presences, corridor stable",
  "Light — {n} on the grid, smooth sailing",
  "Light — {n} in transit, no congestion forming",
  "Light — {n} logged entries, all lanes nominal",
  "Light — {n} minor ripples detected",
  "Light — {n} contacts, temporal drift minimal",
];

const MODERATE_LABELS = [
  "Moderate — {n} travellers, congestion forming",
  "Moderate — {n} overlapping jumps, use caution",
  "Moderate — {n} active in-era, timeline strain rising",
  "Moderate — {n} signatures, temporal turbulence likely",
  "Moderate — {n} chrononauts, drift compensation required",
  "Moderate — {n} contacts, corridor pressure building",
  "Moderate — {n} registered, paradox buffer thinning",
  "Moderate — {n} in this epoch, brace for chop",
  "Moderate — {n} detected, timeline getting crowded",
  "Moderate — {n} travellers, causality margins narrowing",
  "Moderate — {n} active wakes, expect interference",
  "Moderate — {n} logged, recommend alternate window",
  "Moderate — {n} time-prints clustered, proceed with care",
  "Moderate — {n} blips converging, watch your vector",
  "Moderate — {n} in-band, flux levels climbing",
];

const HEAVY_LABELS = [
  "Heavy — {n} travellers, elevated risk",
  "Heavy — {n} jumpers, timeline near saturation",
  "Heavy — {n} contacts, paradox probability critical",
  "Heavy — {n} in-era, extreme temporal gridlock",
  "Heavy — {n} signatures, causality at breaking point",
  "Heavy — {n} active, chrono-lane severely congested",
  "Heavy — {n} overlapping, timeline integrity compromised",
  "Heavy — {n} detected, recommend abort or reroute",
  "Heavy — {n} registered, quantum noise off the charts",
  "Heavy — {n} travellers, temporal storm warning",
  "Heavy — {n} in-band, drift levels dangerous",
  "Heavy — {n} converging, reality fabric stressed",
  "Heavy — {n} contacts, corridor nearly collapsed",
  "Heavy — {n} chrononauts, brace for paradox shear",
  "Heavy — {n} logged, jump at your own peril",
];

function pickLabel(labels: string[], count: number): string {
  const idx = Math.floor(Math.random() * labels.length);
  return labels[idx].replace("{n}", String(count));
}

/**
 * Returns a deterministic congestion status for any destination year.
 * Uses `year % 18 + 1` to get a stable value in the range 1–18,
 * then maps it to a congestion tier. The label is randomly selected.
 */
export function genYearCongestion(year: number): CongestionInfo {
  const count = (Math.abs(year) % 18) + 1; // 1–18, stable per year

  if (count <= 2) {
    return {
      level: CONGESTION_LEVEL.CLEAR,
      count,
      icon: "◉",
      label: pickLabel(CLEAR_LABELS, count),
    };
  }
  if (count <= 3) {
    return {
      level: CONGESTION_LEVEL.LIGHT,
      count,
      icon: "◈",
      label: pickLabel(LIGHT_LABELS, count),
    };
  }
  if (count <= 6) {
    return {
      level: CONGESTION_LEVEL.MODERATE,
      count,
      icon: "◆",
      label: pickLabel(MODERATE_LABELS, count),
    };
  }
  const heavyCount = Math.floor(Math.random() * 193) + 8;
  return {
    level: CONGESTION_LEVEL.HEAVY,
    count: heavyCount,
    icon: "▲",
    label: pickLabel(HEAVY_LABELS, heavyCount),
  };
}
