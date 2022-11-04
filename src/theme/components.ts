export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      '*::-webkit-scrollbar': {
        width: '0.45em',
      },
      '*::-webkit-scrollbar-track': {
        backgroundColor: '#F5F5F7',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: '#D6D6D6',
        borderRadius: '0.5em',
        '&:hover': {
          backgroundColor: '#C1C1C1',
        },
      },
    },
  },
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
        textTransform: 'inherit' as const,
        borderRadius: 6,
        '&.MuiButton-sizeLarge': {
          fontSize: '0.875rem',
          lineHeight: '20px',
        },
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
