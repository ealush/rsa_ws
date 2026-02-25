import { useMemo } from "react";
import {
  ChronosSchemaType,
  chronoVestSuite,
} from "@/app/validation/chronoVestSuite";
import { calculateQuantumFlux } from "@/app/utils";
import styles from "../ChronoPortal.module.css";
import FieldControl from "./FieldControl";

type StepTwoCalibrationProps = {
  formData: ChronosSchemaType;
  isCheckingTimeline: boolean;
  isSubmitting: boolean;
  onChange: (key: keyof ChronosSchemaType, value: string | boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
};

export default function StepTwoCalibration({
  formData,
  isCheckingTimeline,
  isSubmitting,
  onChange,
  onBack,
  onSubmit,
}: StepTwoCalibrationProps) {
  const flux = useMemo(
    function () {
      const year = Number(formData.destinationYear);
      if (!Number.isFinite(year) || formData.destinationYear === "") {
        return 0;
      }
      return calculateQuantumFlux(year);
    },
    [formData.destinationYear],
  );

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
            onChange={function (event) {
              onChange("destinationYear", event.target.value);
            }}
          />
        }
        name="destinationYear"
      />

      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          checked={!!formData.suppressParadoxCheck}
          onChange={function (event) {
            onChange("suppressParadoxCheck", event.target.checked);
          }}
        />
        Suppress Time Paradox Check
      </label>

      <FieldControl
        label="Plutonium Cores (Gigawatts)"
        input={
          <input
            type="number"
            value={formData.plutoniumCores}
            placeholder="0"
            onChange={function (event) {
              onChange("plutoniumCores", event.target.value);
            }}
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
          disabled={isCheckingTimeline || isSubmitting}
          onClick={onSubmit}
        >
          {isSubmitting ? (
            <span className={styles.pendingIndicator}>
              <span className={styles.spinnerRing} />
              <span className={styles.pendingLabel}>Jumping…</span>
            </span>
          ) : (
            "INITIATE JUMP"
          )}
        </button>
      </div>
    </>
  );
}
