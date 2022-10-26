import { Stack, styled, Button, Typography } from '@mui/material';
import { Formik, Form, FormikHelpers, FormikProps } from 'formik';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { validationSchema } from 'features/auth/Signup/CreateAccount/validationSchema';
import { initialValues } from 'features/auth/Signup/CreateAccount/initialValues';
import { UserInformation } from 'features/auth/Signup/CreateAccount/UserInformation';
import { OrganizationInformation } from 'features/auth/Signup/CreateAccount/OrganizationInformation';
import { useAppDispatch } from 'app/hooks';
import { signup } from 'features/auth/authSlice';
import {
  getIndustries,
  getEmployeesSize,
} from 'features/organization/organizationSlice';

function renderStepContent(step: number, formikProps: FormikProps<any>) {
  switch (step) {
    case 0:
      return <UserInformation />;
    case 1:
      return <OrganizationInformation formikProps={formikProps} />;
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
  const formInitialValues = { ...initialValues, email };
  const currentValidationSchema = validationSchema[step];
  const isLastStep = step === 1;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getIndustries());
    dispatch(getEmployeesSize());
  }, []);

  const submitForm = async (values: any, actions: FormikHelpers<any>) => {
    dispatch(signup(values))
      .unwrap()
      .then(() => {
        setAccountReady(true);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  const handleSubmit = (values: any, actions: FormikHelpers<any>) => {
    if (isLastStep) {
      submitForm(values, actions);
    } else {
      setStep(step + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <DescriptionStyled>Fill up your account information</DescriptionStyled>
      <Formik
        enableReinitialize={false}
        initialValues={formInitialValues}
        validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
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
