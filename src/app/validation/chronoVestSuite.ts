import { create } from "vest";
import { ChronoFormData } from "@/app/components/chrono-portal/types";

/**
 * Vest v6-ready scaffold.
 *
 * TODO:
 * - Add tests for travelerName / mission / destinationYear / plutoniumCores.
 * - Run using `await chronoVestSuite.run(formData)` from handlers.
 * - Read state via `chronoVestSuite.get()`.
 */
export const chronoVestSuite = create((data: Partial<ChronoFormData> = {}) => {
  void data;
  // Intentionally blank for now: validation implementation will be added separately.
});
