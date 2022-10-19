import {
  Button,
  Stack,
  styled,
  Typography,
  Link as MuiLink,
} from '@mui/material';
import axios from 'axios';
import { CustomTextField } from 'components/fields';
import { Field, Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { CustomAlert } from 'components/CustomAlert';
import { Box } from '@mui/system';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string().email().label('Email').required('${path} is required'),
});

export const ValidateEmail = () => {
  const [emailExists, setEmailExists] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    try {
      await axios.post('https://api.m3o.com/v1/user/Read', values, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_M3O_API_TOKEN}`,
        },
      });
      setEmailExists(true);
    } catch (err) {
      setEmailExists(false);
    } finally {
      setFormSubmitted(true);
      actions.setSubmitting(false);
      actions.resetForm();
    }
  };

  return (
    <>
      <DescriptionStyled>Enter your details below</DescriptionStyled>
      <Formik
        validateOnBlur={false}
        initialValues={{ email: '' }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <AlertContainerStyled>
                {emailExists && (
                  <CustomAlert severity="success">
                    Well done, we'll email you with a reset link.
                  </CustomAlert>
                )}
                {!emailExists && formSubmitted && (
                  <CustomAlert severity="error">
                    Email does not exist, please try again.
                  </CustomAlert>
                )}
              </AlertContainerStyled>
              <Stack spacing={3}>
                <Field
                  autoFocus
                  name="email"
                  placeholder="Insert your email"
                  type="text"
                  component={CustomTextField}
                  fullWidth
                />
                {emailExists ? (
                  <ButtonStyled
                    variant="contained"
                    size="large"
                    type="button"
                    disabled={isSubmitting}
                  >
                    Done
                  </ButtonStyled>
                ) : (
                  <ButtonStyled
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Recover your password
                  </ButtonStyled>
                )}
              </Stack>
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
