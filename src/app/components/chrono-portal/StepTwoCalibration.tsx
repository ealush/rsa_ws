import {
  ChronosSchemaType,
  chronoVestSuite,
} from "@/app/validation/chronoVestSuite";
import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";

type StepTwoCalibrationProps = {
  formData: ChronosSchemaType;
  flux: number;
  isSubmitting: boolean;
  isCheckingTimeline: boolean;
  onChange: (key: keyof ChronosSchemaType, value: string) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function StepTwoCalibration({
  formData,
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
            {chronoVestSuite.isPending("destinationYear") ? (
              <span className={styles.statusIndicator}>
                <span className={styles.pendingIndicator}>
                  <span className={styles.spinnerRing} />
                  <span className={styles.pendingLabel}>scanning…</span>
                </span>
              </span>
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
            onChange={(event) =>
              onChange("destinationYear", event.target.value)
            }
          />
        }
        name="destinationYear"
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
        name="plutoniumCores"
      />

      <p className={styles.fluxText}>Estimated Quantum Flux Load: {flux} GW</p>

      <div className={styles.actions}>
        <button type="button" className={styles.secondaryBtn} onClick={onBack}>
          ← Back
        </button>
        <button
          type="button"
          className={styles.primaryBtn}
          disabled={
            isSubmitting || isCheckingTimeline || !chronoVestSuite.isValid()
          }
          onClick={onSubmit}
        >
          {isSubmitting ? "⏳ Initiating jump..." : "INITIATE JUMP"}
        </button>
      </div>
    </>
  );
}
