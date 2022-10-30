import { SVGProps } from 'react';

const Home = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.331 2.257 4.334 8.554l-.006.005-2.997 2.698a1 1 0 0 0 1.338 1.486L4 11.545V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9.455l1.331 1.198a1 1 0 1 0 1.338-1.486l-2.997-2.698-.006-.005-6.997-6.297a1 1 0 0 0-1.338 0ZM6 20V9.745l6-5.4 6 5.4V20H6Z"
      fill="#fff"
    />
  </svg>
);

export default Home;
