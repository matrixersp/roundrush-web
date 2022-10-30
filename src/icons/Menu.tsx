import { SVGProps } from 'react';

const Menu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="unset"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.95 5.945c0-.522.422-.945.944-.945h16.11a.945.945 0 0 1 0 1.89H3.895a.945.945 0 0 1-.945-.945Zm0 5.668c0-.522.422-.945.944-.945h16.11a.945.945 0 0 1 0 1.89H3.895a.945.945 0 0 1-.945-.945Zm.944 4.723a.945.945 0 1 0 0 1.889h9.11a.945.945 0 1 0 0-1.89h-9.11Z"
      fill="#fff"
    />
  </svg>
);

export default Menu;
