import {
  Button,
  Stack,
  styled,
  Typography,
  Link as MuiLink,
  Box,
} from '@mui/material';
import { CustomTextField } from 'components/fields';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { CustomAlert } from 'components/CustomAlert';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { resetPassword, verifyToken } from 'features/auth/authSlice';

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .label('Password')
    .min(8, ({ label, min }) => `${label} must be at least ${min} characters`)
    .max(
      255,
      ({ label, max }) => `${label} must be less than ${max + 1} characters`
    )
    .required('${path} is required'),
});

type Props = {
  token: string;
};

export const PasswordReset = ({ token }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [tokenValid, setTokenValid] = useState(false);
  const { loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(verifyToken(token))
      .unwrap()
      .then(() => {
        setTokenValid(true);
      })
      .catch(() => {});
  }, [dispatch, token]);

  const handleSubmit = async (
    { password }: any,
    actions: FormikHelpers<any>
  ) => {
    try {
      dispatch(resetPassword({ token, password }))
        .unwrap()
        .then(() => {
          navigate('/login', { replace: true, state: { reset: true } });
        })
        .finally(() => {
          actions.setSubmitting(false);
          actions.resetForm();
        });
    } catch (err) {}
  };

  return (
    <>
      <DescriptionStyled>Please enter your new password</DescriptionStyled>
      <Formik
        validateOnBlur={false}
        initialValues={{ password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form aria-label="form">
              {loading ? (
                <Box>Loading...</Box>
              ) : (
                <>
                  {!tokenValid ? (
                    <AlertContainerStyled>
                      <CustomAlert severity="error">
                        Password reset token is invalid or has expired.
                      </CustomAlert>
                    </AlertContainerStyled>
                  ) : (
                    <Stack spacing={3}>
                      <Field
                        autoFocus
                        name="password"
                        placeholder="Password"
                        type="password"
                        component={CustomTextField}
                        fullWidth
                      />
                      <ButtonStyled
                        variant="contained"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Recover your password
                      </ButtonStyled>
                    </Stack>
                  )}
                </>
              )}
              <Stack marginTop={1.5}>
                <MuiLink component={Link} to="/login" textAlign="center">
                  Back to login
                </MuiLink>
              </Stack>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

const DescriptionStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(5),
  textAlign: 'center',
}));

const AlertContainerStyled = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.75),
}));
