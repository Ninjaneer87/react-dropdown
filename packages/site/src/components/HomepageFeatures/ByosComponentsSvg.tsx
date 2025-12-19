import React from 'react';

function ByosComponentsSvg() {
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

      {/* <!-- blocks --> */}
      <rect x="55" y="55" width="40" height="40" rx="10" />
      <rect x="105" y="55" width="40" height="40" rx="10" />
      <rect x="80" y="100" width="40" height="40" rx="10" />

      {/* <!-- paint brush --> */}
      <line x1="160" y1="55" x2="185" y2="30" />
      <path d="M185 30 C190 25 200 35 195 40 C190 45 180 35 185 30 Z" />
      <path d="M155 60 C150 70 165 75 160 65 Z" />
    </svg>
  );
}

export default ByosComponentsSvg;
