import { ChronosSchemaType } from "@/app/validation/chronoVestSuite";

export type ChronoStep = 1 | 2 | 3;

export type ChronoFormErrors = Partial<Record<keyof ChronosSchemaType, string>>;

export const INITIAL_CHRONO_FORM: ChronosSchemaType = {
  travelerName: "",
  mission: "",
  birthYear: "",
  destinationYear: "",
  plutoniumCores: "",
  suppressParadoxCheck: false,
};
