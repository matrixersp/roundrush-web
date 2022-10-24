import { PublicLayout } from 'components/ui/PublicLayout';
import { CreateAccount } from 'components/Signup/CreateAccount';
import { ValidateEmail } from 'components/Signup/ValidateEmail';
import { AccountReady } from 'components/Signup/AccountReady';
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
