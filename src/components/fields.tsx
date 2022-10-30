import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
  Stack,
  styled,
  TextField,
} from '@mui/material';
import { FieldProps } from 'formik';
import { Error as ErrorIcon } from 'icons';

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
        <Stack component="span" direction="row" alignItems="center" spacing={1}>
          <ErrorIcon />
          <span>{String(errors[field.name])}</span>
        </Stack>
      )
    }
  />
);

export const CustomSelect = ({
  field,
  selectProps,
  ...props
}: FieldProps<string, any> & {
  selectProps: SelectProps;
  placeholder: string;
  options: any[];
}) => {
  return (
    <FormControl {...props}>
      <Select {...field} {...selectProps} displayEmpty>
        <MenuItem disabled value="">
          <PlaceholderStyled>{props.placeholder}</PlaceholderStyled>
        </MenuItem>
        {props.options.map(
          ({ value, label }: { value: string; label: string }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );
};

const PlaceholderStyled = styled('span')(({ theme }) => ({
  // @ts-expect-error
  color: theme.palette.text.secondaryLight,
}));

export const CustomCheckbox = ({
  field,
  form: { touched, errors },
  ...props
}: FieldProps & { label: string }) => {
  return (
    <div>
      <FormControlLabel
        {...props}
        control={<Checkbox {...field} />}
        sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
      />
      <FormHelperText sx={{ color: 'error.main' }}>
        {touched[field.name] && errors[field.name] && (
          <Stack
            component="span"
            direction="row"
            alignItems="center"
            spacing={1}
          >
            <ErrorIcon />
            <span>{String(errors[field.name])}</span>
          </Stack>
        )}
      </FormHelperText>
    </div>
  );
};
