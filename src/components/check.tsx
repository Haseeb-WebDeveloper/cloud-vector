export default function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="10" className="stroke-primary/20" />
      <path d="M6.5 11.5l3 3 6-6" className="stroke-primary" />
    </svg>
  );
}
