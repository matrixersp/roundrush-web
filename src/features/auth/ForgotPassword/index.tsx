import { PublicLayout } from 'components/ui/PublicLayout';
import { ValidateEmail } from 'features/auth/ForgotPassword/ValidateEmail';
import { useLocation } from 'react-router-dom';
import { PasswordReset } from 'features/auth/ForgotPassword/PasswordReset';

export const ForgotPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  return (
    <PublicLayout
      description="Signing up a new account"
      title="Forgot your password"
    >
      {token ? <PasswordReset token={token} /> : <ValidateEmail />}
    </PublicLayout>
  );
};
