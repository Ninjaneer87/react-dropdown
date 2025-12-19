import React from 'react';

function UseAnythingSvg() {
  return (
    <svg
      width="80"
      height="60"
      viewBox="0 0 240 180"
      xmlns="http://www.w3.org/2000/svg"
      fill="var(--ifm-color-primary-bg)"
      stroke="var(--ifm-color-primary)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* <!-- container --> */}
      <rect x="20" y="20" width="200" height="140" rx="24" />

      {/* <!-- constellation --> */}
      <path d="M70 90 L120 60 L170 90 L120 120 Z" />

      {/* <!-- stars --> */}
      <circle cx="70" cy="90" r="6" />
      <circle cx="120" cy="60" r="6" />
      <circle cx="170" cy="90" r="6" />
      <circle cx="120" cy="120" r="6" />

      {/* <!-- hook --> */}
      <path
        fill="none"
        d="M120 75
           C135 75 135 105 120 105
           C110 105 110 95 120 95"
      />
    </svg>
  );
}

export default UseAnythingSvg;
