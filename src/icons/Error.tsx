import { SVGProps } from 'react';

const Error = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={13}
    height={12}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.467 11.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Zm0-1a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9Zm-.5-6.5v2.5a.5.5 0 1 0 1 0V4a.5.5 0 0 0-1 0Zm.853 4.354a.5.5 0 1 0-.707-.708.5.5 0 0 0 .707.708Z"
      fill="#FD5461"
    />
  </svg>
);

export default Error;
