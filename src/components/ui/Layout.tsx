import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { DrawerHeader } from 'components/ui/Drawer/DrawerHeader';
import { Drawer } from 'components/ui/Drawer';
import { AppBar } from 'components/ui/AppBar';
import { Outlet } from 'react-router-dom';

const MainStyled = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(6.25),
  marginTop: -24,
  minWidth: 0,
}));

export function Layout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar drawerOpen={open} />
      <Drawer
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
      <MainStyled>
        <DrawerHeader />
        <Outlet />
      </MainStyled>
    </Box>
  );
}
