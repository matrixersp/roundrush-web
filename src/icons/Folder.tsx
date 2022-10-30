import { SVGProps } from 'react';

const Folder = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17.5 5H8.848l-.603-1.206a.833.833 0 0 0-.745-.46h-5a.833.833 0 0 0-.833.833v11.666c0 .46.373.834.833.834h15c.46 0 .833-.373.833-.834v-10A.833.833 0 0 0 17.5 5ZM3.333 15V5h3.652l.603 1.206c.141.282.43.46.745.46h8.334V15H3.333Z"
      fill="#4C84FF"
    />
  </svg>
);

export default Folder;
