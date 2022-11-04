import { Badge, Box, IconButton, styled, Typography } from '@mui/material';
import NotificationIcon from 'icons/Notification';
import AddIcon from 'icons/Add';

type Props = {};

export const AppBar = (props: Props) => {
  return (
    <>
      <Typography variant="h6" noWrap component="div">
        Space Settings
      </Typography>
      <Box>
        <IconButton edge="start">
          <Badge badgeContent={4} color="secondary">
            <NotificationIcon />
          </Badge>
        </IconButton>
        <IconButtonStyled edge="start">
          <AddIcon />
        </IconButtonStyled>
      </Box>
    </>
  );
};

const IconButtonStyled = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0.75),
  borderRadius: theme.spacing(0.75),
  marginLeft: 15,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '& svg': {
    fill: theme.palette.getContrastText(theme.palette.primary.main),
  },
}));
