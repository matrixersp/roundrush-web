import { SVGProps } from 'react';

const Medium = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={7} cy={12} r={3} fill="#FFAB2A" />
    <circle cx={17} cy={12} r={3} fill="#FFAB2A" />
  </svg>
);

export default Medium;
