import * as React from "react";
import type { Heist } from "@/types/heist";
import styles from "./HeistCard.module.css";

export type HeistCardProps = {
  heist: Heist;
};

const STATUS_LABELS: Record<Heist["status"], string> = {
  planning: "Planning",
  active: "Active",
  completed: "Completed",
  failed: "Failed",
  aborted: "Aborted",
};

const DIFFICULTY_ICONS: Record<Heist["difficulty"], string> = {
  easy: "◆",
  medium: "◆◆",
  hard: "◆◆◆",
  expert: "◆◆◆◆",
  legendary: "◆◆◆◆◆",
};

const CATEGORY_ICONS: Record<Heist["category"], string> = {
  jewel: "💎",
  bank: "🏦",
  art: "🖼️",
  tech: "💻",
  casino: "🎰",
  government: "🏛️",
};

function formatCurrency(value: number): string {
  if (value < 0) return "N/A";
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`;
  return `$${value}`;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "TBD";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function HeistCard({ heist }: HeistCardProps): React.JSX.Element {
  const clampedRisk = Math.min(100, Math.max(0, heist.riskLevel));
  const riskTier =
    clampedRisk >= 75 ? "high" : clampedRisk >= 50 ? "medium" : "low";

  return (
    <article
      className={styles.card}
      data-status={heist.status}
      aria-labelledby={`heist-name-${heist.id}`}
    >
      <div className={styles.header}>
        <span className={styles.categoryIcon} aria-hidden="true">
          {CATEGORY_ICONS[heist.category]}
        </span>
        <span className="sr-only">Category: {heist.category}</span>
        <div className={styles.titleBlock}>
          <h3 className={styles.name} id={`heist-name-${heist.id}`}>
            {heist.name}
          </h3>
          <span className={styles.location}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {heist.location}
          </span>
        </div>
        <span className={`${styles.badge} ${styles[`badge_${heist.status}`]}`}>
          {STATUS_LABELS[heist.status]}
        </span>
      </div>

      <p className={styles.description}>{heist.description}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Target Value</span>
          <span className={styles.statValue}>{formatCurrency(heist.targetValue)}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Crew Size</span>
          <span className={styles.statValue}>{heist.crewSize} agents</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Duration</span>
          <span className={styles.statValue}>{heist.duration}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Scheduled</span>
          <span className={styles.statValue}>{formatDate(heist.scheduledAt)}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.difficulty}>
          <span className={styles.footerLabel}>Difficulty</span>
          <span className={styles.difficultyDots} aria-hidden="true">
            {DIFFICULTY_ICONS[heist.difficulty]}
          </span>
          <span className={styles.difficultyName}>{heist.difficulty}</span>
        </div>

        <div className={styles.riskBlock}>
          <span className={styles.footerLabel}>Risk</span>
          <div
            className={styles.riskBar}
            role="meter"
            aria-label="Risk level"
            aria-valuenow={clampedRisk}
            aria-valuemin={0}
            aria-valuemax={100}
            data-risk={riskTier}
            style={{ "--risk-width": `${clampedRisk}%` } as React.CSSProperties}
          >
            <div className={styles.riskFill} data-risk={riskTier} />
          </div>
          <span className={styles.riskValue} data-risk={riskTier} aria-hidden="true">
            {clampedRisk}%
          </span>
          <span className="sr-only">{riskTier} risk — {clampedRisk}%</span>
        </div>
      </div>
    </article>
  );
}
