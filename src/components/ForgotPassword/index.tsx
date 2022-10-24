import { PublicLayout } from 'components/ui/PublicLayout';
import { ValidateEmail } from 'components/ForgotPassword/ValidateEmail';
import { useLocation } from 'react-router-dom';
import { ResetPassword } from 'components/ForgotPassword/ResetPassword';

export const ForgotPassword = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  return (
    <PublicLayout
      description="Signing up a new account"
      title="Forgot your password"
    >
      {token ? <ResetPassword token={token} /> : <ValidateEmail />}
    </PublicLayout>
  );
};
