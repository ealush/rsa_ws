"use server";

import { setTimeout } from "node:timers/promises";
import { genYearCongestion } from "../utils";

export async function getCongestion(year: number) {
  await setTimeout(1000);

  return genYearCongestion(year);
}
