export type HeistStatus = "planning" | "active" | "completed" | "failed" | "aborted";
export type HeistDifficulty = "easy" | "medium" | "hard" | "expert" | "legendary";
export type HeistCategory = "jewel" | "bank" | "art" | "tech" | "casino" | "government";

export type Heist = {
  id: string;
  name: string;
  description: string;
  status: HeistStatus;
  difficulty: HeistDifficulty;
  location: string;
  targetValue: number;
  crewSize: number;
  /** Human-readable duration string, e.g. "72h", "3 days" */
  duration: string;
  /** 0–100 integer representing risk percentage */
  riskLevel: number;
  category: HeistCategory;
  /** ISO 8601 date-time string, e.g. "2026-04-15T03:00:00Z" */
  scheduledAt: string;
};
