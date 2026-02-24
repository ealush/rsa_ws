import styles from "../ChronoPortal.module.css";
import { ReactNode } from "react";

type FieldControlProps = {
  label: ReactNode;
  input: ReactNode;
  error?: string;
};

export default function FieldControl({ label, input, error }: FieldControlProps) {
  return (
    <>
      <label className={styles.fieldLabel}>
        {label}
        {input}
      </label>
      <p className={styles.errorText}>{error || " "}</p>
    </>
  );
}
