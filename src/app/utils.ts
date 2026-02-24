export const checkTimelineDatabase = (
  _name: string,
  year: number,
  abortSignal?: AbortSignal,
): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      resolve(year === 2026);
    }, 600);

    if (abortSignal) {
      abortSignal.addEventListener("abort", () => {
        clearTimeout(timeoutId);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });
};

export const calculateQuantumFlux = (year: number): number => {
  const baseline = Math.abs(year - 2024) * 1.21;

  let burn = 0;
  for (let i = 0; i < 80000; i += 1) {
    burn += i % 7;
  }

  return Number((baseline + burn * 0.000001).toFixed(2));
};

export type CongestionLevel = "CLEAR" | "LIGHT" | "MODERATE" | "HEAVY";

export type CongestionInfo = {
  level: CongestionLevel;
  /** Deterministic traveller count for this year (1–8). */
  count: number;
  icon: string;
  label: string;
};

/**
 * Returns a deterministic congestion status for any destination year.
 * Uses `year % 8 + 1` to get a stable value in the range 1–8,
 * then maps it to a congestion tier.
 */
export function genYearCongestion(year: number): CongestionInfo {
  const count = (Math.abs(year) % 8) + 1; // 1–8, stable per year

  if (count <= 2) {
    return { level: "CLEAR", count, icon: "◉", label: "Clear — no registered jumpers in this era" };
  }
  if (count <= 4) {
    return { level: "LIGHT", count, icon: "◈", label: `Light — ${count} travellers detected` };
  }
  if (count <= 6) {
    return { level: "MODERATE", count, icon: "◆", label: `Moderate — ${count} travellers, congestion forming` };
  }
  return { level: "HEAVY", count, icon: "▲", label: `Heavy — ${count} travellers, elevated paradox risk` };
}

