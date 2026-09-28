// Default SVG fallback avatar
export const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' fill='%236366f1'%3E%3Crect width='100' height='100' fill='%231e293b'/%3E%3Ccircle cx='50' cy='38' r='20' fill='%2394a3b8'/%3E%3Cpath d='M22 84 C22 66 35 60 50 60 C65 60 78 66 78 84 Z' fill='%2394a3b8'/%3E%3C/svg%3E";

// Generate initials avatar data URI as a stylish fallback option
export function getInitialsAvatar(name = "Student") {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((word) => word[0]?.toUpperCase() || "")
    .slice(0, 2)
    .join("");

  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cdefs%3E%3ClinearGradient id='grad' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%236366f1'/%3E%3Cstop offset='100%25' stop-color='%23a855f7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' rx='50' fill='url(%23grad)'/%3E%3Ctext x='50%25' y='50%25' dy='.35em' fill='%23ffffff' font-family='sans-serif' font-weight='bold' font-size='38' text-anchor='middle'%3E${initials}%3C/text%3E%3C/svg%3E`;
}
