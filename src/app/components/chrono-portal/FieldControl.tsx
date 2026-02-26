import styles from "../ChronoPortal.module.css";
import { ReactNode } from "react";

type FieldControlProps = {
  label: ReactNode;
  input: ReactNode;
  name: string;
};

export default function FieldControl({
  label,
  input,
  name,
}: FieldControlProps) {
  return (
    <>
      <label className={styles.fieldLabel}>
        {label}
        <span className={styles.inputWrapper}>{input}</span>
      </label>
      <p className={`${styles.fieldMessage}`}></p>
    </>
  );
}

// styles.warningText
// styles.errorText
