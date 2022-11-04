import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  styled,
  IconButton,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { CommonProps } from '@mui/material/OverridableComponent';
import { ProjectList } from 'components/ui/Drawer/ProjectList';
import AddIcon from 'icons/Add';
import ArrowDownIcon from 'icons/ArrowDown';
import TeamIcon from 'icons/Team';
import { getOrganizations } from 'features/organization/organizationSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';

interface ListProps extends CommonProps {
  open?: boolean;
}

const ListStyled = styled(List, {
  shouldForwardProp: (prop) => prop !== 'open',
})<ListProps>(({ theme, open }) => ({
  color: theme.palette.getContrastText(theme.palette.text.primary),
  '& > a': {
    color: theme.palette.getContrastText(theme.palette.text.primary),
    '&:hover': {
      textDecoration: 'none',
    },
  },
  '& .MuiListItemButton-root': {
    paddingLeft: 24,
    paddingRight: 24,
    minHeight: 48,
    justifyContent: open ? 'initial' : 'center',
    '& .MuiListItemIcon-root': {
      minWidth: 0,
      marginRight: open ? theme.spacing(1.5) : 'auto',
      justifyContent: 'center',
    },
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    '& .MuiListItemText-root': {
      opacity: open ? 1 : 0,
      transition: theme.transitions.duration.leavingScreen,
    },
  },
  '& svg': {
    fill: theme.palette.getContrastText(theme.palette.text.primary),
  },
}));

type Props = {
  drawerOpen: boolean;
  handleDrawerOpen: () => void;
};

export const OrganizationsList = ({ drawerOpen, handleDrawerOpen }: Props) => {
  const dispatch = useAppDispatch();
  const organizations = useAppSelector(
    (state) => state.organization.organizations
  );
  const [open, setOpen] = useState(true);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleToggleItemButton = (e?: React.MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation();
    handleDrawerOpen();
    setOpen(!open);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!drawerOpen) {
      setOpen(false);
    }
  }, [drawerOpen]);

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  return (
    <ListStyled open={drawerOpen}>
      <ListItem disablePadding>
        <ListItemButton onClick={handleToggleItemButton}>
          <ListItemIcon>
            <TeamIcon />
          </ListItemIcon>
          <ListItemText primary="Team" />
          {drawerOpen && (
            <>
              <IconButton
                onMouseDown={handleMouseDown}
                onClick={handleMouseDown}
                size="small"
              >
                <AddIcon />
              </IconButton>
              <IconButton
                onMouseDown={handleMouseDown}
                onClick={handleToggle}
                size="small"
              >
                <ArrowDownIcon
                  style={{
                    transform: open ? 'rotate(-90deg)' : 'none',
                  }}
                />
              </IconButton>
            </>
          )}
        </ListItemButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {organizations.map(({ id, name, projects }) => (
          <ProjectList key={id} name={name} projects={projects} />
        ))}
      </Collapse>
    </ListStyled>
  );
};
