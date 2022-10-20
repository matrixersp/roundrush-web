import { Stack, styled, Button, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';
import { validationSchema } from 'components/Signup/CreateAccount/validationSchema';
import { initialValues } from 'components/Signup/CreateAccount/initialValues';
import { AccountInformation } from 'components/Signup/CreateAccount/AccountInformation';
import { CompanySpace } from 'components/Signup/CreateAccount/CompanySpace';

function renderStepContent(step: number, formikProps: FormikProps<any>) {
  switch (step) {
    case 0:
      return <AccountInformation />;
    case 1:
      return <CompanySpace formikProps={formikProps} />;
    default:
      return null;
  }
}

type Props = {
  setAccountReady: Dispatch<SetStateAction<boolean>>;
  email: string;
};

export const CreateAccount = ({ setAccountReady, email }: Props) => {
  const [step, setStep] = useState(0);
  const isLastStep = step === 1;

  const submitForm = async (values: any, actions: FormikHelpers<any>) => {
    try {
      await axios.post(
        'https://api.m3o.com/v1/user/Create',
        { ...values, username: getUsernameFromEmail(values.email) },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_M3O_API_TOKEN}`,
          },
        }
      );

      setAccountReady(true);
      actions.setSubmitting(false);
    } catch (err) {
      actions.setSubmitting(false);
    }
  };

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setStep(step + 1);
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <DescriptionStyled>Fill up your account information</DescriptionStyled>
      <Formik
        validateOnBlur={false}
        initialValues={{ ...initialValues, email }}
        validationSchema={validationSchema[step]}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ isSubmitting, ...props }) => (
          <Form>
            <Stack spacing={3}>
              {renderStepContent(step, { isSubmitting, ...props })}
              <ButtonStyled
                variant="contained"
                color={isLastStep ? 'secondary' : 'primary'}
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                {isLastStep ? 'Register' : 'Next'}
              </ButtonStyled>
            </Stack>
            {/* {JSON.stringify(values, null, 2)} */}
          </Form>
        )}
      </Formik>
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

function getUsernameFromEmail(email: string) {
  return email.split('@')[0];
}
