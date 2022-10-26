import { Stack, styled, Button, Typography } from '@mui/material';
import { CustomTextField } from 'components/fields';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { verifyEmail } from 'features/auth/authSlice';
import { useAppDispatch } from 'app/hooks';

const signupSchema = Yup.object().shape({
  email: Yup.string().email().label('Email').required('${path} is required'),
});

type Props = {
  onContinue: (email: string) => void;
};

export const ValidateEmail = ({ onContinue }: Props) => {
  const [step, setStep] = useState(0);
  const dispatch = useAppDispatch();

  const handleSubmit = async ({ email }: any, actions: FormikHelpers<any>) => {
    dispatch(verifyEmail(email))
      .unwrap()
      .then(() => {
        onContinue(email);
      })
      .catch(() => {
        setStep(1);
      })
      .finally(() => {
        actions.setSubmitting(false);
        actions.resetForm();
      });
  };

  return step === 0 ? (
    <>
      <DescriptionStyled>Let’s validate your email first</DescriptionStyled>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={signupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Stack spacing={3}>
              <Field
                autoFocus
                name="email"
                placeholder="Insert your email"
                type="text"
                component={CustomTextField}
                fullWidth
              />
              <ButtonStyled
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                size="large"
              >
                Next
              </ButtonStyled>
            </Stack>
          </Form>
        )}
      </Formik>
    </>
  ) : (
    <>
      <DescriptionStyled>
        Your email already exists in RoundRush
      </DescriptionStyled>
      <ButtonStyled
        // @ts-expect-error
        component={Link}
        to="/login"
        variant="contained"
        size="large"
        fullWidth
      >
        Click here to authenticate
      </ButtonStyled>
    </>
  );
};

const DescriptionStyled = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(5),
  textAlign: 'center',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.75),
}));
