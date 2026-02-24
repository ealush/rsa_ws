import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";
import { ChronoFormData, ChronoFormErrors } from "./types";

type StepOneMissionProps = {
  formData: ChronoFormData;
  errors: ChronoFormErrors;
  onChange: (key: keyof ChronoFormData, value: string) => void;
  onNext: () => void;
};

export default function StepOneMission({
  formData,
  errors,
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
            onChange={(event) => onChange("travelerName", event.target.value)}
          />
        }
        error={errors.travelerName}
      />

      <FieldControl
        label="Mission Objective"
        input={
          <textarea
            rows={4}
            value={formData.mission}
            placeholder="State your business in the past/future..."
            onChange={(event) => onChange("mission", event.target.value)}
          />
        }
        error={errors.mission}
      />

      <button type="button" className={styles.primaryBtn} onClick={onNext}>
        Next: Calibrate Coordinates →
      </button>
    </>
  );
}
