import {
  List,
  ListItemButton,
  ListItemText,
  IconButton,
  Collapse,
  styled,
  Link as MuiLink,
} from '@mui/material';
import { useState } from 'react';
import MoreHorizontalIcon from 'icons/MoreHorizontal';
import ArrowDownIcon from 'icons/ArrowDown';
import { Link } from 'react-router-dom';

const ProjectItemIndicatorStyled = styled('span', {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color: string }>(({ theme, color }) => ({
  width: 12,
  height: 12,
  borderRadius: 3,
  backgroundColor: color ? color : theme.palette.primary.main,
  marginRight: 8,
}));

const ListStyled = styled(List)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  '& .MuiIconButton-root': {
    display: 'none',
  },
  '& .MuiListItemButton-root': {
    '&:hover .MuiIconButton-root': {
      display: 'inline-flex',
    },
  },
  '& > .MuiListItemButton-root': {
    minHeight: 40,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 8,
    '& .MuiTypography-root': {
      fontWeight: 500,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  },
  '& .MuiList-root': {
    '& .MuiTypography-root': {
      fontSize: '0.875rem',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    marginTop: 8,
    '& .MuiListItemButton-root': {
      minHeight: 32,
      paddingTop: 0,
      paddingBottom: 0,
      margin: 0,
    },
  },
}));

type Props = {
  name: string;
  projects: any[];
};

export const ProjectList = ({ name, projects }: Props) => {
  const [open, setOpen] = useState(true);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  const handleToggleItemButton = () => {
    setOpen(!open);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <ListStyled disablePadding>
      <ListItemButton onClick={handleToggleItemButton}>
        <ListItemText primary={name} />
        <IconButton
          onMouseDown={handleMouseDown}
          onClick={handleMouseDown}
          size="small"
        >
          <MoreHorizontalIcon />
        </IconButton>
        <IconButton
          onMouseDown={handleMouseDown}
          onClick={handleToggle}
          size="small"
        >
          <ArrowDownIcon
            style={{ transform: open ? 'rotate(-90deg)' : 'none' }}
          />
        </IconButton>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {projects.map((project) => (
            <Project key={project.id} {...project} />
          ))}
        </List>
      </Collapse>
    </ListStyled>
  );
};

type ProjectProps = {
  id: string;
  name: string;
  color: string;
};

const Project = ({ name, color }: ProjectProps) => {
  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
  };

  return (
    <MuiLink
      component={Link}
      to={'/objectives' as string}
      color="inherit"
      sx={{
        textDecoration: 'none !important',
      }}
    >
      <ListItemButton>
        <ProjectItemIndicatorStyled color={color} />
        <ListItemText primary={name} />
        <IconButton
          onMouseDown={handleMouseDown}
          onClick={handleMouseDown}
          size="small"
        >
          <MoreHorizontalIcon />
        </IconButton>
      </ListItemButton>
    </MuiLink>
  );
};
