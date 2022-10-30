import { Paper, styled, Typography } from '@mui/material';
import BrandIcon from 'icons/Brand';

const WrapperStyled = styled('div')(({ theme }) => ({
  padding: '62px 12px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '& > svg': {
    marginBottom: 26,
  },
  '& > .MuiPaper-root': {
    padding: '50px 90px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    width: 539,
    [theme.breakpoints.down('sm')]: { width: '100%', padding: 35 },
  },
}));

const BackgroundStyled = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background:
    'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #E8F0FE 100%)',
  zIndex: -1,
}));

const ShortDescriptionStyled = styled(Typography)(({ theme }) => ({
  maxWidth: 345,
  fontFamily: "'Inter'",
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '0.75rem',
  lineHeight: theme.spacing(3),
  textAlign: 'center',
  letterSpacing: 6,
  textTransform: 'uppercase',
  color: '#4C84FF',
  marginBottom: 50,
}));

const TitleStyled = styled(Typography)(({ theme }) => ({
  fontWeight: '400',
  fontSize: '1.375rem',
  lineHeight: '20px',
  color: '#000000',
  textAlign: 'center',
  marginBottom: 16,
}));

type Props = { description?: string; title: string; children: React.ReactNode };

export const PublicLayout = ({
  description = 'The optimized workflow out of the box',
  title,
  children,
}: Props) => {
  return (
    <WrapperStyled>
      <BackgroundStyled />
      <BrandIcon />
      <ShortDescriptionStyled>{description}</ShortDescriptionStyled>
      <Paper elevation={0}>
        <TitleStyled variant="h1" data-testid={title}>
          {title}
        </TitleStyled>
        {children}
      </Paper>
    </WrapperStyled>
  );
};
