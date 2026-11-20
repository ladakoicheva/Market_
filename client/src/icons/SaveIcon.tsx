type Props = {
  className?: string;
  onClick: ()=>void
};

export default function SaveIcon({ className,onClick }: Props) {
  return (
    <svg
      onClick={onClick}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="40"
      height="40"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="11" fill="var(--color-success)" />
      <path
        d="m7 12 3.5 3.5L17 9"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
