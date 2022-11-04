import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/system';
import { MoreHorizontal as MoreHorizontalIcon } from 'icons';

const users = [
  {
    id: 1,
    name: 'John Doe',
    email: 'johndoe@example.com',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    type: 'Owner',
  },
  {
    id: 2,
    name: 'Jane Doe',
    email: 'janedoe@example.com',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    type: 'Member',
  },
  {
    id: 3,
    name: 'John Smith',
    email: 'johnsmith@example.com',
    status: 'Inactive',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    type: 'Member',
  },
  {
    id: 4,
    name: 'Jane Smith',
    email: 'janesmith@exmaple.com',
    status: 'Active',
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    type: 'Member',
  },
];

type Props = {};

export const Members = (props: Props) => {
  return (
    <ContainerStyled>
      <Typography variant="h5" sx={{ fontWeight: 400 }}>
        Users on plan
      </Typography>
      <TableStyled sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((row) => (
            <TableRowStyled key={row.name} status={row.status}>
              <TableCell component="th" scope="row">
                <Stack direction="row" gap={2} alignItems="center">
                  <Avatar alt="Remy Sharp" src={row.avatar} />
                  {row.name}
                  {row.type === 'Owner' && <OwnerStyled>Owner</OwnerStyled>}
                </Stack>
              </TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell align="center">
                <StatusStyled status={row.status}>{row.status}</StatusStyled>
              </TableCell>
              <TableCell align="center">
                <IconButton>
                  <MoreHorizontalIcon />
                </IconButton>
              </TableCell>
            </TableRowStyled>
          ))}
        </TableBody>
      </TableStyled>
      <ActionButtonsStyled>
        <Button
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          sx={{ marginLeft: 'auto' }}
        >
          Save
        </Button>
      </ActionButtonsStyled>
    </ContainerStyled>
  );
};

const ContainerStyled = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(1),
  width: '100%',
  height: '100%',
  position: 'relative',
}));

const TableStyled = styled(Table)(({ theme }) => ({
  marginTop: theme.spacing(5),
  '& .MuiTableHead-root': {
    textTransform: 'uppercase',
    '& .MuiTableCell-root': {
      color: theme.palette.text.secondary,
    },
  },
  '& .MuiTableRow-root': {
    '& .MuiTableCell-root': {
      padding: theme.spacing(1),
    },
    '&:hover': {
      backgroundColor: 'rgba(49, 57, 78, 0.05)',
    },
  },
  '& th, & td': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  '& .MuiAvatar-root': {
    width: 20,
    height: 20,
  },
}));

const OwnerStyled = styled('div')(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: 500,
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.secondary.light,
  padding: '5px 24px',
  borderRadius: '6px',
  margin: 'auto',
}));

const TableRowStyled = styled(TableRow)<{ status: string }>(
  ({ theme, status }) => ({
    backgroundColor:
      status === 'Active' ? 'transparent' : theme.palette.divider,
    '& th, td': {
      color:
        status === 'Active'
          ? theme.palette.text.primary
          : theme.palette.text.disabled,
    },
  })
);

const StatusStyled = styled('div')<{ status: string }>(({ theme, status }) => ({
  color:
    status === 'Active'
      ? theme.palette.secondary.main
      : theme.palette.error.light,
  padding: '5px 24px',
  borderRadius: '6px',
  margin: 'auto',
}));

const ActionButtonsStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  position: 'absolute',
  bottom: theme.spacing(-3),
  paddingBottom: theme.spacing(3),
}));
