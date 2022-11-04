import { Toolbar, styled } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { drawerDockedWidth, drawerWidth } from 'utils/constants';
import { Route, Routes } from 'react-router-dom';
import { AppBar as DashboardAppBar } from 'features/dashboard/AppBar';
import { AppBar as SpaceSettingsAppBar } from 'features/space-settings/AppBar';
import { AppBar as PersonalBoardAppBar } from 'features/personal-board/AppBar';
import { AppBar as ObjectivesAppBar } from 'features/objectives/AppBar';

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBarStyled = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.background.default,
  width: `calc(100% - ${drawerDockedWidth + 50}px)`,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth + 50}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  '&.MuiToolbar-root': {
    padding: '30px 50px 20px 0',
    display: 'flex',
    justifyContent: 'space-between',
    '& .MuiTypography-root': {
      color: theme.palette.text.primary,
      fontSize: '1.5rem',
    },
  },
}));

type Props = {
  drawerOpen: boolean;
};

export const AppBar = ({ drawerOpen }: Props) => {
  return (
    <AppBarStyled position="fixed" open={drawerOpen}>
      <ToolbarStyled>
        <Routes>
          <Route path="/dashboard" element={<DashboardAppBar />} />
          <Route path="/space-settings/*" element={<SpaceSettingsAppBar />} />
          <Route path="/personal-board/*" element={<PersonalBoardAppBar />} />
          <Route path="/objectives/*" element={<ObjectivesAppBar />} />
        </Routes>
      </ToolbarStyled>
    </AppBarStyled>
  );
};
