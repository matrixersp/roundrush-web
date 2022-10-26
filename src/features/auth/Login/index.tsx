import { Stack, Link as MuiLink, styled, Button } from '@mui/material';
import { CustomTextField } from 'components/fields';
import { PublicLayout } from 'components/ui/PublicLayout';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import {
  Link,
  LinkProps,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import * as Yup from 'yup';
import { CustomAlert } from 'components/CustomAlert';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { login } from 'features/auth/authSlice';
import { RootState } from 'app/store';
import React from 'react';

const loginSchema = Yup.object().shape({
  email: Yup.string().email().label('Email').required('${path} is required'),
  password: Yup.string().label('Password').required('${path} is required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { loggedIn, error } = useAppSelector((state: RootState) => state.auth);

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    dispatch(login(values))
      .then(() => {
        navigate(location.state?.from || '/dashboard');
      })
      .finally(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      });
  };

  if (loggedIn) {
    return <Navigate to={location.state?.from || '/dashboard'} />;
  }

  return (
    <PublicLayout title="Login">
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form aria-label="form">
            <Stack spacing={3} marginTop={6.375}>
              {error && (
                <CustomAlert severity="warning">
                  Please make sure you have the correct email and password
                </CustomAlert>
              )}
              {location.state?.reset && (
                <CustomAlert severity="success">
                  Well done. The password was reset successfully
                </CustomAlert>
              )}
              <Field
                autoFocus
                name="email"
                placeholder="Insert your email"
                type="text"
                component={CustomTextField}
                inputProps={{ 'data-testid': 'email' }}
                fullWidth
              />
              <Field
                name="password"
                placeholder="Password"
                type="password"
                component={CustomTextField}
                inputProps={{ 'data-testid': 'password' }}
                fullWidth
              />
              <ButtonStyled
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                size="large"
              >
                Login
              </ButtonStyled>
              <LinksContainer gap={1}>
                <MuiLink
                  component={LinkBehavior}
                  to="/forgot-password"
                  data-testid="forgot-password-link"
                >
                  I forgot my password
                </MuiLink>
                <MuiLink
                  component={LinkBehavior}
                  to="/signup"
                  data-testid="register-link"
                >
                  I don't have an account
                </MuiLink>
              </LinksContainer>
            </Stack>
          </Form>
        )}
      </Formik>
    </PublicLayout>
  );
};

const LinkBehavior = React.forwardRef<any, LinkProps>(
  ({ to, ...props }, ref) => (
    <Link
      ref={ref}
      to={to}
      onMouseDown={(e) => e.preventDefault()}
      {...props}
    />
  )
);

const ButtonStyled = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.75),
}));

const LinksContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'space-between',
  flexDirection: 'row',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));
