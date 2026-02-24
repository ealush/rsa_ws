import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { prisma } from "@/app/db/prismaClient";
import { genYearCongestion } from "@/app/utils";
import styles from "../jumps.module.css";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const jump = await prisma.jumpRequest.findUnique({ where: { id } });
  if (!jump) return { title: "Jump Not Found · ChronoTrips™" };
  return {
    title: `${jump.travelerName} → ${jump.destinationYear} · ChronoTrips™`,
    description: `Temporal transit request filed by ${jump.travelerName}.`,
  };
}

export default async function JumpDetailPage({ params }: Props) {
  const { id } = await params;
  const jump = await prisma.jumpRequest.findUnique({ where: { id } });

  if (!jump) notFound();

  const isParadox = jump.birthYear >= jump.destinationYear;
  const congestion = genYearCongestion(jump.destinationYear);

  const filed = new Date(jump.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <main className={styles.viewport}>
      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          ChronoTrips™ Portal
        </Link>
        <Link href="/jumps" className={styles.navLink}>
          ← All Jumps
        </Link>
      </nav>

      <article className={styles.detail}>
        <header>
          <p className={styles.eyebrow}>
            Jump #{jump.id.slice(-8).toUpperCase()} · Filed {filed}
          </p>
          <h1>{jump.travelerName}</h1>
        </header>

        {/* Paradox warning */}
        {isParadox && (
          <div className={styles.paradoxAlert}>
            ⚠ TIME PARADOX DETECTED — Destination year ({jump.destinationYear})
            predates or coincides with traveler birth year ({jump.birthYear}).
            Bureau of Chronological Transit is reviewing this filing.
          </div>
        )}

        <div className={styles.fields}>
          <div className={styles.field}>
            <span className={styles.fieldLabel}>Destination Year</span>
            <span className={styles.fieldValueAccent}>
              {jump.destinationYear}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Year of Birth</span>
            <span className={styles.fieldValue}>{jump.birthYear}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Plutonium Cores (GW)</span>
            <span className={styles.fieldValue}>{jump.plutoniumCores}</span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Mission Objective</span>
            <p className={styles.missionBlock}>{jump.mission}</p>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>Paradox Status</span>
            <span
              className={`${styles.badge} ${
                isParadox ? styles.badgeParadox : styles.badgeSafe
              }`}
            >
              {isParadox ? "⚠ PARADOX FLAGGED" : "✓ TIMELINE SAFE"}
            </span>
          </div>

          <div className={styles.field}>
            <span className={styles.fieldLabel}>
              Temporal Traffic · {jump.destinationYear}
            </span>
            <span
              className={`${styles.congestion} ${styles[`congestion${congestion.level}`]}`}
            >
              {congestion.icon} {congestion.label}
            </span>
          </div>
        </div>

        <Link href="/jumps" className={styles.backLink}>
          ← Back to Registry
        </Link>
      </article>
    </main>
  );
}
