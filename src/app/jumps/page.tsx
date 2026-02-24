import Link from "next/link";
import type { Metadata } from "next";
import { prisma } from "@/app/db/prismaClient";
import styles from "./jumps.module.css";

export const metadata: Metadata = {
  title: "All Jumps · ChronoTrips™",
  description: "Registry of all approved temporal transit requests.",
};

export const dynamic = "force-dynamic";

export default async function JumpsPage() {
  const jumps = await prisma.jumpRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className={styles.viewport}>

      {/* ── Nav ── */}
      <nav className={styles.nav}>
        <Link href="/" className={styles.navBrand}>
          ChronoTrips™ Portal
        </Link>
        <Link href="/" className={styles.navLink}>
          + New Jump
        </Link>
      </nav>

      {/* ── Heading ── */}
      <header className={styles.heading}>
        <p className={styles.eyebrow}>Temporal Authority · Jump Registry</p>
        <h1>Approved Time Jumps</h1>
      </header>

      {/* ── Grid ── */}
      <section className={styles.grid}>
        {jumps.length === 0 && (
          <p className={styles.empty}>
            No jumps registered yet. The timeline is wide open.
          </p>
        )}

        {jumps.map((jump) => {
          const isParadox = jump.birthYear >= jump.destinationYear;
          const date = new Date(jump.createdAt).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <Link
              key={jump.id}
              href={`/jumps/${jump.id}`}
              className={styles.card}
            >
              <span className={styles.cardId}>#{jump.id.slice(-8).toUpperCase()}</span>
              <span className={styles.cardName}>{jump.travelerName}</span>
              <span className={styles.cardYear}>→ {jump.destinationYear}</span>
              <p className={styles.cardMission}>{jump.mission}</p>
              <div className={styles.cardFooter}>
                <span
                  className={`${styles.badge} ${
                    isParadox ? styles.badgeParadox : styles.badgeSafe
                  }`}
                >
                  {isParadox ? "⚠ PARADOX" : "✓ SAFE"}
                </span>
                <span className={styles.cardDate}>{date}</span>
              </div>
            </Link>
          );
        })}
      </section>

    </main>
  );
}
