import { debounce, Stack, styled, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  CustomCheckbox,
  CustomSelect,
  CustomTextField,
} from 'components/fields';
import { spaceExists } from 'features/organization/organizationSlice';
import { Field, FormikProps } from 'formik';
import { Error as ErrorIcon } from 'icons';
import { useCallback, useState } from 'react';

type Props = {
  formikProps: FormikProps<any>;
};

export const OrganizationInformation = ({ formikProps }: Props) => {
  const dispatch = useAppDispatch();
  const { industries, employeesSize } = useAppSelector(
    (state) => state.organization
  );

  const { handleChange, setFieldTouched, errors, touched } = formikProps;
  const [hasError, setHasError] = useState(false);

  const debouncedSpaceExists = useCallback(
    debounce((value) => {
      setHasError(false);
      if (value.length > 2) {
        dispatch(spaceExists(value))
          .unwrap()
          .catch(() => {
            setHasError(true);
          });
      }
    }, 500),
    []
  );

  return (
    <>
      <FormFieldStyled>
        <Typography>Company Name</Typography>
        <Field
          autoFocus
          name="companyName"
          placeholder="Company name"
          type="text"
          component={CustomTextField}
          fullWidth
        />
      </FormFieldStyled>
      <FormFieldStyled>
        <Typography>Your space will be</Typography>
        <TextField
          name="spaceName"
          placeholder="Space"
          type="text"
          fullWidth
          onChange={handleChange}
          onKeyUp={(event) =>
            debouncedSpaceExists((event.target as HTMLInputElement).value)
          }
          onBlur={() => setFieldTouched('spaceName')}
          error={hasError || !!(touched.spaceName && errors.spaceName)}
          helperText={
            (hasError || (touched.spaceName && errors.spaceName)) && (
              <Stack
                component="span"
                direction="row"
                alignItems="center"
                spacing={1}
              >
                <ErrorIcon />
                <span>
                  {hasError
                    ? 'This space name is not available'
                    : (errors.spaceName as string)}
                </span>
              </Stack>
            )
          }
        />
      </FormFieldStyled>
      <FormFieldStyled>
        <Typography>Industry</Typography>
        <Field
          name="industry"
          placeholder="Industry type"
          options={industries.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          component={CustomSelect}
          selectProps={{ 'data-testid': 'industry-type' }}
          fullWidth
        />
      </FormFieldStyled>
      <FormFieldStyled>
        <Typography>Number of employees</Typography>
        <Field
          name="employeesSize"
          placeholder="Select a size.."
          options={employeesSize.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          component={CustomSelect}
          selectProps={{ 'data-testid': 'employees-size' }}
          fullWidth
        />
      </FormFieldStyled>
      <CheckboxStyled
        name="acceptTerms"
        label="I accept the terms of use and privacy policy more thing"
        type="checkbox"
        component={CustomCheckbox}
        data-testid="accept-terms"
      />
    </>
  );
};

const FormFieldStyled = styled(Stack)(({ theme }) => ({
  '& > .MuiTypography-root': {
    // @ts-expect-error
    color: theme.palette.text.secondaryLight,
    marginLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const CheckboxStyled = styled(Field)(({ theme }) => ({
  margin: 0,
  display: 'block',
  '& .MuiCheckbox-root': {
    padding: 0,
    paddingRight: theme.spacing(1),
  },
}));
