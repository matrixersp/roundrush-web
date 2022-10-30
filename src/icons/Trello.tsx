import { SVGProps } from 'react';

const Trello = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H5ZM2 5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Z"
      fill="#fff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.25 7A.75.75 0 0 1 7 6.25h3a.75.75 0 0 1 .75.75v9a.75.75 0 0 1-.75.75H7a.75.75 0 0 1-.75-.75V7Zm1.5.75v7.5h1.5v-7.5h-1.5ZM13.25 7a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v5a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75V7Zm1.5.75v3.5h1.5v-3.5h-1.5Z"
      fill="#fff"
    />
  </svg>
);

export default Trello;
