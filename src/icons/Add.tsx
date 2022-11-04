import { SVGProps } from 'react';

const Add = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="inherit"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M10.833 10.833v5.834a.833.833 0 0 1-1.666 0v-5.834H3.333a.833.833 0 0 1 0-1.666h5.834V3.333a.833.833 0 0 1 1.666 0v5.834h5.834a.833.833 0 0 1 0 1.666h-5.834Z" />
  </svg>
);

export default Add;
