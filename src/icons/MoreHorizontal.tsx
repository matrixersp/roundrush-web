import { SVGProps } from 'react';

const MoreHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 9.333a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666Zm4 0a1.333 1.333 0 1 0 0-2.666 1.333 1.333 0 0 0 0 2.666ZM13.333 8a1.333 1.333 0 1 1-2.666 0 1.333 1.333 0 0 1 2.666 0Z"
      fill="#fff"
    />
  </svg>
);

export default MoreHorizontal;
