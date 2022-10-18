import { Stack, styled, Button, Typography } from '@mui/material';
import { CustomTextField } from 'components/fields';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const signupSchema = Yup.object().shape({
  email: Yup.string().label('Email').required('${path} is required'),
});

type Props = {
  onContinue: (email: string) => void;
};

export const ValidateEmail = ({ onContinue }: Props) => {
  const [step, setStep] = useState(0);

  const handleSubmit = async (values: any) => {
    try {
      await axios.post('https://api.m3o.com/v1/user/Read', values, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_M3O_API_TOKEN}`,
        },
      });

      setStep(1);
    } catch (err) {
      onContinue(values.email);
    }
  };

  return step === 0 ? (
    <>
      <DescriptionStyled>Let’s validate your email first</DescriptionStyled>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={signupSchema}
        onSubmit={async (values, actions) => {
          await handleSubmit(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
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
