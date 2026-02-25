import { chronoVestSuite } from "@/app/validation/chronoVestSuite";
import styles from "../ChronoPortal.module.css";
import { ReactNode } from "react";
import classnames from "vest/classnames";

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
  const cn = classnames(chronoVestSuite.get(), {
    warning: styles.warningText,
    invalid: styles.errorText,
  });
  return (
    <>
      <label className={styles.fieldLabel}>
        {label}
        <span className={styles.inputWrapper}>{input}</span>
      </label>
      <p className={cn(name)}>{chronoVestSuite.getMessage(name)}</p>
    </>
  );
}
