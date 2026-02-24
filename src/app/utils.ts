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
