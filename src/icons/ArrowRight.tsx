import { SVGProps } from 'react';

const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m16.364 10-4.41 4.41a.833.833 0 0 0 1.178 1.18l5-5a.833.833 0 0 0 0-1.18l-5-5a.833.833 0 1 0-1.178 1.18l4.41 4.41Z"
      fill="#838895"
    />
    <path
      d="M2.543 10.834h14.166a.833.833 0 1 0 0-1.667H2.543a.833.833 0 0 0 0 1.667Z"
      fill="#838895"
    />
    <path
      d="M17.543 9.167h-.834a.833.833 0 0 0 0 1.667h.834a.833.833 0 0 0 0-1.667Z"
      fill="#838895"
    />
  </svg>
);

export default ArrowRight;
