import { Box, Button, Stack, styled, Typography } from '@mui/material';
import { useAppDispatch } from 'app/hooks';
import { CustomSelect, CustomTextField } from 'components/fields';
import { Formik, Form, Field, FormikHelpers } from 'formik';

const languages = [
  {
    value: 'en',
    label: 'English',
  },
  {
    value: 'it',
    label: 'Italian',
  },
];

export const Info = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = async (values: any, actions: FormikHelpers<any>) => {
    // dispatch(signup(values))
    //   .unwrap()
    //   .then(() => {
    //     setAccountReady(true);
    //   })
    //   .finally(() => {
    //     actions.setSubmitting(false);
    //   });
  };

  return (
    <ContainerStyled>
      <Formik
        enableReinitialize={false}
        initialValues={{
          fullName: 'John Doe',
          username: 'johndoe',
          email: 'johndoe@example.com',
          avatar: '',
          language: languages[0].value,
        }}
        // validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, ...props }) => (
          <Form>
            <Stack spacing={3} sx={{ maxWidth: 500 }}>
              <Typography variant="h5" sx={{ fontWeight: 400 }}>
                Info
              </Typography>
              <FormFieldStyled>
                <Typography>Full Name</Typography>
                <Field
                  autoFocus
                  name="fullName"
                  placeholder="Full Name"
                  type="text"
                  component={CustomTextField}
                  fullWidth
                />
              </FormFieldStyled>
              <FormFieldStyled>
                <Typography>Username</Typography>
                <Field
                  autoFocus
                  name="username"
                  placeholder="Username"
                  type="text"
                  component={CustomTextField}
                  fullWidth
                />
              </FormFieldStyled>
              <FormFieldStyled>
                <Typography>Email</Typography>
                <Field
                  autoFocus
                  name="email"
                  placeholder="Email"
                  type="text"
                  component={CustomTextField}
                  fullWidth
                />
              </FormFieldStyled>
              <div>
                <Typography
                  variant="h6"
                  sx={{
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: 'text.secondary',
                    fontSize: '0.875rem',
                    my: 2,
                  }}
                >
                  Preferences
                </Typography>
                <FormFieldStyled>
                  <Typography>Languages</Typography>
                  <Field
                    name="languages"
                    placeholder="Languages"
                    options={languages}
                    component={CustomSelect}
                    selectProps={{ 'data-testid': 'industry-type' }}
                    fullWidth
                  />
                </FormFieldStyled>
              </div>
            </Stack>
            <ActionButtonsStyled>
              <Button variant="contained" color="error" size="large">
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                Save
              </Button>
            </ActionButtonsStyled>
          </Form>
        )}
      </Formik>
    </ContainerStyled>
  );
};

const ContainerStyled = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  height: '100%',
  position: 'relative',
}));

const ActionButtonsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'absolute',
  bottom: theme.spacing(-3),
  paddingBottom: theme.spacing(3),
}));

const FormFieldStyled = styled(Stack)(({ theme }) => ({
  '& > .MuiTypography-root': {
    // @ts-expect-error
    color: theme.palette.text.secondaryLight,
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));
