"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./ChronoPortal.module.css";
import { calculateQuantumFlux, checkTimelineDatabase } from "@/app/utils";
import StepOneMission from "./chrono-portal/StepOneMission";
import StepTwoCalibration from "./chrono-portal/StepTwoCalibration";
import StepThreeSuccess from "./chrono-portal/StepThreeSuccess";
import {
  ChronoFormData,
  ChronoFormErrors,
  INITIAL_CHRONO_FORM,
  ChronoStep,
} from "./chrono-portal/types";

export default function ChronoPortal() {
  const [currentStep, setCurrentStep] = useState<ChronoStep>(1);
  const [formData, setFormData] = useState<ChronoFormData>(INITIAL_CHRONO_FORM);
  const [errors, setErrors] = useState<ChronoFormErrors>({});
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

  const updateField = (key: keyof ChronoFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleInitiateJump = async () => {
    if (isCheckingTimeline || errors.destinationYear) {
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
    setFormData(INITIAL_CHRONO_FORM);
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
          <StepOneMission
            formData={formData}
            errors={errors}
            onChange={updateField}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepTwoCalibration
            formData={formData}
            errors={errors}
            flux={flux}
            isSubmitting={isSubmitting}
            isCheckingTimeline={isCheckingTimeline}
            onChange={updateField}
            onBack={() => setCurrentStep(1)}
            onSubmit={handleInitiateJump}
          />
        )}

        {currentStep === 3 && <StepThreeSuccess onReset={handleReset} />}
      </section>
    </main>
  );
}
