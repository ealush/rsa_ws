import {
  ChronosSchemaType,
  chronoVestSuite,
} from "@/app/validation/chronoVestSuite";
import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";
import { ChronoFormErrors } from "./types";

type StepOneMissionProps = {
  formData: ChronosSchemaType;
  onChange: (key: keyof ChronosSchemaType, value: string | boolean) => void;
  onNext: () => void;
};

export default function StepOneMission({
  formData,
  onChange,
  onNext,
}: StepOneMissionProps) {
  return (
    <>
      <h1>Step 1: Identify &amp; Intent</h1>

      <FieldControl
        label="Primary Traveler Designation"
        input={
          <input
            type="text"
            value={formData.travelerName}
            placeholder="e.g., Emmett Brown"
            onChange={function (event) { onChange("travelerName", event.target.value); }}
          />
        }
        name="travelerName"
      />

      <FieldControl
        label="Year of Birth"
        input={
          <input
            type="number"
            value={formData.birthYear}
            placeholder="YYYY"
            onChange={function (event) { onChange("birthYear", event.target.value); }}
          />
        }
        name="birthYear"
      />

      <FieldControl
        label="Mission Objective"
        input={
          <textarea
            rows={4}
            value={formData.mission}
            placeholder="State your business in the past/future..."
            onChange={function (event) { onChange("mission", event.target.value); }}
          />
        }
        name="mission"
      />

      <button
        type="button"
        className={styles.primaryBtn}
        onClick={onNext}
        disabled={!chronoVestSuite.isValidByGroup("mission")}
      >
        Next: Calibrate Coordinates →
      </button>
    </>
  );
}
