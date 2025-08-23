type Props = { open: boolean };

function CaretIcon({ open }: Props) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height="1em"
      role="presentation"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="1em"
      data-open={open}
      className="w-4 h-4 transition-transform duration-150 ease motion-reduce:transition-none data-[open=true]:rotate-180"
    >
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
}

export default CaretIcon;
