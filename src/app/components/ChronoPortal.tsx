"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import styles from "./ChronoPortal.module.css";
import { calculateQuantumFlux } from "@/app/utils";
import StepOneMission from "./chrono-portal/StepOneMission";
import StepTwoCalibration from "./chrono-portal/StepTwoCalibration";
import StepThreeSuccess from "./chrono-portal/StepThreeSuccess";
import { INITIAL_CHRONO_FORM, ChronoStep } from "./chrono-portal/types";
import {
  ChronosSchemaType,
  chronoVestSuite,
} from "../validation/chronoVestSuite";

export default function ChronoPortal() {
  const [currentStep, setCurrentStep] = useState<ChronoStep>(1);
  const [formData, setFormData] =
    useState<ChronosSchemaType>(INITIAL_CHRONO_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const flux = useMemo(() => {
    const year = Number(formData.destinationYear);
    if (!Number.isFinite(year) || formData.destinationYear === "") {
      return 0;
    }
    return calculateQuantumFlux(year);
  }, [formData.destinationYear]);

  const updateField = async (key: keyof ChronosSchemaType, value: string) => {
    const nextState = {
      ...formData,
      [key]: value,
    };

    chronoVestSuite
      .only(key)
      .afterEach(() => {
        setFormData({ ...nextState });
        console.log(chronoVestSuite.get());
      })
      .run(nextState);
  };

  const handleInitiateJump = async () => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/jump", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          birthYear: Number(formData.birthYear),
          destinationYear: Number(formData.destinationYear),
          plutoniumCores: Number(formData.plutoniumCores),
        }),
      });

      if (response.ok) {
        setCurrentStep(3);
      } else {
        setCurrentStep(2);
      }
    } catch {
      setCurrentStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_CHRONO_FORM);
    setCurrentStep(1);
    setIsSubmitting(false);
  };

  return (
    <main className={styles.viewport}>
      <section className={styles.card}>
        <div className={styles.cardNav}>
          <p className={styles.eyebrow}>
            ChronoTrips™ Portal · Temporal Authority Form JT-88
          </p>
          <Link href="/jumps" className={styles.registryLink}>
            Jump Registry →
          </Link>
        </div>

        {currentStep === 1 && (
          <StepOneMission
            formData={formData}
            onChange={updateField}
            onNext={() => setCurrentStep(2)}
          />
        )}

        {currentStep === 2 && (
          <StepTwoCalibration
            formData={formData}
            flux={flux}
            isSubmitting={isSubmitting}
            isCheckingTimeline={false}
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
