import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';

import { drawerWidth } from 'utils/constants';
import { DrawerHeader } from 'components/ui/Drawer/DrawerHeader';
import { logout } from 'features/auth/authSlice';
import { useAppDispatch } from 'app/hooks';
import { CommonProps } from '@mui/material/OverridableComponent';
import { Button } from '@mui/material';

import MenuIcon from 'icons/Menu';
import TrelloIcon from 'icons/Trello';
import SettingsIcon from 'icons/Settings';
import ExitIcon from 'icons/Exit';
import HelpIcon from 'icons/Help';
import BrandShortIcon from 'icons/BrandShort';
import { OrganizationsList } from 'components/ui/Drawer/OrganizationsList';
import HomeIcon from 'icons/Home';

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  '& .MuiDrawer-paper > div': {
    paddingLeft: theme.spacing(3),
  },
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: theme.spacing(9),
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  '& .MuiDrawer-paper > div > svg': {
    opacity: 0,
    transition: theme.transitions.duration.leavingScreen,
  },
});

const DrawerStyled = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface ListProps extends CommonProps {
  open?: boolean;
}

const TopListStyled = styled(List, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ListProps>(({ theme, open }) => ({
  color: theme.palette.getContrastText(theme.palette.text.primary),
  '& > a': {
    color: theme.palette.getContrastText(theme.palette.text.primary),
    '&:hover': {
      textDecoration: 'none',
    },
  },
  '& .MuiListItem-root': {
    paddingLeft: 12,
    paddingRight: 12,
    '& .MuiListItemButton-root': {
      borderRadius: 6,
      paddingLeft: 12,
      paddingRight: 12,
      minHeight: 48,
      justifyContent: open ? 'initial' : 'center',
      '& .MuiListItemIcon-root': {
        minWidth: 0,
        marginRight: open ? theme.spacing(1.5) : 'auto',
        justifyContent: 'center',
        fill: theme.palette.getContrastText(theme.palette.text.primary),
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
      },
      '& .Mui-selected': {
        backgroundColor: theme.palette.common.white,
        opacity: 0.2,
      },

      '& .MuiListItemText-root': {
        opacity: open ? 1 : 0,
        transition: theme.transitions.duration.leavingScreen,
      },
    },
  },
}));

const BottomListStyled = styled(List, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ListProps>(({ theme, open }) => ({
  marginTop: 'auto',
  display: 'flex',
  flexDirection: open ? 'row-reverse' : 'column',
  justifyContent: 'space-between',
  transition: theme.transitions.create('flex-direction', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  '& .MuiListItem-root': {
    justifyContent: 'center',
    '& .MuiButton-root': {
      minHeight: 48,
      justifyContent: 'center',
      padding: 0,
      '& .MuiListItemIcon-root': {
        minWidth: 0,
      },
    },
  },
}));

type Links = Array<{
  title: string;
  icon?: JSX.Element;
  image?: string;
  path?: string;
  action?: () => void;
}>;

const drawerTopLinks: Links = [
  {
    icon: <TrelloIcon />,
    title: 'Personal Board',
    path: '/personal-board',
  },
  {
    icon: <HomeIcon />,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <SettingsIcon />,
    title: 'Space Settings',
    path: '/space-settings',
  },
];

type Props = {
  open: boolean;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
};

export const Drawer = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
}: Props) => {
  const dispatch = useAppDispatch();

  const drawerTopLinksList = (
    [
      {
        image: '/static/images/brotli.jpg',
        title: 'YellowTech Inc.',
        path: '/dashboard',
      },
    ] as Links
  ).concat(drawerTopLinks);

  const drawerBottomLinksList: Links = [
    {
      image: '/static/images/avatar.jpg',
      title: 'John Doe',
      path: '/profile',
    },
    {
      icon: <HelpIcon />,
      title: 'help',
      path: '/help',
    },
    {
      icon: <ExitIcon />,
      title: 'Logout',
      action: () => {
        dispatch(logout());
      },
    },
  ];

  return (
    <DrawerStyled variant="permanent" open={open}>
      <DrawerHeader>
        <BrandShortIcon />
        <IconButton
          onClick={open ? handleDrawerClose : handleDrawerOpen}
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>
      </DrawerHeader>
      <TopListStyled open={open}>
        {drawerTopLinksList.map(({ title, path, icon, image, action }) => (
          <MuiLink
            component={Link}
            to={path as string}
            key={title}
            underline="none"
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {icon ? (
                    icon
                  ) : (
                    <img
                      src={image}
                      alt={title}
                      height="24"
                      width="24"
                      style={{ borderRadius: '50%' }}
                    />
                  )}
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
          </MuiLink>
        ))}
      </TopListStyled>
      <Divider sx={{ opacity: 0.5 }} />
      <OrganizationsList
        drawerOpen={open}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Divider sx={{ opacity: 0.5 }} />
      <BottomListStyled open={open}>
        {drawerBottomLinksList.map(({ title, icon, image, action }) => (
          <ListItem key={title} disablePadding>
            <Button onClick={() => action && action()}>
              <ListItemIcon>
                {icon ? (
                  icon
                ) : (
                  <img
                    src={image}
                    alt={title}
                    height="24"
                    width="24"
                    style={{ borderRadius: '50%' }}
                  />
                )}
              </ListItemIcon>
            </Button>
          </ListItem>
        ))}
      </BottomListStyled>
    </DrawerStyled>
  );
};
