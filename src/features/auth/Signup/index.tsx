import { PublicLayout } from 'components/ui/PublicLayout';
import { CreateAccount } from 'features/auth/Signup/CreateAccount';
import { ValidateEmail } from 'features/auth/Signup/ValidateEmail';
import { AccountReady } from 'features/auth/Signup/AccountReady';
import { useState } from 'react';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [accountReady, setAccountReady] = useState(false);

  return (
    <PublicLayout
      description="Signing up a new account"
      title={accountReady ? 'Your account is ready!' : 'Sign up'}
    >
      {accountReady ? (
        <AccountReady />
      ) : email ? (
        <CreateAccount email={email} setAccountReady={setAccountReady} />
      ) : (
        <ValidateEmail onContinue={(email) => setEmail(email)} />
      )}
    </PublicLayout>
  );
};
