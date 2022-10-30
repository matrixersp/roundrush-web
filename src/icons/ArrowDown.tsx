import { SVGProps } from 'react';

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 9.057 4.47 5.53a.667.667 0 1 0-.942.943l4 4c.26.26.682.26.942 0l4-4a.667.667 0 1 0-.943-.943L8 9.057Z"
      fill="#fff"
    />
  </svg>
);

export default ArrowDown;
