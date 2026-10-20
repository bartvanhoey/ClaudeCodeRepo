import styles from "./Avatar.module.css"

type AvatarProps = {
  name: string
}

export default function Avatar({ name }: AvatarProps) {
  const getInitials = (name: string): string => {
    // Extract all uppercase letters
    const uppercaseLetters = name.match(/[A-Z]/g)

    // If we have 2+ uppercase letters (PascalCase), use first 2
    if (uppercaseLetters && uppercaseLetters.length >= 2) {
      return uppercaseLetters.slice(0, 2).join("")
    }

    // Otherwise, use the first character (uppercase)
    return name.charAt(0).toUpperCase()
  }

  const initials = getInitials(name)

  return (
    <div className={styles.avatar} role="img" aria-label={`Avatar for ${name}`}>
      {initials}
    </div>
  )
}
