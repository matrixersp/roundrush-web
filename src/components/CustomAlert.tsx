import { Alert } from '@mui/material';
import { Success, Warning, Error } from 'icons';

type Props = {
  severity: 'error' | 'success' | 'warning';
  children: string;
};

const getIcon = (severity: Props['severity']) => {
  const icon = {
    error: <Error />,
    success: <Success />,
    warning: <Warning />,
  };

  return icon[severity];
};

export const CustomAlert = ({ severity, children }: Props) => {
  const color = ['error', 'warning'].includes(severity) ? 'error' : 'secondary';

  return (
    <Alert
      sx={{
        backgroundColor: '#F4F6FC',
        alignItems: 'center',
        color: `${color}.main`,
      }}
      iconMapping={{
        success: getIcon(severity),
      }}
      role="alert"
    >
      {children}
    </Alert>
  );
};
