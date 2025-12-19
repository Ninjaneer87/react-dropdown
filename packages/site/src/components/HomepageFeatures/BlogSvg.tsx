import React from 'react';

function BlogSvg() {
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

      {/* <!-- book --> */}
      <rect x="65" y="60" width="50" height="60" rx="8" />
      <rect x="125" y="60" width="50" height="60" rx="8" />
      <line x1="120" y1="60" x2="120" y2="120" />

      {/* <!-- spark --> */}
      <path
        d="M120 40
           L125 50
           L135 52
           L125 55
           L120 65
           L115 55
           L105 52
           L115 50
           Z"
      />
    </svg>
  );
}

export default BlogSvg;
