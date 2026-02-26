"use server";

import { setTimeout } from "node:timers/promises";
import { genYearCongestion } from "../utils";

export async function getCongestion(year: number | string) {
  const yearNumber = Number(year);
  const distance = Math.abs(yearNumber - new Date().getFullYear());
  const ratio = Math.min(distance / 1000, 1);
  const delay = 500 + ratio * 6000;

  await setTimeout(delay);

  return genYearCongestion(yearNumber);
}
