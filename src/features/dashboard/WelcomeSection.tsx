import { Avatar, Box, styled, Typography } from '@mui/material';
import { BoxProps } from '@mui/system';
import DevProductivityIcon from 'icons/DevProductivity';
import { useState } from 'react';

type Props = {};

const favoriteProjects = [
  {
    id: 1,
    name: 'Roundrush',
    color: '#1FAAE9',
  },
  {
    id: 2,
    name: 'LD website',
    color: '#61D26F',
  },
  {
    id: 4,
    name: 'Roundrush Website',
    color: '#4086E0',
  },
  {
    id: 5,
    name: 'Marketing',
    color: '#7A6FEF',
  },
  {
    id: 6,
    name: 'Roundrush Website',
    color: '#4086E0',
  },
  {
    id: 7,
    name: 'Marketing',
    color: '#7A6FEF',
  },
];

const getProjectAcronym = (name: string) => {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase();
};

export const WelcomeSection = (props: Props) => {
  const [selectedProject, setSelectedProject] = useState(
    favoriteProjects[0].id
  );

  return (
    <Box>
      <WelcomeCardStyled>
        <Box>
          <Typography variant="h5" fontWeight="400">
            Welcome back, James
          </Typography>
          <Typography variant="body1" component="span">
            in <strong>Marketing</strong> You have <strong>14</strong> task to
            accomplish and <strong>10</strong> reviews left in your current
            iteration.
          </Typography>
        </Box>
        <Box>
          <DevProductivityIcon />
        </Box>
      </WelcomeCardStyled>
      <FavoriteProjectsStyled>
        <Typography variant="h6" gutterBottom>
          Favorite Projects
        </Typography>
        <Box gap={2}>
          {favoriteProjects.map(({ id, name, color }) => (
            <ProjectItemStyled
              key={id}
              selected={selectedProject === id}
              onClick={() => setSelectedProject(id)}
            >
              <Avatar variant="rounded" sx={{ bgcolor: color }}>
                <Typography variant="h6" color="common.white">
                  {getProjectAcronym(name)}
                </Typography>
              </Avatar>
              <Typography variant="body1">{name}</Typography>
            </ProjectItemStyled>
          ))}
        </Box>
      </FavoriteProjectsStyled>
    </Box>
  );
};

const WelcomeCardStyled = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: theme.palette.primary.light,
  minHeight: 170,
  maxHeight: 170,
  '& > .MuiBox-root:first-of-type': {
    padding: theme.spacing(3.5),
    marginBottom: theme.spacing(3.5),
    overflow: 'hidden',
    maxWidth: 'calc(100% - 267px)',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    minWidth: 0,
    '& .MuiTypography': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
  },
  '& > .MuiBox-root:last-of-type': {
    position: 'relative',
    flex: 1,
    display: 'block',
    marginRight: 40,
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      marginRight: 0,
    },
    '& svg': {
      position: 'absolute',
      top: -26,
      right: 0,
    },
  },
}));

const FavoriteProjectsStyled = styled(Box)(({ theme }) => ({
  marginTop: 41,
  '& > .MuiBox-root': {
    display: 'flex',
    flexWrap: 'wrap',
  },
  '& > .MuiTypography-root': {
    marginBottom: theme.spacing(4),
  },
  '& .MuiAvatar-root': {
    width: '80px',
    height: '80px',
    color: theme.palette.common.white,
    '& .MuiTypography-root': {
      fontWeight: 500,
    },
  },
}));

const ProjectItemStyled = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<BoxProps & { selected: boolean }>(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.primary.light : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
  },
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
  borderRadius: 8,
  height: '100%',
  cursor: 'pointer',
  maxWidth: 120,
  '& > .MuiTypography-root': {
    marginTop: 24,
    textAlign: 'center',
  },
}));
