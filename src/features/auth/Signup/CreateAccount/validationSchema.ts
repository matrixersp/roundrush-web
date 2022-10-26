import * as Yup from 'yup';

export const validationSchema = [
  Yup.object().shape({
    fullName: Yup.string()
      .label('Full name')
      .min(2, ({ label, min }) => `${label} must be at least ${min} characters`)
      .max(
        255,
        ({ label, max }) => `${label} must be less than ${max + 1} characters`
      )
      .required('${path} is required'),
    password: Yup.string()
      .label('Password')
      .min(8, ({ label, min }) => `${label} must be at least ${min} characters`)
      .max(
        255,
        ({ label, max }) => `${label} must be less than ${max + 1} characters`
      )
      .required('${path} is required'),
  }),
  Yup.object().shape({
    companyName: Yup.string()
      .label('Company name')
      .min(2, ({ label, min }) => `${label} must be at least ${min} characters`)
      .max(
        255,
        ({ label, max }) => `${label} must be less than ${max + 1} characters`
      )
      .required('${path} is required'),
    spaceName: Yup.string()
      .label('Space')
      .min(2, ({ label, min }) => `${label} must be at least ${min} characters`)
      .max(
        255,
        ({ label, max }) => `${label} must be less than ${max + 1} characters`
      )
      .required('${path} is required'),
    industry: Yup.string().label('Industry'),
    employeesSize: Yup.string().label('Number of employee'),
    acceptTerms: Yup.boolean()
      .label('Terms of Use and Privacy Policy')
      .oneOf([true], 'You must accept the ${path}'),
  }),
];
