import { SVGProps } from 'react';

const High = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={12} cy={7} r={3} fill="#FD5461" />
    <circle cx={17} cy={17} r={3} fill="#FD5461" />
    <circle cx={7} cy={17} r={3} fill="#FD5461" />
  </svg>
);

export default High;
