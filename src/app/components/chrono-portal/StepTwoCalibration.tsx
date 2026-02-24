import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";
import { ChronoFormData, ChronoFormErrors } from "./types";

type StepTwoCalibrationProps = {
  formData: ChronoFormData;
  errors: ChronoFormErrors;
  flux: number;
  isSubmitting: boolean;
  isCheckingTimeline: boolean;
  onChange: (key: keyof ChronoFormData, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function StepTwoCalibration({
  formData,
  errors,
  flux,
  isSubmitting,
  isCheckingTimeline,
  onChange,
  onBack,
  onSubmit,
}: StepTwoCalibrationProps) {
  return (
    <>
      <h1>Step 2: Spacetime Calibration</h1>

      <FieldControl
        label={
          <span className={styles.inlineLabel}>
            Target Year
            {isCheckingTimeline ? (
              <span className={styles.statusIndicator}>Checking timeline...</span>
            ) : (
              <span className={styles.statusIndicator}>Timeline synced</span>
            )}
          </span>
        }
        input={
          <input
            type="number"
            value={formData.destinationYear}
            placeholder="YYYY"
            onChange={(event) => onChange("destinationYear", event.target.value)}
          />
        }
        error={errors.destinationYear}
      />

      <FieldControl
        label="Plutonium Cores (Gigawatts)"
        input={
          <input
            type="number"
            value={formData.plutoniumCores}
            placeholder="0"
            onChange={(event) => onChange("plutoniumCores", event.target.value)}
          />
        }
        error={errors.plutoniumCores}
      />

      <p className={styles.fluxText}>Estimated Quantum Flux Load: {flux} GW</p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryBtn} onClick={onBack}>
          ← Back
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          disabled={isSubmitting || isCheckingTimeline}
          onClick={onSubmit}
        >
          {isSubmitting ? "⏳ Initiating jump..." : "INITIATE JUMP"}
        </button>
      </div>
    </>
  );
}
