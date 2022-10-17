import { Stack, TextField } from '@mui/material';
import { FieldProps } from 'formik';
import error from 'icons/error.svg';

export const CustomTextField = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && errors[field.name] ? true : false}
    helperText={
      touched[field.name] &&
      errors[field.name] && (
        <Stack component="span" direction="row" spacing={1}>
          <img src={error} alt="error-icon" />
          <span>{String(errors[field.name])}</span>
        </Stack>
      )
    }
  />
);
