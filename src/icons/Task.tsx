import { SVGProps } from 'react';

const Task = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={2} y={2} width={20} height={20} rx={4} fill="#4C84FF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m17.83 7.35-8.16 8.16a.83.83 0 0 1-1.18 0l-2.32-2.33a.83.83 0 0 1 0-1.18.83.83 0 0 1 1.18 0l1.73 1.73 7.57-7.56a.83.83 0 0 1 1.18 0 .83.83 0 0 1 0 1.18Z"
      fill="#fff"
    />
  </svg>
);

export default Task;
