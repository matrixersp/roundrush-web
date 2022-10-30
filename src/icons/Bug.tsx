import { SVGProps } from 'react';

const Bug = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={2} y={2} width={20} height={20} rx={4} fill="#FD5461" />
    <path
      d="M15.207 6.877a1 1 0 0 0-1.414-1.414l-5.83 5.83c-.63.63-.184 1.707.707 1.707h3.416l-4.123 4.123a1 1 0 1 0 1.414 1.414l5.83-5.83c.63-.63.184-1.707-.707-1.707h-3.416l4.123-4.123Z"
      fill="#fff"
    />
  </svg>
);

export default Bug;
