import { WelcomeSection } from 'features/dashboard/WelcomeSection';
import { ProjectSection } from 'features/dashboard/ProjectSection';
import { Divider, Stack, styled } from '@mui/material';

const MainContentStyled = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
  },
  '& > div': {
    marginTop: 50,
    '&:first-of-type': {
      [theme.breakpoints.up('lg')]: {
        flexBasis: '60%',
        maxWidth: '60%',
      },
    },
    '&:last-of-type': {
      [theme.breakpoints.up('lg')]: {
        flexBasis: '40%',
        maxWidth: '40%',
      },
    },
  },
}));

export const Dashboard = () => {
  return (
    <MainContentStyled
      columnGap={3}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <WelcomeSection />
      <ProjectSection />
    </MainContentStyled>
  );
};
