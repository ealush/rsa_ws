"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import styles from "./ChronoPortal.module.css";
import StepOneMission from "./chrono-portal/StepOneMission";
import StepTwoCalibration from "./chrono-portal/StepTwoCalibration";
import StepThreeSuccess from "./chrono-portal/StepThreeSuccess";
import { INITIAL_CHRONO_FORM, ChronoStep } from "./chrono-portal/types";
import { ChronosSchemaType } from "../validation/chronoVestSuite";
import { initiateJump } from "../actions/jumpAction";

export default function ChronoPortal() {
  const [currentStep, setCurrentStep] = useState<ChronoStep>(1);
  const [formData, setFormData] =
    useState<ChronosSchemaType>(INITIAL_CHRONO_FORM);
  const [isSubmitting, startSubmitTransition] = useTransition();

  async function updateField(
    key: keyof ChronosSchemaType,
    value: string | boolean,
  ) {
    const nextState = {
      ...formData,
      [key]: value,
    };

    setFormData({ ...nextState });
  }

  async function handleInitiateJump() {
    startSubmitTransition(async function () {
      await initiateJump({
        travelerName: formData.travelerName,
        mission: formData.mission,
        birthYear: Number(formData.birthYear),
        destinationYear: Number(formData.destinationYear),
        plutoniumCores: Number(formData.plutoniumCores),
        suppressParadoxCheck: Boolean(formData.suppressParadoxCheck),
      });

      // if (result) {
      //   SuiteSerializer.resume(chronoVestSuite, result);
      //   setFormData({ ...formData });
      // }
    });
  }

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
            onNext={() => {
              setCurrentStep(2);
            }}
          />
        )}

        {currentStep === 2 && (
          <StepTwoCalibration
            formData={formData}
            isCheckingTimeline={false}
            isSubmitting={isSubmitting}
            onChange={updateField}
            onBack={() => {
              setCurrentStep(1);
            }}
            onSubmit={handleInitiateJump}
          />
        )}

        {currentStep === 3 && <StepThreeSuccess onReset={handleReset} />}
      </section>
    </main>
  );

  function handleReset() {
    setFormData(INITIAL_CHRONO_FORM);
    setCurrentStep(1);
  }
}
