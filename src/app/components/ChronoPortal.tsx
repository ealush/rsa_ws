"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ChronoPortal.module.css";
import { calculateQuantumFlux, checkTimelineDatabase } from "@/app/utils";

type FormData = {
  travelerName: string;
  mission: string;
  destinationYear: string;
  plutoniumCores: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  travelerName: "",
  mission: "",
  destinationYear: "",
  plutoniumCores: "",
};

export default function ChronoPortal() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCheckingTimeline, setIsCheckingTimeline] = useState(false);

  const flux = useMemo(() => {
    const year = Number(formData.destinationYear);
    if (!Number.isFinite(year) || formData.destinationYear === "") {
      return 0;
    }
    return calculateQuantumFlux(year);
  }, [formData.destinationYear]);

  useEffect(() => {
    if (currentStep !== 2) {
      return;
    }

    const year = Number(formData.destinationYear);
    if (!Number.isFinite(year) || formData.destinationYear === "") {
      setIsCheckingTimeline(false);
      return;
    }

    const controller = new AbortController();
    setIsCheckingTimeline(true);

    checkTimelineDatabase(formData.travelerName, year, controller.signal)
      .then((hasParadox) => {
        setErrors((prev) => ({
          ...prev,
          destinationYear: hasParadox
            ? "Paradox alert: this year intersects with your identity trail."
            : "",
        }));
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }
        setErrors((prev) => ({
          ...prev,
          destinationYear: "Timeline scanner temporarily unavailable.",
        }));
      })
      .finally(() => {
        setIsCheckingTimeline(false);
      });

    return () => controller.abort();
  }, [currentStep, formData.destinationYear, formData.travelerName]);

  const updateField = (key: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validateStep1 = () => {
    const nextErrors: FormErrors = {};
    if (!formData.travelerName.trim()) {
      nextErrors.travelerName = "Traveler designation is required.";
    }
    if (!formData.mission.trim()) {
      nextErrors.mission = "Mission objective cannot be blank.";
    }
    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const validateStep2 = () => {
    const nextErrors: FormErrors = {};
    const destinationYear = Number(formData.destinationYear);
    const plutoniumCores = Number(formData.plutoniumCores);

    if (formData.destinationYear === "" || !Number.isFinite(destinationYear)) {
      nextErrors.destinationYear = "A valid target year is required.";
    }
    if (formData.plutoniumCores === "" || !Number.isFinite(plutoniumCores)) {
      nextErrors.plutoniumCores = "Specify plutonium cores before departure.";
    } else if (plutoniumCores <= 0) {
      nextErrors.plutoniumCores = "Plutonium cores must exceed zero.";
    }

    setErrors((prev) => ({ ...prev, ...nextErrors }));
    return Object.keys(nextErrors).length === 0;
  };

  const handleInitiateJump = async () => {
    if (isCheckingTimeline) {
      return;
    }

    const step2IsValid = validateStep2();
    if (!step2IsValid) {
      return;
    }

    const hasTimelineError = Boolean(errors.destinationYear);
    if (hasTimelineError) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/jump", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          destinationYear: Number(formData.destinationYear),
          plutoniumCores: Number(formData.plutoniumCores),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        const apiErrors = result?.errors ?? {};
        setErrors((prev) => ({
          ...prev,
          destinationYear: apiErrors.destinationYear?.[0] ?? prev.destinationYear,
        }));
        setCurrentStep(2);
        return;
      }

      setCurrentStep(3);
    } catch {
      setErrors((prev) => ({
        ...prev,
        destinationYear:
          prev.destinationYear ||
          "Network instability detected. Please retry INITIATE JUMP.",
      }));
      setCurrentStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setErrors({});
    setCurrentStep(1);
    setIsSubmitting(false);
    setIsCheckingTimeline(false);
  };

  return (
    <main className={styles.viewport}>
      <section className={styles.card}>
        <p className={styles.eyebrow}>
          ChronoTrips™ Portal · Temporal Authority Form JT-88
        </p>

        {currentStep === 1 && (
          <>
            <h1>Step 1: Identify &amp; Intent</h1>
            <label className={styles.fieldLabel}>
              Primary Traveler Designation
              <input
                type="text"
                value={formData.travelerName}
                placeholder="e.g., Emmett Brown"
                onChange={(event) => updateField("travelerName", event.target.value)}
              />
            </label>
            <p className={styles.errorText}>{errors.travelerName || " "}</p>

            <label className={styles.fieldLabel}>
              Mission Objective
              <textarea
                rows={4}
                value={formData.mission}
                placeholder="State your business in the past/future..."
                onChange={(event) => updateField("mission", event.target.value)}
              />
            </label>
            <p className={styles.errorText}>{errors.mission || " "}</p>

            <button
              type="button"
              className={styles.primaryBtn}
              onClick={() => {
                if (validateStep1()) {
                  setCurrentStep(2);
                }
              }}
            >
              Next: Calibrate Coordinates →
            </button>
          </>
        )}

        {currentStep === 2 && (
          <>
            <h1>Step 2: Spacetime Calibration</h1>
            <label className={styles.fieldLabel}>
              <span className={styles.inlineLabel}>
                Target Year
                {isCheckingTimeline ? (
                  <span className={styles.statusIndicator}>Checking timeline...</span>
                ) : (
                  <span className={styles.statusIndicator}>Timeline synced</span>
                )}
              </span>
              <input
                type="number"
                value={formData.destinationYear}
                placeholder="YYYY"
                onChange={(event) =>
                  updateField("destinationYear", event.target.value)
                }
              />
            </label>
            <p className={styles.errorText}>{errors.destinationYear || " "}</p>

            <label className={styles.fieldLabel}>
              Plutonium Cores (Gigawatts)
              <input
                type="number"
                value={formData.plutoniumCores}
                placeholder="0"
                onChange={(event) =>
                  updateField("plutoniumCores", event.target.value)
                }
              />
            </label>
            <p className={styles.errorText}>{errors.plutoniumCores || " "}</p>

            <p className={styles.fluxText}>Estimated Quantum Flux Load: {flux} GW</p>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.secondaryBtn}
                onClick={() => setCurrentStep(1)}
              >
                ← Back
              </button>
              <button
                type="button"
                className={styles.primaryBtn}
                disabled={isSubmitting || isCheckingTimeline}
                onClick={handleInitiateJump}
              >
                {isSubmitting ? "⏳ Initiating jump..." : "INITIATE JUMP"}
              </button>
            </div>
          </>
        )}

        {currentStep === 3 && (
          <>
            <h1>Jump Successful. See you yesterday.</h1>
            <p className={styles.successCopy}>
              Your temporal itinerary has been stamped by the Bureau of
              Chronological Transit.
            </p>
            <button type="button" className={styles.primaryBtn} onClick={handleReset}>
              Book Another Jump
            </button>
          </>
        )}
      </section>
    </main>
  );
}
