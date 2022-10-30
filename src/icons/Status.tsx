import { SVGProps } from 'react';

const Status = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.667 10v5a.833.833 0 0 0 1.666 0v-5a.833.833 0 1 0-1.666 0ZM3.333 10v6.667a.833.833 0 1 0 1.667 0V10a.833.833 0 1 0-1.667 0ZM10 10v3.334a.833.833 0 0 0 1.667 0V10A.833.833 0 1 0 10 10ZM15.488 6.667l-1.91 1.91a.833.833 0 0 0 1.178 1.18l2.5-2.5a.833.833 0 0 0 0-1.18l-2.5-2.5a.833.833 0 1 0-1.179 1.18l1.911 1.91Z"
      fill="#31394E"
      fillOpacity={0.4}
    />
    <path
      d="M4.167 7.5h11.666a.833.833 0 1 0 0-1.667H4.167a.833.833 0 1 0 0 1.667Z"
      fill="#31394E"
      fillOpacity={0.4}
    />
  </svg>
);

export default Status;
