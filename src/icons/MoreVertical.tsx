import { SVGProps } from 'react';

const MoreVertical = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.333 5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0Zm0 5a1.667 1.667 0 1 1 3.334 0 1.667 1.667 0 0 1-3.334 0ZM10 13.334a1.667 1.667 0 1 0 0 3.333 1.667 1.667 0 0 0 0-3.334Z"
      fill="#4C84FF"
    />
  </svg>
);

export default MoreVertical;
