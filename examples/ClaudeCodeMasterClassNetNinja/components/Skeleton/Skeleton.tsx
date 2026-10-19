import styles from "./Skeleton.module.css"

type SkeletonProps = {
  variant?: "circular" | "rectangular"
  width?: string
  height?: string
  className?: string
}

export default function Skeleton({
  variant = "rectangular",
  width,
  height,
  className = ""
}: SkeletonProps) {
  const style = {
    width: width || (variant === "circular" ? "120px" : "100%"),
    height: height || (variant === "circular" ? "120px" : "24px")
  }

  return (
    <div
      className={`${styles.skeleton} ${variant === "circular" ? styles.circular : ""} ${className}`}
      style={style}
    />
  )
}
