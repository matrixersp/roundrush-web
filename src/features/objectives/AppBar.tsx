import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import NotificationIcon from 'icons/Notification';
import AddIcon from 'icons/Add';
import ConferenceIcon from 'icons/Conference';
import {
  GoogleCalendar as GoogleCalendarIcon,
  MoreVertical,
  Rocket,
  Slack as SlackIcon,
} from 'icons';
import { useState } from 'react';
import { NotificationCenter } from 'features/objectives/NotificationCenter';

export const AppBar = () => {
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false);

  const toggleNotificationCenter = (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setNotificationCenterOpen(!notificationCenterOpen);
  };

  return (
    <>
      <Typography variant="h6" noWrap component="div">
        Objectives
        <IconButton color="inherit" size="small" sx={{ marginLeft: 2 }}>
          <ConferenceIcon />
        </IconButton>
      </Typography>
      <StackStyled direction="row" spacing={3}>
        <IterationStyled>
          <Typography variant="body1">
            Iteration type: <strong>ROUND</strong>
          </Typography>
          <IconButton color="inherit" size="small">
            <MoreVertical />
          </IconButton>
        </IterationStyled>
        <IconButton color="inherit" size="small">
          <SlackIcon />
        </IconButton>
        <IconButton color="inherit" size="small">
          <GoogleCalendarIcon />
        </IconButton>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          startIcon={<Rocket />}
          sx={{ px: 3 }}
        >
          Upgrade
        </Button>
        <NotificationButtonStyled
          edge="start"
          size="small"
          onClick={toggleNotificationCenter}
        >
          <NotificationIcon />
        </NotificationButtonStyled>
        <AddButtonStyled edge="start" size="small">
          <AddIcon />
        </AddButtonStyled>
      </StackStyled>
      <NotificationCenter
        open={notificationCenterOpen}
        onClose={toggleNotificationCenter}
      />
    </>
  );
};

const StackStyled = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  marginLeft: theme.spacing(2),
}));

const IterationStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  padding: '4px 16px',
  borderRadius: 6,
  '& > .MuiTypography-root': {
    marginRight: theme.spacing(4),
    fontSize: `${theme.typography.body2.fontSize} !important`,
    color: `${theme.palette.primary.main} !important`,
  },
}));

const NotificationButtonStyled = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
  borderRadius: 6,
  height: 32,
  width: 32,
  backgroundColor: '#F7C101',
  '&:hover': {
    backgroundColor: '#F7C101',
  },
}));

const AddButtonStyled = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: 32,
  width: 32,
  borderRadius: theme.spacing(0.75),
  marginLeft: 15,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& svg': {
    fill: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));
