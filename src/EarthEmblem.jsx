// 地球联合会徽：金色环 + 经纬线勾勒的全球意象
export default function EarthEmblem({ size = 30, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ color: 'var(--gold)', filter: 'drop-shadow(0 0 6px rgba(212,186,138,0.35))' }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="9" ry="4" />
      <path d="M3 12h18" />
      <path d="M12 3c-2.4 2.7-2.4 15.3 0 18M12 3c2.4 2.7 2.4 15.3 0 18" />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none" opacity="0.85" />
    </svg>
  )
}
