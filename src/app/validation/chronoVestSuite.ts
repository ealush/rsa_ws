import { create, enforce, group, test, useWarn, warn, skipWhen, include, omitWhen } from "vest";
import { INITIAL_CHRONO_FORM } from "../components/chrono-portal/types";
import { getCongestion } from "../actions/congestionAction";
import { memo } from "vest/memo";
import debounce from "vest/exports/debounce";

const ChronoSchema = enforce.shape({
  travelerName: enforce.isString(),
  mission: enforce.isString(),
  birthYear: enforce.isNumeric().toNumber(),
  destinationYear: enforce.isNumeric().toNumber(),
  plutoniumCores: enforce.isNumeric(),
  suppressParadoxCheck: enforce.optional(enforce.isBoolean()),
});

export type ChronosSchemaType = typeof ChronoSchema.infer;

export const chronoVestSuite = create((data = INITIAL_CHRONO_FORM) => {
  include("destinationYear").when(
    "suppressParadoxCheck",
  );


  group("mission", () => {
    test("travelerName", "Traveler name is required", () => {
      enforce(data.travelerName).isNotBlank();
    });

    test(
      "travelerName",
      "Traveler name must be longer than 3 characters",
      () => {
        enforce(data.travelerName).longerThan(3);
      },
    );

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
  });

  group("calibration", () => {
    test("destinationYear", "Destination year is required", () => {
      enforce(data.destinationYear).isNotBlank();
    });

    test("destinationYear", "Destination year must be a number", () => {
      enforce(data.destinationYear).isNumeric();
    });

    omitWhen(Boolean(data.suppressParadoxCheck), () => {
      test("destinationYear", "Possible Time Paradox Detected", () => {

        enforce(data.destinationYear).greaterThan(Number(data.birthYear));
      });

      test("destinationYear", "Warning: Avoid meeting yourself!", () => {
        warn();

        enforce(data.destinationYear).isNotBetween(
          Number(data.birthYear),
          new Date().getFullYear(),
        );
      });
    });

    memo(() => {
      test(
        "destinationYear",
        debounce(async () => {
          const warn = useWarn();
          const congestion = await getCongestion(Number(data.destinationYear));

          const message = `${congestion.level}: ${congestion.icon} ${congestion.label}`;

          enforce(congestion.level).message(message).notEquals("HEAVY");

          warn();

          enforce(congestion.level)
            .message(`WARNING: ${message}`)
            .notMatches(/MODERATE|LIGHT/);
        }, 1000),
      );
    }, [data.destinationYear]);

    test("plutoniumCores", "Plutonium cores must be a number", () => {
      enforce(data.plutoniumCores).isNumeric();
    });

    test("plutoniumCores", () => {
      warn();
      enforce(data.plutoniumCores)
        .message("⚠️ Moderate use of cores. Use caution")
        .isNotBetween(3, 6)
        .message("🚨 Heavy use of cores. Use extreme caution")
        .lessThan(6);
    });
  });
}, ChronoSchema);
