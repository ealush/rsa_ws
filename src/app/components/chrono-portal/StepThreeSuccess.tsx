import Link from "next/link";
import styles from "../ChronoPortal.module.css";

type StepThreeSuccessProps = {
  onReset: () => void;
};

export default function StepThreeSuccess({ onReset }: StepThreeSuccessProps) {
  return (
    <>
      <h1>Jump Successful. See you yesterday.</h1>
      <p className={styles.successCopy}>
        Your temporal itinerary has been stamped by the Bureau of Chronological
        Transit.
      </p>
      <div className={styles.actions}>
        <button type="button" className={styles.secondaryBtn} onClick={onReset}>
          Book Another Jump
        </button>
        <Link href="/jumps" className={styles.primaryBtn}>
          View Jump Registry →
        </Link>
      </div>
    </>
  );
}
