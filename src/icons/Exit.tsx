import { SVGProps } from 'react';

const Exit = (props: SVGProps<SVGSVGElement>) => (
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
      d="M15 3a1 1 0 0 1 1 1v7h2.586l-1.293-1.293a1 1 0 0 1 1.414-1.414l3 3c.193.193.29.445.293.698l-4.707 2.302L18.586 13H16v7a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11Zm-1 8h-2.5a1 1 0 1 0 0 2H14v6H5V5h9v6Zm3.293 3.293L22 12l-.001.048a.997.997 0 0 1-.292.66l-3 3a1 1 0 0 1-1.414-1.415Z"
      fill="#fff"
    />
  </svg>
);

export default Exit;
