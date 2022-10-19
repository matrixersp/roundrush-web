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
import { Link, useNavigate } from 'react-router-dom';

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

export const ResetPassword = ({ token }: Props) => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    try {
      // await axios.post('https://api.m3o.com/v1/user/ResetPassword', values, {
      //   headers: {
      //     Authorization: `Bearer ${process.env.REACT_APP_M3O_API_TOKEN}`,
      //   },
      // });
      navigate('/login', { replace: true, state: { reset: true } });
      actions.setSubmitting(false);
      actions.resetForm();
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
            <Form>
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

const ButtonStyled = styled(Button)(({ theme }) => ({
  paddingTop: theme.spacing(1.75),
  paddingBottom: theme.spacing(1.75),
}));
