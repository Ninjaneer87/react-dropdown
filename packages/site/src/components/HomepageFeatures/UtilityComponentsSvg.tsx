import React from 'react';

function UtilityComponentsSvg() {
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

      {/* <!-- toolbox --> */}
      <rect x="60" y="80" width="120" height="50" rx="12" />
      <rect x="90" y="60" width="60" height="30" rx="10" />

      {/* <!-- tools --> */}
      <circle cx="85" cy="105" r="8" />
      <rect x="110" y="97" width="40" height="16" rx="8" />
      <rect x="160" y="97" width="16" height="16" rx="4" />
    </svg>
  );
}

export default UtilityComponentsSvg;
