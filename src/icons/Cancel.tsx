import { SVGProps } from 'react';

const Cancel = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12.283 10.586 4.95-4.95a1 1 0 1 1 1.414 1.414L13.697 12l4.95 4.95a1 1 0 0 1-1.414 1.414l-4.95-4.95-4.95 4.95A1 1 0 0 1 5.92 16.95L10.87 12l-4.95-4.95a1 1 0 0 1 1.414-1.414l4.95 4.95Z"
      fill="#4C84FF"
    />
  </svg>
);

export default Cancel;
