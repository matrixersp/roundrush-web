import { debounce, Stack, styled, Typography } from '@mui/material';
import {
  CustomCheckbox,
  CustomSelect,
  CustomTextField,
} from 'components/fields';
import { Field, FormikProps } from 'formik';
import { useState } from 'react';
import error from 'icons/error.svg';

type Props = {
  formikProps: FormikProps<any>;
};

const existingSpaces = ['Space 1', 'Space 2', 'Space 3'];

export const CompanySpace = ({ formikProps }: Props) => {
  const [spaceExists, setSpaceExists] = useState(false);

  const handleSpaceChange = (event: any) => {
    const value = event.target.value;
    formikProps.setFieldValue('space', value);

    debounce(() => {
      setSpaceExists(existingSpaces.includes(value));
    }, 500)();
  };

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
        <Field
          name="space"
          placeholder="Space"
          type="text"
          onChange={handleSpaceChange}
          component={CustomTextField}
          fullWidth
          onBlur={() => console.log('onBlur')}
        />
        {spaceExists && (
          <CustomErrorStyled direction="row" spacing={1}>
            <img src={error} alt="error-icon" />
            <span>This space name is not available</span>
          </CustomErrorStyled>
        )}
      </FormFieldStyled>
      <FormFieldStyled>
        <Typography>Industry</Typography>
        <Field
          name="industry"
          placeholder="Industry type"
          options={industries}
          component={CustomSelect}
          fullWidth
        />
      </FormFieldStyled>
      <FormFieldStyled>
        <Typography>Number of employees</Typography>
        <Field
          name="numberOfEmployees"
          placeholder="Select a size.."
          options={numberOfEmployees}
          component={CustomSelect}
          fullWidth
        />
      </FormFieldStyled>
      <CheckboxStyled
        name="acceptTerms"
        label="I accept the terms of use and privacy policy more thing"
        type="checkbox"
        component={CustomCheckbox}
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

const CustomErrorStyled = styled(Stack)(({ theme }) => ({
  fontSize: '0.75rem',
  color: theme.palette.error.main,
  margin: '3px 8px',
}));

const industries = [
  { value: '1', label: 'industry 1' },
  { value: '2', label: 'industry 2' },
];

const numberOfEmployees = [
  { value: '1', label: 'less than 5' },
  { value: '2', label: '5 to 10' },
  { value: '3', label: '10 to 50' },
];
