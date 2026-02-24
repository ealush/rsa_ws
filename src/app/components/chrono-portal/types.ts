export type ChronoStep = 1 | 2 | 3;

export type ChronoFormData = {
  travelerName: string;
  mission: string;
  destinationYear: string;
  plutoniumCores: string;
};

export type ChronoFormErrors = Partial<Record<keyof ChronoFormData, string>>;

export const INITIAL_CHRONO_FORM: ChronoFormData = {
  travelerName: "",
  mission: "",
  destinationYear: "",
  plutoniumCores: "",
};
