import { SVGProps } from 'react';

const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10 3.678 4.41 4.411a.833.833 0 1 0 1.18-1.178l-5-5a.833.833 0 0 0-1.18 0l-5 5a.833.833 0 0 0 1.18 1.178L10 3.68Z"
      fill="#31394E"
      fillOpacity={0.4}
    />
    <path
      d="M10.833 17.5V3.333a.833.833 0 1 0-1.666 0V17.5a.833.833 0 1 0 1.666 0Z"
      fill="#31394E"
      fillOpacity={0.4}
    />
    <path
      d="M9.167 2.5v.833a.833.833 0 1 0 1.666 0V2.5a.833.833 0 1 0-1.666 0Z"
      fill="#31394E"
      fillOpacity={0.4}
    />
  </svg>
);

export default ArrowUp;
