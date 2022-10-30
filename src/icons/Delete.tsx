import { SVGProps } from 'react';

const Delete = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.949 3a1 1 0 0 0-1 1h-4a1 1 0 0 0 0 2h14a1 1 0 1 0 0-2h-4a1 1 0 0 0-1-1h-4Zm7 6v10h-10V9a1 1 0 1 0-2 0v10c0 1.219.78 2 2 2h10c1.219 0 2-.781 2-2V9a1 1 0 1 0-2 0Z"
      fill="#FD5461"
    />
  </svg>
);

export default Delete;
