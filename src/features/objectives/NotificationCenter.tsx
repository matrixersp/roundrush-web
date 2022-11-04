import {
  Avatar,
  Box,
  Checkbox,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import {
  Add as AddIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
  High as HighIcon,
  MoreHorizontal as MoreHorizontalIcon,
} from 'icons';
import React from 'react';

const assignees = [
  {
    name: 'Kristin Rich',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    name: 'Iene Robert',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

type Props = {
  open: boolean;
  onClose: (event: React.KeyboardEvent | React.MouseEvent) => void;
};

export const NotificationCenter = ({ open, onClose }: Props) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 470 },
      }}
    >
      <Stack columnGap={2} divider={<Divider flexItem />} alignItems="flex-end">
        <ActionButtonsStyled>
          <IconButton size="small">
            <DeleteIcon />
          </IconButton>
          <IconButton size="small" onClick={onClose}>
            <CancelIcon />
          </IconButton>
        </ActionButtonsStyled>
        <ContainerStyled>
          <Typography variant="h5">Notification Center</Typography>
          <Box>
            <Typography variant="body2">Description</Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget sed
              ullamcorper imperdiet consectetur pretium, vitae mattis varius.
              Tortor et amet eget posuere quis. Cursus nibh amet diam elementum
              accumsan, a. In tortor mauris in viverra et mi scelerisque
              facilisi. Turpis ut ac egestas tempor. Eu pretium nulla vitae
              scelerisque.
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Priority</Typography>
            <Typography variant="body1">
              <HighIcon style={{ marginRight: 8 }} />
              High Priority
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Subproject</Typography>
            <Typography variant="body1">
              <FolderIcon style={{ marginRight: 8 }} />
              Webapp
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2">Assignees</Typography>
            <Stack direction="row" gap={1} sx={{ flexWrap: 'wrap' }}>
              {assignees.map(({ name, avatar }) => (
                <AssigneeStyled>
                  <Avatar alt={name} src={avatar} />
                  <Typography variant="body1">{name}</Typography>
                  <IconButton size="small">
                    <CancelIcon />
                  </IconButton>
                </AssigneeStyled>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography variant="body2">Due Date</Typography>
            <Typography variant="body1">12/10/2019 12:00 PM</Typography>
          </Box>
          <CheckmarksStyled>
            <Box sx={{ mt: 3, mb: 2 }}>
              <Typography variant="body2">Checkmarks</Typography>
              <AddButtonStyled size="small">
                <AddIcon />
              </AddButtonStyled>
            </Box>
            {['Notification Service', 'Checkmark Updated', 'Api Server'].map(
              (checkmark, index) => (
                <CheckMarkStyled>
                  <Typography variant="body2">{checkmark}</Typography>
                  <Box>
                    <IconButton>
                      <MoreHorizontalIcon />
                    </IconButton>
                    <Checkbox checked={index % 2 === 0} />
                  </Box>
                </CheckMarkStyled>
              )
            )}
          </CheckmarksStyled>
        </ContainerStyled>
      </Stack>
    </Drawer>
  );
};

const ContainerStyled = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  '& > .MuiBox-root': {
    marginTop: theme.spacing(2.5),
    paddingLeft: theme.spacing(1),
    '& .MuiTypography-root': {
      marginBottom: theme.spacing(1),
    },
    '& .MuiTypography-body2': {
      color: theme.palette.text.secondary,
    },
    '& .MuiTypography-body1': {
      display: 'flex',
      alignItems: 'center',
    },
  },
}));

const ActionButtonsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  padding: theme.spacing(1),
  '& > .MuiIconButton-root': {
    marginRight: theme.spacing(2),
  },
}));

const AssigneeStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5, 1),
  '&.MuiBox-root': {
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  '& > .MuiAvatar-root': {
    marginRight: theme.spacing(1),
    width: 24,
    height: 24,
  },
  '& > .MuiTypography-body1': {
    marginBottom: '0px !important',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  '& > .MuiIconButton-root': {
    marginLeft: theme.spacing(1),
  },
}));

const AddButtonStyled = styled(IconButton)(({ theme }) => ({
  fill: theme.palette.primary.main,
}));

const CheckmarksStyled = styled(Box)(({ theme }) => ({
  '& .MuiBox-root:first-of-type': {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& > .MuiTypography-root': {
      textTransform: 'uppercase',
      fontWeight: 500,
      color: theme.palette.primary.main,
      marginBottom: 0,
    },
  },
}));

const CheckMarkStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  marginTop: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiTypography-root': {
    fontWeight: 500,
    color: theme.palette.primary.main,
    marginBottom: '0px !important',
  },
}));
