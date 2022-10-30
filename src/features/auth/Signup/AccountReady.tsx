import { Stack, Typography, Link as MuiLink, styled } from '@mui/material';
import { Mail as MailIcon } from 'icons';
import { Link } from 'react-router-dom';

export const AccountReady = () => {
  return (
    <ContainerStyled spacing={4.5}>
      <IconWrapperStyled>
        <MailIcon />
      </IconWrapperStyled>
      <Typography>
        Please verify your email and continue to RoundRush
      </Typography>
      <MuiLink component={Link} to="/login">
        Go to login page
      </MuiLink>
    </ContainerStyled>
  );
};

const IconWrapperStyled = styled('div')(() => ({
  marginTop: 66,
  '& svg': {
    width: 107,
    height: 107,
  },
}));

const ContainerStyled = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  '& > .MuiTypography-body1': {
    lineHeight: 1.625,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    maxWidth: 250,
    marginBottom: theme.spacing(3.75),
  },
}));
