import { Stack, Typography, Link as MuiLink, styled } from '@mui/material';
import mail from 'icons/mail.svg';
import { Link } from 'react-router-dom';

export const AccountReady = () => {
  return (
    <ContainerStyled spacing={4.5}>
      <img src={mail} alt="mail icon" width="107" height="107" />
      <Typography>
        Please verify your email and continue to RoundRush
      </Typography>
      <MuiLink component={Link} to="/login">
        Go to login page
      </MuiLink>
    </ContainerStyled>
  );
};

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
