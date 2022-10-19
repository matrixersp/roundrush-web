import { Stack, Link as MuiLink, styled, Button } from '@mui/material';
import { CustomTextField } from 'components/fields';
import { PublicLayout } from 'components/PublicLayout';
import { Formik, Form, Field } from 'formik';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { CustomAlert } from 'components/CustomAlert';
import { useState } from 'react';
import axios, { AxiosError } from 'axios';

const loginSchema = Yup.object().shape({
  email: Yup.string().label('Email').required('${path} is required'),
  password: Yup.string().label('Password').required('${path} is required'),
});

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const handleSubmit = async (values: any) => {
    try {
      await axios.post('https://api.m3o.com/v1/user/Login', values, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_M3O_API_TOKEN}`,
        },
      });

      setError('');
      navigate('/dashboard');
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || 'Something went wrong');
      } else {
        setError((err as AxiosError).message);
      }
    }
  };

  return (
    <PublicLayout title="Login">
      <Formik
        validateOnBlur={false}
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={async (values, actions) => {
          await handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
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
                fullWidth
              />
              <Field
                name="password"
                placeholder="Password"
                type="password"
                component={CustomTextField}
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
                <MuiLink component={Link} to="/forgot-password">
                  I forgot my password
                </MuiLink>
                <MuiLink component={Link} to="/signup">
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
