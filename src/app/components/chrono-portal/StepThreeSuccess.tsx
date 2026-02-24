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
      <button type="button" className={styles.primaryBtn} onClick={onReset}>
        Book Another Jump
      </button>
    </>
  );
}
