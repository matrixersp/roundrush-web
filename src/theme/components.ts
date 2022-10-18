export const components = {
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          height: '40px',
          '& fieldset': {
            border: '2px solid #D9DBDE',
          },
          '& input': {
            padding: '10px 8px',
          },
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 8,
        },
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'capitalize' as const,
        borderRadius: 6,
      },
    },
  },
  MuiLink: {
    styleOverrides: {
      root: {
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
  MuiFormControl: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          height: '40px',
          '& fieldset': {
            border: '2px solid #D9DBDE',
          },
          '& .MuiSelect-select': {
            padding: '10px 8px',
          },
        },
        '& .MuiFormHelperText-root': {
          marginLeft: 8,
        },
      },
    },
  },
  MuiCheckbox: {
    defaultProps: {
      disableRipple: true,
    },
  },
};
