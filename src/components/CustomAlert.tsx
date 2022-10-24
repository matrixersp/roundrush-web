import { Alert } from '@mui/material';
import warning from 'icons/warning.svg';
import error from 'icons/error.svg';
import success from 'icons/success.svg';

type Props = {
  severity: 'error' | 'success' | 'warning';
  children: string;
};

const icon = {
  error,
  success,
  warning,
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
        success: (
          <img src={icon[severity]} alt="warning-icon" width="24" height="24" />
        ),
      }}
      role="alert"
    >
      {children}
    </Alert>
  );
};
