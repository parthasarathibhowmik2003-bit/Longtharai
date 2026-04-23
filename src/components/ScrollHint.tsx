export default function ScrollHint() {
  return (
    <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 animation-pulse-down">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="text-warm/60"
      >
        <path
          d="M5 8L10 13L15 8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
