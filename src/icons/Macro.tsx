import { SVGProps } from 'react';

const Macro = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x={2} y={2} width={20} height={20} rx={4} fill="#29C293" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      fill="#fff"
    />
  </svg>
);

export default Macro;
