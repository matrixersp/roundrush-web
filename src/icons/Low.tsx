import { SVGProps } from 'react';

const Low = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={12} r={3} fill="#29C293" />
  </svg>
);

export default Low;
