import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Link as MuiLink,
} from '@mui/material';
import { Settings as SettingsIcon } from 'icons';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const MainContentStyled = styled(Stack)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
  marginTop: 50,
}));

type Props = {};

const settings = [
  {
    title: 'Info',
    path: 'info',
  },
  {
    title: 'Members',
    path: 'members',
  },
];

export const SpaceSettings = (props: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <MainContentStyled
      columnGap={3}
      divider={<Divider orientation="vertical" flexItem />}
    >
      <ListStyled>
        <ListItem disablePadding>
          <ListItemButton disableRipple>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Space Settings" />
          </ListItemButton>
        </ListItem>
        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          {settings.map(({ title, path }, index) => (
            <MuiLink
              component={Link}
              to={`/space-settings/${path}`}
              onClick={() => {
                setActiveTab(index);
              }}
            >
              <ListItem disablePadding>
                <ListItemButton disableRipple>
                  <ListItemText
                    inset
                    primary={title}
                    sx={{
                      color:
                        activeTab === index ? 'primary.main' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            </MuiLink>
          ))}
        </List>
      </ListStyled>
      <Outlet />
    </MainContentStyled>
  );
};

const ListStyled = styled(List)(({ theme }) => ({
  width: '100%',
  maxWidth: 220,
  '& .MuiLink-root': {
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  '& .MuiListItemButton-root': {
    paddingLeft: 0,
    '& .MuiListItemText-root': {
      paddingLeft: 34,
    },
    '& .MuiTypography-body1': {
      fontSize: '.875rem',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  '& > .MuiListItem-root': {
    color: theme.palette.primary.main,
    '& .MuiListItemText-root': {
      paddingLeft: 0,
    },
    '& .MuiListItemIcon-root': {
      minWidth: 34,
      '& svg': {
        fill: theme.palette.primary.main,
      },
    },
    '& .MuiTypography-body1': {
      textTransform: 'uppercase',
      fontWeight: 500,
    },
  },
}));
