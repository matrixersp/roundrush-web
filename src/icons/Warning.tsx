import { SVGProps } from 'react';

const Warning = (props: SVGProps<SVGSVGElement>) => (
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
      d="M21.975 18.986A2 2 0 0 1 20.252 22H3.748a2 2 0 0 1-1.723-3.014l8.251-14.028a2 2 0 0 1 3.448 0l8.251 14.028ZM20.252 20 12 5.972 3.748 20h16.504ZM11 11v3a1 1 0 1 0 2 0v-3a1 1 0 1 0-2 0Zm1.707 6.707a1 1 0 1 0-1.414-1.414 1 1 0 0 0 1.414 1.414Z"
      fill="#FD5461"
    />
  </svg>
);

export default Warning;
