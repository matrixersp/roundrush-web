import { SVGProps } from 'react';

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10 11.321-4.41-4.41a.833.833 0 1 0-1.18 1.178l5 5a.833.833 0 0 0 1.18 0l5-5a.833.833 0 1 0-1.18-1.178L10 11.32Z"
      fill="#fff"
    />
  </svg>
);

export default ArrowDown;
