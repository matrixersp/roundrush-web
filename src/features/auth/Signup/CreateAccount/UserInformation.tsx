import { CustomTextField } from 'components/fields';
import { Field } from 'formik';

export const UserInformation = () => {
  return (
    <>
      <Field
        autoFocus
        name="fullName"
        placeholder="Full name"
        type="text"
        component={CustomTextField}
        fullWidth
      />
      <Field
        name="password"
        placeholder="Password"
        type="password"
        component={CustomTextField}
        fullWidth
      />
    </>
  );
};
