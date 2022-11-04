import { SvgIcon, SvgIconProps } from '@mui/material';

const Notification = (props: SvgIconProps) => (
  <SvgIcon width={24} height={24} fill="inherit" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 10v5c0 1.65.488 2.626 1.447 3.106.944.471.608 1.894-.447 1.894h-5.17a3.001 3.001 0 0 1-5.66 0H4c-1.055 0-1.391-1.422-.447-1.894C4.513 17.626 5 16.65 5 15v-5a7 7 0 1 1 14 0Zm-9 8H6.368c.422-.822.632-1.829.632-3v-5a5 5 0 1 1 10 0v5c0 1.171.21 2.178.632 3H10Z"
    />
  </SvgIcon>
);

export default Notification;
