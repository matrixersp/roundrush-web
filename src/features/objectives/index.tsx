import React, { useEffect, useState } from 'react';
import {
  Stack,
  IconButton,
  InputAdornment,
  OutlinedInput,
  styled,
  Box,
  Tabs,
  Tab,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  AvatarGroup,
  Tooltip,
} from '@mui/material';
import { ArrowUp as ArrowUpIcon, Status as StatusIcon } from 'icons';
import SearchIcon from 'icons/Search';
import { CSSObject, Theme } from '@mui/system';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { getObjectives } from 'features/objectives/objectivesSlice';

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab({ active, ...props }: LinkTabProps & { active: boolean }) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      sx={{
        color: active ? 'primary.main' : 'text.secondary',
        border: active ? '2px solid' : 'none',
      }}
      {...props}
    />
  );
}

type Props = {};

export const Objectives = (props: Props) => {
  const dispatch = useAppDispatch();
  const objectives = useAppSelector((state) => state.objective.objectives);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getObjectives());
  }, [dispatch]);

  return (
    <ContainerStyled>
      <StackStyled>
        <Stack direction="row" columnGap={2}>
          <OutlinedInputStyled
            type="text"
            placeholder="Choose something"
            size="small"
            sx={{}}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  // sx={{ '& .MuiSvgIcon-root': { color: 'primary.main' } }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          <IconButton>
            <StatusIcon />
          </IconButton>
          <IconButton>
            <ArrowUpIcon />
          </IconButton>
        </Stack>

        <Box>
          <TabsStyled value={value} onChange={handleChange}>
            <LinkTab
              label="Milestones"
              href="/milestones"
              active={value === 0}
            />
            <LinkTab
              label="Requirements"
              href="/requirements"
              active={value === 1}
            />
          </TabsStyled>
        </Box>
      </StackStyled>
      <TableStyled sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Priority</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Assignees</TableCell>
            <TableCell align="center">Due Date</TableCell>
            <TableCell align="center">Checkmarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {objectives.map((row) => (
            <TableRowStyled key={row.name} selected={row.status}>
              <TableCell>{row.name}</TableCell>
              <TableCell align="center">
                {!row.status && (
                  <PrioirtyStyled priority={row.priority}>
                    {row.priority}
                  </PrioirtyStyled>
                )}
              </TableCell>
              <TableCell align="center">
                <StatusStyled status={row.status}>
                  {row.status ? 'Done' : 'Not Done'}
                </StatusStyled>
              </TableCell>
              <TableCell align="center">
                <AvatarGroup max={4} sx={{ justifyContent: 'center' }}>
                  {row.assignees.map((assignee: any) => (
                    <Tooltip title={assignee.name} placement="top-start" arrow>
                      <Avatar
                        key={assignee.id}
                        alt={assignee.name}
                        src={assignee.avatar}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: 'text.secondary', fontWeight: 500 }}
              >
                {row.dueDate}
              </TableCell>
              <TableCell align="center" sx={{ color: 'text.secondary' }}>
                {row.checkmarks}/10
              </TableCell>
            </TableRowStyled>
          ))}
        </TableBody>
      </TableStyled>
    </ContainerStyled>
  );
};

const ContainerStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
}));

const StackStyled = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}));

const OutlinedInputStyled = styled(OutlinedInput)(({ theme }) => ({
  '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

const TabsStyled = styled(Tabs)(({ theme }) => ({
  '& .MuiTabs-indicator': {
    height: 0,
  },
  '& .MuiTab-root': {
    padding: '6px 24px',
    borderRadius: 6,
    minHeight: 32,
    textTransform: 'none',
    '& span': {
      padding: 0,
      margin: 0,
    },
  },
  '& .MuiTab-root + .MuiTab-root': {
    marginLeft: theme.spacing(2),
  },
}));

const TableStyled = styled(Table)(({ theme }) => ({
  marginTop: theme.spacing(5),
  '& .MuiTableHead-root': {
    textTransform: 'uppercase',
    '& .MuiTableCell-root': {
      color: 'rgba(49, 57, 78, 0.5)',
    },
  },
  '& .MuiTableRow-root': {
    '& .MuiTableCell-root': {
      padding: theme.spacing(1.5),
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

const TableRowStyled = styled(TableRow)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    '&.Mui-selected, &.Mui-selected:hover': {
      backgroundColor: selected === true ? '#CEF2D8' : 'transparent',
    },
  })
);

const priorityColors: Record<string, string> = {
  low: '#29C293',
  medium: '#FFAB2A',
  high: '#FD5461',
  urgent: '#DB54FD',
};

const statusMixin = (theme: Theme): CSSObject => ({
  padding: '6px 14px',
  maxWidth: 130,
  borderRadius: '6px',
  textTransform: 'uppercase',
  fontWeight: 500,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  margin: 'auto',
  color: theme.palette.getContrastText(theme.palette.primary.main),
});

const PrioirtyStyled = styled('div')<{ priority: string }>(
  ({ theme, priority }) => ({
    backgroundColor: priorityColors[priority],
    ...statusMixin(theme),
  })
);

const StatusStyled = styled('div')<{ status: string }>(({ theme, status }) => ({
  ...(!status
    ? { backgroundColor: '#D6D7DC', ...statusMixin(theme) }
    : {
        textTransform: 'uppercase',
        fontWeight: 500,
      }),
}));
