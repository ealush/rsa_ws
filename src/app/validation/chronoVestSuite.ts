import { create, enforce, test, warn } from "vest";
import { INITIAL_CHRONO_FORM } from "../components/chrono-portal/types";
import { getCongestion } from "../actions/congestionAction";

const ChronoSchema = enforce.shape({
  travelerName: enforce.isString(),
  mission: enforce.isString(),
  birthYear: enforce.isNumeric().toNumber(),
  destinationYear: enforce.isNumeric().toNumber(),
  plutoniumCores: enforce.isNumeric(),
});

export type ChronosSchemaType = typeof ChronoSchema.infer;

export const chronoVestSuite = create((data = INITIAL_CHRONO_FORM) => {
  test("travelerName", "Traveler name is required", () => {
    enforce(data.travelerName).isNotBlank();
  });

  test("travelerName", "Traveler name must be longer than 3 characters", () => {
    enforce(data.travelerName).longerThan(3);
  });

  test("mission", "Mission is required", () => {
    enforce(data.mission).isNotBlank();
  });

  test("mission", "Mission must be longer than 3 words", () => {
    enforce(data.mission).matches(/\b\w{3,}\b/g);
  });

  test("birthYear", "Birth year is required", () => {
    enforce(data.birthYear).isNotBlank();
  });

  test("birthYear", "Birth year must be a number", () => {
    enforce(data.birthYear).isNumeric();
  });

  test("destinationYear", "Destination year is required", () => {
    enforce(data.destinationYear).isNotBlank();
  });

  test("destinationYear", "Destination year must be a number", () => {
    enforce(data.destinationYear).isNumeric();
  });

  test("destinationYear", "Warning: Avoid meeting yourself!", () => {
    warn();

    enforce(data.destinationYear).isNotBetween(
      data.birthYear,
      new Date().getFullYear(),
    );
  });

  test(
    "destinationYear",
    "Time Paradox Detected! Manual Approval will be required",
    () => {
      warn();

      enforce(data.destinationYear).greaterThan(Number(data.birthYear));
    },
  );

  test("destinationYear", async () => {
    const congestion = await getCongestion(Number(data.destinationYear));

    enforce(congestion.level)
      .message(`${congestion.level}: ${congestion.icon} ${congestion.label}`)
      .notEquals("HEAVY")
      .notEquals("MODERATE");
  });

  test("plutoniumCores", "Plutonium cores must be a number", () => {
    enforce(data.plutoniumCores).isNumeric();
  });
}, ChronoSchema);
