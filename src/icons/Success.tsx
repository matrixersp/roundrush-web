import { SVGProps } from 'react';

const Success = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.949 23c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11Zm0-2a9 9 0 1 1 0-18 9 9 0 0 1 0 18Zm-5.707-8.707a1 1 0 0 1 1.414 0l2.293 2.293 6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414Z"
      fill="#29C293"
    />
  </svg>
);

export default Success;
